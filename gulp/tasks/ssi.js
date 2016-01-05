'use strict';
module.exports = function(gulp, Plugin, config){
	gulp.task('ssi', function () {
		var ssi  = Plugin.ssi;
		var inputDirectory = process.cwd() + "/src/";
		var outputDirectory = process.cwd() + "/build/";
		var matcher = "/**/*.html";
		var includes = new ssi(inputDirectory, outputDirectory, matcher);
		includes.compile();
	});
}