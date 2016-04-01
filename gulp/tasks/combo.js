var uc = require('url-complete');

module.exports = function (gulp, Plugin, config) {
    var useCombo = Plugin.repoInfoJSON.useCombo || false;

    gulp.task('hfe-combo', ['ssi'], function () {
        var repoinfo = require(process.cwd() + '/repo-info.json');
        var baseUri
        if (repoinfo.useHttps || repoinfo.useHttps === 'true') {
            baseUri = 'https://awp-assets.meituan.net/;;';
        } else {
            baseUri = 'http://awp-assets.meituan.net/;;';
        }
        if (useCombo) {
            gulp.src('build/**/*.html')
                .pipe(Plugin.precombo(repoinfo))
                .pipe(Plugin.combo(baseUri, null))
                .pipe(gulp.dest('build'));
        } else {
            gulp.src('build/**/*.html')
                .pipe(uc({
                    url: 'http://awp-assets.meituan.net',
                    group: repoinfo.group.toLowerCase(),
                    version: repoinfo.version,
                    projectName: repoinfo.name.toLowerCase()
                }))
                .pipe(gulp.dest('build'));
        }
    });
    gulp.task('hfe-combo:prepub', ['ssi'], function () {
        var repoinfo = require(process.cwd() + '/repo-info.json');
        var baseUri
        if (repoinfo.useHttps || repoinfo.useHttps === 'true') {
            baseUri = 'https://awp-assets.sankuai.com/;;';
        } else {
            baseUri = 'http://awp-assets.sankuai.com/;;';
        }

        if (useCombo) {
            gulp.src('build/**/*.html')
                .pipe(Plugin.precombo(repoinfo))
                .pipe(Plugin.combo(baseUri, null))
                .pipe(gulp.dest('build'));
        } else {
            gulp.src('build/**/*.html')
                .pipe(uc({
                    url: 'http://awp-assets.sankuai.com',
                    group: repoinfo.group.toLowerCase(),
                    version: repoinfo.version,
                    projectName: repoinfo.name.toLowerCase()
                }))
                .pipe(gulp.dest('build'));
        }
    });
};
