'use strict';
var gulp = require('gulp'),
    path = require('path'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    colors = require('colors'),
    exec = require('child_process').exec,
    execSync = require('child_process').execSync,
    spawn = require('child_process').spawn,
    fs = require('fs-extra');
var gulpConfig = require(path.join(__dirname, '../gulp/gulp.config.js'));
var gulpTaskList = require('fs').readdirSync(path.join(__dirname, '../gulp/tasks/'));

var ri = execSync('git remote show origin -n | grep Fetch.URL', {
    cwd: process.cwd()
});
var riArr = String(ri).replace('\n', '').split('/').reverse();
if (riArr.length === 0) {
    console.log('Opps! Perhaps you have not push to origin.');
    return;
}
var repoGroup = riArr[1];
var repoName = riArr[0].replace('.git', '');
gulpLoadPlugins.repoInfoJSON = require(path.resolve(process.cwd(), 'repo-info.json'));
gulpLoadPlugins.repoInfoJSON.name = repoName;
gulpLoadPlugins.repoInfoJSON.group = repoGroup;

gulpLoadPlugins.del = require('del');
gulpLoadPlugins.cssmin = require('gulp-cssmin');
gulpLoadPlugins.rename = require('gulp-rename');
gulpLoadPlugins.jsmin = require('gulp-jsmin');
gulpLoadPlugins.combo = require('gulp-combo');
gulpLoadPlugins.precombo = require('gulp-pre-combo');
gulpLoadPlugins.path = path;
gulpLoadPlugins.jeditor = require("gulp-json-editor");
gulpLoadPlugins.sass = require('gulp-sass');
gulpLoadPlugins.ssi = require("ssi");
gulpLoadPlugins.util = require(path.join(__dirname, '../gulp/util/index'));



exports.gulp = gulp;
exports.gulpTaskList = gulpTaskList;
exports.gulpPath = path.join(__dirname, '../gulp/tasks/');
exports.gulpLoadPlugins = gulpLoadPlugins;
exports.gulpConfig = gulpConfig;
