module.exports = function (gulp, Plugin, config) {
    gulp.task('hfe-copyto', function () {
        return gulp.src('src/**/*.*')
            .pipe(gulp.dest('build'));
    });
};
