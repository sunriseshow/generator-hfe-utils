module.exports = function (gulp, Plugin, config) {
    gulp.task('ssi', function () {
        var SSI = Plugin.ssi;
        var inputDirectory = process.cwd() + '/src/';
        var outputDirectory = process.cwd() + '/build/';
        var matcher = '/**/*.html';
        var includes = new SSI(inputDirectory, outputDirectory, matcher);
        includes.compile();
    });
}
