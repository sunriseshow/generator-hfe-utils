var through = require('through2');
var exec = require('child_process').exec;

function Prepub (c) {
    var cfg = c || {};
    return through.obj(function (file, env, cb) {
        var publishType = cfg.publishType;
        var group = cfg.group.toLowerCase();
        var repoName = cfg.repoName;
        var filePath;
        if (file.path.indexOf('build/pages') > -1) {
            filePath = (file.path.split(repoName + '/build/pages/')[1]);
        } else {
            filePath = (file.path.split(repoName + '/build/')[1]);
        }
        publish(file.path, publishType, group, repoName, filePath);

        function publish (path, publishType, group, repoName, filePath) {
            // 发送post请求
            var command = 'curl -F "file=@' + path + '" -F "publishType=' +
                publishType + '" -F "group=' + group + '" -F "clearCache=true' +
                '" -F "repoName=' + repoName + '" -F "filePath=' + filePath +
                '"  http://hfe.sankuai.com/cdn/upload';
            // var command = 'curl -F "file=@' + file.path + '" -F "publishType=' + publishType + '"  -F "version=' + version + '" -F "group=' + group + '" -F "repoName=' + repoName + '" -F "filePath=' + filePath + '"  http://localhost:8000/cdn/upload';

            exec(command, function (err, stdout, stderr) {
                if (err) {
                    console.log(err);
                }
                // console.log('command:' + command);
                if (stdout === '500') {
                    console.log(('文件：' + stdout + ' 发布失败！').red);
                } else {
                    console.log(('文件：' + stdout + ' 发布成功！').green);
                }
            });
            cb(null, file);
        }
    });
}
module.exports = Prepub;
