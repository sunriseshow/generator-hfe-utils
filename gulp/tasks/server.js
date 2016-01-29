module.exports = function (gulp, Plugin, config) {
    var browserSync = require('browser-sync').create();
    var ssi = require('browsersync-ssi');
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
            open: false,
            ghostMode: false
        });
    });
    gulp.task('server', ['watch', 'browser-sync']);
};
