'use strict';
var spawn = require('child_process').spawn;
module.exports = function (gulp, Plugin, config) {
	//生成离线包
	gulp.task('zip', function () {
		var p = (process.cwd() + '/build.sh');
		var gulpzip = spawn(p);
		gulpzip.stdout.pipe(process.stdout)
	});
};
