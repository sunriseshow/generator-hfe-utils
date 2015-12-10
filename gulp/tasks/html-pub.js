'use strict';

var prepub = require('../util/pub');

module.exports = function (gulp, Plugin, config) {
	var repoinfo = Plugin.repoInfoJSON;
	var pt = repoinfo.publishType;
	var pubconfig = config.pubConfig;
	gulp.task('hfe-prepub:html', function () {
		var publishType = pubconfig[pt][1] //测试环境
		var cfg = {
			version: repoinfo.version,
			group: repoinfo.group.toLowerCase(),
			repoName: repoinfo.name.toLowerCase(),
			publishType: publishType
		}
		gulp.src('build/**/*.html')
			.pipe(prepub(cfg));
	});
	gulp.task('hfe-publish:html', function () {
		var publishType = pubconfig[pt][0] //正式环境
		var cfg = {
			version: repoinfo.version,
			group: repoinfo.group.toLowerCase(),
			repoName: repoinfo.name.toLowerCase(),
			publishType: publishType
		}
		gulp.src('build/**/*.html')
			.pipe(prepub(cfg));
	});
};
