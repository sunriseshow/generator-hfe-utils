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

var ri = execSync('git remote show origin -n | grep h.URL | sed "s/.*:\\/\\///;s/\git@git.sankuai.com\\///;s/.git$//"', {
    cwd: process.cwd()
});
var sri = String(ri).replace('\n', '');
var repoGroup = sri.split('/')[0];
var repoName = sri.split('/')[1];
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
