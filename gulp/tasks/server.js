'use strict';
var exec = require('child_process').exec;
module.exports = function (gulp, Plugin, config) {
	gulp.task('server', ['hfe-sass:watch'], function () {
		exec('proxrox stop ;proxrox start repo-info.json', function (err, stdout, stderr) {
			console.log(stdout);
			if (stderr) {
				console.log(stdout);
				console.log(stderr);
			}
		});
	});
};
