'use strict';
var gulp = require('gulp'),
	path = require('path'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	colors = require('colors'),
	exec = require('child_process').exec,
	spawn = require('child_process').spawn,
	fs = require('fs-extra');
var gulpConfig = require(path.join(__dirname, '../gulp/gulp.config.js')),
	gulpTaskList = require('fs').readdirSync(path.join(__dirname, '../gulp/tasks/'));

gulpLoadPlugins.repoInfoJSON = require(path.resolve(process.cwd(), 'repo-info.json'));
gulpLoadPlugins.del = require('del');
gulpLoadPlugins.cssmin = require('gulp-cssmin');
gulpLoadPlugins.rename = require('gulp-rename');
gulpLoadPlugins.jsmin = require('gulp-jsmin');
gulpLoadPlugins.combo = require('gulp-combo');
gulpLoadPlugins.precombo = require('gulp-pre-combo');
gulpLoadPlugins.path = path;
gulpLoadPlugins.jeditor = require("gulp-json-editor");
gulpLoadPlugins.sass = require('gulp-sass');
gulpLoadPlugins.ssi = require("gulp-html-ssi2");
gulpLoadPlugins.util = require(path.join(__dirname, '../gulp/util/index'));
gulpLoadPlugins.FwdRef = require('undertaker-forward-reference');

/**
 * 初始化目录中的task
 */
//cmd+c的时候把proxrox服务停止
process.on('SIGINT', function () {
	exec('proxrox stop');
	process.exit();
});

exports.gulp = gulp;
exports.gulpTaskList = gulpTaskList;
exports.gulpPath = path.join(__dirname, '../gulp/tasks/');
exports.gulpLoadPlugins = gulpLoadPlugins;
exports.gulpConfig = gulpConfig;
