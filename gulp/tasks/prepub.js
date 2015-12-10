'use strict';
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs-extra');
module.exports = function (gulp, Plugin, config) {
	var path = require('path');
	var gulpConfig = require(path.join(__dirname, '../gulp.config.js')),
		command = gulpConfig.exec;
	gulp.task('prepub', function () {
		var msg_shell = gulp.env.m;
		if (!msg_shell) {
			console.log('请输入发布内容，例如：gulp prepub -m \'bugfix\''.red);
			return;
		}
		try {
			Plugin.repoInfoJSON.timestamp = +new Date();
			fs.writeJson("./repo-info.json", Plugin.repoInfoJSON, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Update repo-info.json file successfully");
				}
			});
		} catch (e) {
			console.log('Can not find repo-info.json file, please try again.');
		}
		var buildPrepub = exec('gulp build:prepub', function (err, stdout, stderr) {
			exec(command.prepub(Plugin.repoInfoJSON.version, msg_shell), function (err, stdout, stderr) {
				var msg = "命令 >>> " + command.prepub(Plugin.repoInfoJSON.version, msg_shell) + " <<< 的执行结果：";
				console.log(msg.green);
				if (err) {
					console.log(err)
				} else {
					console.log(stdout);
					console.log(stderr);
					var gulpJudge = spawn('gulp', ['hfe-judgetag', '--env', 'prepub']);
					gulpJudge.stdout.pipe(process.stdout)
					gulpJudge.stderr.pipe(process.stderr)
					gulpJudge.on('close', function (code) {
						if (code == 0) {
							gulp.run('hfe-prepub:html');
						}
					})
				}
			})
		});
		buildPrepub.stdout.pipe(process.stdout)
		buildPrepub.stderr.pipe(process.stderr)

	});
};
