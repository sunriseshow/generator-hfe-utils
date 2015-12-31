'use strict';
var exec = require('child_process').exec;
module.exports = function (gulp, Plugin, config) {
	var browserSync = require('browser-sync').create();
	var ssi = require('browsersync-ssi');
	var browserSyncPorxy = Plugin.repoInfoJSON.browserSyncPorxy;
	var port = Plugin.repoInfoJSON.port;
	var path = Plugin.repoInfoJSON.root;
	gulp.task('browser-sync', function () {
		browserSync.init({
			files: path,
			server: {
				directory: true,
				baseDir: path,
				middleware: ssi({
					baseDir: process.cwd() + '/src',
					ext: '.html'
				})
			},
			port: port,
			open: false
		});
	});
	gulp.task('server', ['watch', 'browser-sync']);
};