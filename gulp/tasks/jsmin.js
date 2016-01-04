'use strict';

module.exports = function (gulp, Plugin, config) {

	gulp.task('hfe-jsmin',['hfe-copyto'], function () {
		gulp.src('src/**/*.js')
        .pipe(Plugin.jsmin())
        .pipe(Plugin.rename({suffix: '.min'}))
        .pipe(gulp.dest('build'));
	})
};
