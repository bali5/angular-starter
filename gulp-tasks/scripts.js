var os = require('os');
var exec = require('child_process').exec;
var rollup = require('rollup-stream');
var Builder = require('systemjs-builder');

module.exports = function (gulp, plugins, task) {
  //Root path for script files
  var sourceRoot = './scripts/';
  //Blob path for script files
  var sourcePath = [
    sourceRoot + '**/*.ts'
  ];

  //Root for node_modules
  var modulesRoot = './node_modules';

  //Root path for destination
  var destinationRoot = './release/';
  //Path for destination
  var destinationPath = destinationRoot + 'scripts/';

  //Root path for temporary build
  var buildRoot = destinationRoot + 'build/';
  //Path for build
  var buildPath = buildRoot + 'scripts/';

  //TS project for debug build
  var project = plugins.typescript.createProject('./tsconfig.json');

  return {
    //Default task is debug build
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', task + ':bundle:packages', task + ':bundle:source', callback);
    },
    //Watch task to build only source files
    'default:watch': function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', task + ':bundle:code', task + ':bundle:source', callback);
    },
    //AOT release build
    release: function (callback) {
      plugins.runSequence(task + ':clean', task + ':aot:build', task + ':aot:rename', task + ':aot:bundle', task + ':release:license', task + ':aot:libs', callback);
    },
    //Clean task
    clean: function () {
      return gulp.src([destinationPath, buildPath])
        .pipe(plugins.clean({ force: true }));
    },
    //Watch task
    watch: function () {
      return gulp.watch(sourcePath, [task + ':default:watch']);
    },
    //Compile TS to JS
    build: function () {
      return project.src()
        .pipe(plugins.sourcemaps.init())
        .pipe(project())
        .pipe(plugins.sourcemaps.write('.', { includeContent: false, sourceRoot: '.' }))
        .pipe(gulp.dest(buildPath));
    },
    //Copy modules to release folder
    'bundle:packages': function (callback) {
      require('./../config.js');
      var list = Object.keys(System.packages)
        .map(function (m) {
          return m
            .replace('file:///', '')
            .replace('node_modules', '**node_modules')
            .replace('build', '**build') + '/**/*.js';
        })
        .concat([
          modulesRoot + '**/systemjs/**/*.js',
          'config.js'
        ]);

      return gulp.src(list).pipe(gulp.dest(destinationRoot));
    },
    //Copy JS to destination
    // 'bundle:code': function (callback) {
    //   return gulp.src([buildPath + '**/*.js', buildPath + '**/*.js.map']).pipe(gulp.dest(destinationPath));
    // },
    //Copy TS to destination
    'bundle:source': function (callback) {
      return gulp.src(sourcePath).pipe(gulp.dest(destinationPath));
    },

    'aot:build': function (callback) {
      var cmd = os.platform() === 'win32' ? '"node_modules/.bin/ngc" -p tsconfig-aot.json' : 'node_modules/.bin/ngc -p tsconfig-aot.json';

      exec(cmd, function (err, stdout, stderr) {
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.log(stderr);
        }
        callback(err);
      });
    },
    // This needed for bundling to work
    // No idea why import can't find the js files with the extension
    'aot:rename': function () {
      return gulp.src(buildPath + '/**/*.js')
        .pipe(plugins.rename(function (path) {
          path.basename = path.basename.replace('.aot', '');
        }))
        .pipe(gulp.dest(buildPath))
        .pipe(plugins.rename({
          extname: ''
        }))
        .pipe(gulp.dest(buildPath));
    },
    'release:bundle': function () {
      var builder = new Builder('', './config.js');
      return builder.buildStatic('app', buildPath + '/main.js', { minify: true, sourceMaps: false });
    },
    'aot:bundle': function (callback) {
      var cmd = os.platform() === 'win32' ? '"node_modules/.bin/rollup" -c rollup-config.js' : 'node_modules/.bin/rollup -p rollup-config.js';

      exec(cmd, function (err, stdout, stderr) {
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.log(stderr);
        }
        callback(err);
      });
    },
    'release:license': function () {
      return gulp.src(buildPath + '/app.js')
        .pipe(plugins.insert.prepend(`/*
 * For full list of licenses see license.txt
 */
`))      //redux hack
        .pipe(plugins.insert.prepend(`var process = { env: { NODE_ENV: "production" } };
        `))
        .pipe(gulp.dest(buildPath));
    },
    doc: function (callback) {
      var cmd = os.platform() === 'win32' ? '"node_modules/.bin/typedoc" --mode modules --out documentation/doc src' : 'node_modules/.bin/typedoc --mode modules --out documentation/doc src';

      exec(cmd, function (err, stdout, stderr) {
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.log(stderr);
        }
        callback(err);
      });
    },
    libs: function () {
      return gulp.src(libsSourcePath)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('libs.js'))
        .pipe(plugins.sourcemaps.write('.', { includeContent: true }))
        .pipe(gulp.dest(buildPath));
    },
    'aot:libs': function () {
      return gulp.src(libsSourcePathAot.concat([buildPath + 'app.js']))
        .pipe(gulp.dest(destinationPath));
    },
    concat: function () {
      return gulp.src([buildPath + 'libs.js', buildPath + 'app.js'])
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest(destinationPath));
    },

  };
};
