//发布到线上，示例命令===>[gulp publish]
'use strict';
var spawn = require('child_process').spawn;
module.exports = function (gulp, Plugin, config) {
    gulp.task('publish',['build'], function () {
    	var gulpJudge = spawn('gulp', ['hfe-judgetag', '--env', 'publish']);
    	gulpJudge.stdout.pipe(process.stdout)
    	gulpJudge.stderr.pipe(process.stderr)
    	gulpJudge.on('close', function (code) {
    		if (code == 0) {
    			gulp.run('hfe-publish:html');
    		}
    	})
    });
};
