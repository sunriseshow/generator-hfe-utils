// 发布到线上，示例命令===>[gulp publish]
var spawn = require('child_process').spawn;
var path = require('path');
var exec = require('child_process').exec;
module.exports = function (gulp, Plugin, config) {
    var gulpConfig = require(path.join(__dirname, '../gulp.config.js'));
    var command = gulpConfig.exec;
    gulp.task('publish', ['build'], function () {
        var branch = Plugin.repoInfoJSON.version;
        exec(command.publish(branch, '分支 ' + branch + ' 上线'), function (err, stdout, stderr) {
            var msg = '命令 >>> ' + command.prepub(branch, '分支 ' + branch + ' 上线') + ' <<< 的执行结果：';
            console.log(msg.green);
            if (err) {
                console.log(err);
            } else {
                console.log(stdout);
                console.log(stderr);
                var gulpJudge = spawn('gulp', ['hfe-judgetag', '--env', 'publish']);
                gulpJudge.stdout.pipe(process.stdout);
                gulpJudge.stderr.pipe(process.stderr);
                gulpJudge.on('close', function (code) {
                    if (code === 0) {
                        gulp.run('hfe-publish:html');
                    }
                });
            }
        });
    });
};
