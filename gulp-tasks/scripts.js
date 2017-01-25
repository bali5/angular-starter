var os = require('os');
var exec = require('child_process').exec;

module.exports = function (gulp, plugins, task) {
  var Builder = require('systemjs-builder');

  var sourceRoot = './scripts/';
  var sourcePath = [
    sourceRoot + '**/*.ts'
  ];
  var buildPath = './build/scripts/';
  var buildPathNS = buildPath;
  var aotPath = './aot/';
  var destinationBasePath = './release/';
  var destinationPath = destinationBasePath + 'scripts/';
  var destinationBuildPath = destinationBasePath + 'build/scripts/';

  var libsSourceRoot = './node_modules/';
  var libsSourcePath = [
    libsSourceRoot + 'core-js/client/shim.min.js',
    libsSourceRoot + 'zone.js/dist/zone.js',
    libsSourceRoot + 'systemjs/dist/system.src.js',
    './libs/classList.js',
    './config.js'
  ];

  var libsSourceRootDebug = './**node_modules/';
  var libsSourcePathDebug = [
    libsSourceRootDebug + 'zone.js/**/*.js',
    libsSourceRootDebug + 'systemjs/**/*.js'
  ];

  var project = plugins.typescript.createProject('./tsconfig.json');

  return {
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', task + ':bundle:packages', task + ':bundle:code', task + ':bundle:source', callback);
    },
    'default:watch': function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', task + ':bundle:code', task + ':bundle:source', callback);
    },
    release: function (callback) {
      plugins.runSequence(task + ':clean', task + ':release:build', task + ':release:bundle', task + ':libs', task + ':concat', task + ':release:license', callback);
    },
    'release-aot': function (callback) {
      plugins.runSequence(task + ':clean', task + ':aot:build', task + ':aot:rename', task + ':aot:bundle', task + ':libs', task + ':concat', task + ':release:license', callback);
    },
    build: function () {
      return project.src()
        .pipe(plugins.sourcemaps.init())
        .pipe(project())
        .pipe(plugins.sourcemaps.write('.', { includeContent: false, sourceRoot: '.' }))
        .pipe(gulp.dest(destinationBuildPath));
    },
    'release:build': function () {
      return project.src()
        .pipe(project())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(buildPathNS));
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
    'bundle:packages': function (callback) {
      require('./../config.js');
      var list = Object.keys(System.packages)
        .map(function (m) { return m
          .replace('file:///', '')
          .replace('node_modules', '**node_modules')
          .replace('build', '**build') + '/**/*.js'; }
        )
        .concat(libsSourcePathDebug)
        .concat(['config.js']);

      return gulp.src(list).pipe(gulp.dest(destinationBasePath));
    },
    'bundle:code': function (callback) {
      return gulp.src(buildPath.replace('build', '**build') + '/**/*.js').pipe(gulp.dest(destinationBasePath));
    },
    'bundle:source': function (callback) {
      return gulp.src(sourcePath).pipe(gulp.dest(destinationPath));
    },
    'release:bundle': function () {
      var builder = new Builder('', './config.js');
      return builder.buildStatic('app', buildPath + '/app.js', { minify: true, sourceMaps: false });
    },
    'aot:bundle': function () {
      var builder = new Builder('', './config.js');
      return builder.buildStatic('app', buildPath + '/app.js', { minify: true, sourceMaps: false });
    },
    'release:license': function () {
      return gulp.src(buildPath + '/app.js')
        .pipe(plugins.insert.prepend(`/*
 * For full list of licenses see license.txt
 */
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
    concat: function () {
      return gulp.src([buildPath + 'libs.js', buildPath + 'app.js'])
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest(destinationPath));
    },
    clean: function () {
      return gulp.src([destinationPath, buildPath, aotPath])
        .pipe(plugins.clean({ force: true }));
    },
    watch: function () {
      return gulp.watch(sourcePath, [task + ':default:watch']);
    }
  };
};
