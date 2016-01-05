'use strict';

module.exports = function (gulp, Plugin, config) {
	gulp.task('hfe-cssmin',['hfe-copyto','hfe-sass'], function () {
		return gulp.src('src/**/*.css')
        .pipe(Plugin.cssmin())
        .pipe(gulp.dest('build'));
	})
};
