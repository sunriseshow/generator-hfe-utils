var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs-extra');
module.exports = function (gulp, Plugin, config) {
    var path = require('path');
    var gulpConfig = require(path.join(__dirname, '../gulp.config.js'));
    var command = gulpConfig.exec;
    gulp.task('prepub', function () {
        var prompt = require('gulp-prompt');
        var pubconfig = config.pubConfig;
        var pt = Plugin.repoInfoJSON.publishType;
        var choicesArr = [];
        if (pt === 'pc') { // 单独为pc类型的发布项增加一套staging环境
            choicesArr = ['default', 'pc:staging', 'test01', 'test02', 'test03', 'test04'];
        } else {
            choicesArr = ['default', 'test01', 'test02', 'test03', 'test04'];
        }
        gulp.src(' ')
            .pipe(prompt.prompt([{
                type: 'checkbox',
                name: 'publishType',
                message: '请选择你要发布的测试环境（可多选）：',
                choices: choicesArr
            }, {
                type: 'input',
                name: 'msg',
                message: '请输入本次变更的内容，用于git ci提交：'
            }], function (res) {
                if (res.msg === '') {
                    console.log('请输入发布内容，例如：gulp prepub -m \'bugfix\''.red);
                    return;
                }
                try {
                    var typeArr = [];
                    if (res.publishType.length === 0) {
                        typeArr = ['default'];
                    } else {
                        typeArr = res.publishType;
                    }
                    for (var i = 0, len = typeArr.length; i < len; i++) {
                        if (typeArr[i] === 'default') {
                            typeArr[i] = pubconfig[Plugin.repoInfoJSON.publishType][1];
                        }
                    }
                    Plugin.repoInfoJSON.timestamp = +new Date();
                    Plugin.repoInfoJSON.toTest = typeArr; // 为了方便发布，新增字段
                    fs.writeJson('./repo-info.json', Plugin.repoInfoJSON, function (err) {
                        if (err) {
                            console.log(err.red);
                        } else {
                            console.log("Update 'repo-info.json' successfully!".green);
                        }
                    });
                } catch (e) {
                    console.log('Can not find repo-info.json file, please try again.'.red);
                }
                var buildPrepub = exec('gulp build:prepub --color', function (err, stdout, stderr) {
                    if (err) {
                        console.log(err);

                    } else {
                        exec('git rev-parse --abbrev-ref HEAD', function (e, out, se) {
                            var o = out.replace(/\r|\n/ig, "");
                            exec(command.prepub(o, res.msg), function (err, stdout, stderr) {
                                // o ==> daily/0.1.0 当前分支名
                                var msg = '命令 >>> ' + command.prepub(o, res.msg) + ' <<< 的执行结果：';
                                console.log(msg.green);
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(stdout);
                                    console.log(stderr);
                                    var gulpJudge = spawn('gulp', ['hfe-judgetag', '--env', 'prepub']);
                                    gulpJudge.stdout.pipe(process.stdout);
                                    gulpJudge.stderr.pipe(process.stderr);
                                    gulpJudge.on('close', function (code) {
                                        if (code === 0) {
                                            gulp.run('hfe-prepub:html');
                                        }
                                    });
                                }
                            });
                        });
                    }

                });
                buildPrepub.stdout.pipe(process.stdout);
                buildPrepub.stderr.pipe(process.stderr);
            }));
    });
};
