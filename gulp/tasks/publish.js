// 发布到线上，示例命令===>[gulp publish]
var spawn = require('child_process').spawn;
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs-extra');
module.exports = function (gulp, Plugin, config) {
    var gulpConfig = require(path.join(__dirname, '../gulp.config.js'));
    var command = gulpConfig.exec;
    gulp.task('publish', function () {
        var version = Plugin.repoInfoJSON.version;
        var currentTag = 'awp/publish/' + version;

        exec('git tag', function (err, stdout, stderr) {
            if (err) {
                console.log(err);
            }
            if (stdout.indexOf(currentTag) === -1) {
                var gulpBuild = exec('gulp build', function (gberr, gbout, gb) {
                    if (gberr) {
                        console.log(gberr);
                    } else {
                        Plugin.repoInfoJSON.timestamp = +new Date();
                        fs.writeJson('./repo-info.json', Plugin.repoInfoJSON, function (err) {
                            if (err) {
                                console.log(err.red);
                            } else {
                                exec('git rev-parse --abbrev-ref HEAD', function (e, out, se) { // o ==> daily/0.1.0 当前分支名
                                    var o = out.replace(/\r|\n/ig, '');
                                    exec(command.publish(o, 'publish branch: ' + o), function (err, stdout, stderr) {
                                        var msg = '\nThe following command is executed:\n> ' + command.prepub(o, 'publish branch: ' + o) + '\nplease wait.';
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
                    }
                });
                gulpBuild.stdout.pipe(process.stdout);
                gulpBuild.stderr.pipe(process.stderr);
            } else {
                console.log("Oops, there is something wrong! \nTo confirm that this branch has not been published, or you can run `gulp newbranch` to switch to a new branch to publish!\nHave problems? concat @maquan".red);
            }
        });



    });
};
