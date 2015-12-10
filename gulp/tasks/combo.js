'use strict';

var path = require('path');
var uc = require(path.join(__dirname, '../url-complete'));

module.exports = function (gulp, Plugin, config) {
	var useCombo = Plugin.repoInfoJSON.useCombo || false;
	gulp.task('hfe-combo', ['hfe-del', 'hfe-copyto'], function () {
		var repoinfo = require(process.cwd() + '/repo-info.json');
		var baseUri = 'http://awp-assets.meituan.net/??';

		if (useCombo) {
			gulp.src('src/**/*.html')
				.pipe(Plugin.precombo(repoinfo))
				.pipe(Plugin.combo(baseUri, null))
				.pipe(Plugin.ssi())
				.pipe(gulp.dest('build'));
		} else {
			gulp.src('src/**/*.html')
				.pipe(uc({
					url: 'http://awp-assets.meituan.net',
					group: repoinfo.group.toLowerCase(),
					version: repoinfo.version,
					projectName: repoinfo.name.toLowerCase()
				}))
				.pipe(Plugin.ssi())
				.pipe(gulp.dest('build'));
		}
	});
	gulp.task('hfe-combo:prepub', ['hfe-del', 'hfe-copyto'], function () {
		var repoinfo = require(process.cwd() + '/repo-info.json');
		var baseUri = 'http://awp-assets.sankuai.com/??';
		if (useCombo) {
			gulp.src('src/**/*.html')
				.pipe(Plugin.precombo(repoinfo))
				.pipe(Plugin.combo(baseUri, null))
				.pipe(Plugin.ssi())
				.pipe(gulp.dest('build'));
		} else {
			gulp.src('src/**/*.html')
				.pipe(uc({
					url: 'http://awp-assets.sankuai.com',
					group: repoinfo.group.toLowerCase(),
					version: repoinfo.version,
					projectName: repoinfo.name.toLowerCase()
				}))
				.pipe(Plugin.ssi())
				.pipe(gulp.dest('build'));
		}
	})
};
