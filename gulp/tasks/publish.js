// 发布到线上，示例命令===>[gulp publish]
var spawn = require('child_process').spawn;
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs-extra');
module.exports = function (gulp, Plugin, config) {
    var gulpConfig = require(path.join(__dirname, '../gulp.config.js'));
    var command = gulpConfig.exec;
    gulp.task('publish', ['build'], function () {
        var branch = Plugin.repoInfoJSON.version;
        Plugin.repoInfoJSON.timestamp = +new Date();
        fs.writeJson('./repo-info.json', Plugin.repoInfoJSON, function (err) {
            if (err) {
                console.log(err.red);
            } else {
                exec('git rev-parse --abbrev-ref HEAD', function (e, out, se) { // o ==> daily/0.1.0 当前分支名
                    var o = out.replace(/\r|\n/ig,"");
                    exec(command.publish(o, '分支 ' + o + ' 上线'), function (err, stdout, stderr) {
                        var msg = '命令 >>> ' + command.prepub(o, '发布分支' + o) + ' <<< 的执行结果：';
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
            }
        });
    });
};
