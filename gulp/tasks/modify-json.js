var util = require('../util/index');

module.exports = function (gulp, Plugin, config) {
    gulp.task('hfe-mj', function () {
        var name = gulp.env.name;
        var repoinfo = Plugin.repoInfoJSON;
        var zipUrl = 'http://awp-assets.meituan.net/' + repoinfo.group + '/' + repoinfo.name + '/' + repoinfo.version + '/' + name + '.zip';
        gulp.src('offline.json')
            .pipe(Plugin.jeditor(function (json) {
                json.data[0].src = zipUrl;
                var zv = json.data[0].zipVersion; // 获取配置文件中的版本号
                json.data[0].zipVersion = util.formatZipVersion(zv);
                return json;
            }))
            .pipe(gulp.dest('./'));
    });
    gulp.task('shell_modify-offline-json', ['hfe-mj'], function () {
        console.log('ModifyOfflineJson has Completed!');
    });
};
