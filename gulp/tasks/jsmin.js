module.exports = function (gulp, Plugin, config) {
    gulp.task('hfe-jsmin', ['hfe-copyto'], function () {
        gulp.src('src/**/*.js')
            .pipe(Plugin.jsmin())
            .pipe(gulp.dest('build'));
    });
};
