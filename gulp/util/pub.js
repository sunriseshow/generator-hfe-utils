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

        if (filePath) {
            publish(file.path, publishType, group, repoName, filePath);
        } else {
            console.log('HTML发布失败，请检查`工程名`与`repo-info.json`中的`name`字段值是否一致'.red);
        }

        function publish (path, publishType, group, repoName, filePath) {
            var command = 'curl -F "file=@' + path + '" -F "publishType=' +
                publishType + '" -F "group=' + group + '" -F "clearCache=true' +
                '" -F "repoName=' + repoName + '" -F "filePath=' + filePath +
                '"  http://hfe.sankuai.com/cdn/upload';
            exec(command, function (err, stdout, stderr) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (stdout === '500') {
                    console.log(('文件：' + filePath + ' 发布失败！').red);
                } else {
                    console.log(('文件：' + stdout + ' 发布成功！').green);
                }
            });
            cb(null, file);
        }
    });
}
module.exports = Prepub;
