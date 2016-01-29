var exec = require('child_process').exec;
module.exports = function (gulp, Plugin, config) {
    // 生成离线包
    gulp.task('zip', function () {
        var repoInfoJSON = Plugin.repoInfoJSON;
        var group = repoInfoJSON.group;
        var name = repoInfoJSON.name;
        var version = repoInfoJSON.version;
        var p = (process.cwd() + '/build.sh') + ' ' + group + ' ' + name + ' ' + version;
        var gulpzip = exec(p);
        gulpzip.stdout.pipe(process.stdout);
    });
};
