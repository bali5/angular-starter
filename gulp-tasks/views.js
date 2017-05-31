module.exports = function (gulp, plugins, task) {
  let sourceRoot = './views/';
  let sourcePath = [
    sourceRoot + '**/*.html'
  ];
  let destinationPath = './release/views/';

  return {
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', callback);
    },
    release: function (callback) {
      plugins.runSequence(task + ':clean', callback);
    },
    build: function () {
      return gulp.src(sourcePath)
        .pipe(gulp.dest(destinationPath));
    },
    clean: function () {
      return gulp.src([destinationPath])
        .pipe(plugins.clean({force: true}));
    },
    watch: function () {
      plugins.watch(sourcePath, function () {
        gulp.start('default');
      });
    }
  };
};