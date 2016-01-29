module.exports = function (gulp, Plugin, config) {
    gulp.task('hfe-del', function () {
        Plugin.del.sync('build');
    });
};
