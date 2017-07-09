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

  //External libraries needed for aot bundle
  var libsPath = [
    modulesRoot + '/core-js/client/shim.min.js',
    modulesRoot + '/zone.js/dist/zone.min.js'
  ];

  return {
    //Default task is debug build
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', task + ':bundle:packages', task + ':bundle:source', callback);
    },
    //Watch task to build only source files
    'default:watch': function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', task + ':bundle:source', callback);
    },
    //AOT release build
    release: function (callback) {
      plugins.runSequence(task + ':clean', task + ':aot:build', task + ':aot:rename', task + ':aot:treeshaking', task + ':release:license', task + ':aot:bundle', callback);
    },
    //Clean task
    clean: function () {
      return gulp.src([destinationPath, buildRoot, './build', './aot', destinationRoot + 'node_modules/'])
        .pipe(plugins.clean({ force: true }));
    },
    //Watch task
    watch: function () {
      plugins.watch(sourcePath, function () {
        gulp.start(task + ':default:watch');
      });
    },
    /* **************************************************
     * DEBUG BUILD
     * **************************************************/
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
    //Copy TS to destination for mapping
    'bundle:source': function (callback) {
      return gulp.src(sourcePath).pipe(gulp.dest(destinationPath));
    },
    /* **************************************************
     * RELEASE BUILD
     * **************************************************/
    'aot:build': function (callback) {
      //Call angular compiler
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
    // Use rollup for treeshaking
    'aot:treeshaking': function (callback) {
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
    // Add licence information
    'release:license': function () {
      return gulp.src('./build/scripts/app.js')
        .pipe(plugins.insert.prepend(`/*
 * This application is licencesed probably.
 */
`))      
        //redux hack, for some reason redux checkes this item, but it is only available in node, not in browsers
        .pipe(plugins.insert.prepend(`var process = { env: { NODE_ENV: "production" } };
        `))
        .pipe(gulp.dest('./build/scripts'));
    },
    // Create documentation
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
    // Bundle up the whole app
    'aot:bundle': function () {
      return gulp.src(libsPath.concat(['./build/scripts/app.js']))
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest(destinationPath));
    }
  };
};
