module.exports = function (gulp, plugins, task) {
  let sourceRoot = './';
  let sourcePath = [
    sourceRoot + '{images,audio}**/**/*.{png,jpg,svg,m4a,gif}'
  ];
  let destinationPath = './release/';

  return {
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', callback);
    },
    release: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', callback);
    },
    'release-aot': function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', callback);
    },
    build: function () {
      return gulp.src(sourcePath)
        .pipe(gulp.dest(destinationPath));
    },
    clean: function () {
      return gulp.src([destinationPath + '{images,audio}'])
        .pipe(plugins.clean({force: true}));
    },
    watch: function () {
      return gulp.watch(sourcePath, [task]);
    }
  };
};