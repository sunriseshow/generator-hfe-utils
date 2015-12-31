'use strict';
var exec = require('child_process').exec;
var fs = require('fs-extra');
var path = require('path');
module.exports = function (gulp, Plugin, config) {

	gulp.task('newbranch', function () {
		exec('git branch -a && git tag', function (err, stdout, stderr, cb) {
			//非GIT仓库
			if (err) {
				console.log(stderr);
				return;
			}
			var versions = stdout.match(/\d+\.\d+\.\d+/ig),
				r = Plugin.util.getBiggestVersion(versions);

			if (!r || !versions) {
				r = '0.1.0';
			} else {
				r[2]++;
				r = r.join('.');
			}
			console.log('New branch name：daily/' + r);
			var execStr = 'git checkout -b daily/' + r;
			exec(execStr);

			// 回写入repo-info.json 的 version
			try {
				Plugin.repoInfoJSON.version = r;
				fs.writeJson(process.cwd() + "/repo-info.json", Plugin.repoInfoJSON, function (err) {
					if (err) {
						console.log(err);
					} else {
						console.log("Update repo-info.json file successfully");
					}
				});
				var offlineJSON = require(path.resolve(process.cwd(), 'offline.json'));
				offlineJSON.data[0].version = r;
				fs.writeJson(process.cwd() + "/offline.json", offlineJSON, function (err) {
					if (err) {
						console.log(err);
					} else {
						console.log("Update offline.json file successfully");
					}
				});
			} catch (e) {
				console.log(e)
				console.log('Can not find repo-info.json file, please try again.');
			}
		});
	});
};
