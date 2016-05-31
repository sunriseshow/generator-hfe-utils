var through = require('through2');
var exec = require('child_process').exec;

function Prepub(c) {
    var cfg = c || {};
    return through.obj(function (file, env, callback) {
        var publishType = cfg.publishType;
        var group = cfg.group.toLowerCase();
        var repoName = cfg.repoName;
        var filePath;
        var i = 0;
        if (file.path.indexOf('build/pages') > -1) {
            filePath = (file.path.split(repoName + '/build/pages/')[1]);
        } else {
            filePath = (file.path.split(repoName + '/build/')[1]);
        }
        if (filePath) {
            publish(file.path, publishType, group, repoName, filePath);
        } else {
            console.log('Oops! publish fails, check the `project name (dir name)` and `repo-info \'s name field ` values consistency'.red);
        }

        function publish(path, publishType, group, repoName, filePath) {
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
                    if (i < 3) {
                        console.log(('Failed. File：[' + filePath + '] failed to publish! Retrying ' + (i + 1) + ' times.\n').red);
                        publish(file.path, publishType, group, repoName, filePath);
                        i++;
                    } else {
                        console.log('\nMaybe there is a problems with AWP, please retry `prepub` or `publish` again, If the problem persists, concat @maquan.\n'.red);
                        process.exit();
                    }
                } else {
                    console.log(('Successfully. Url: ' + stdout + '').green);
                }
            });
        }
        callback();
    });
}
module.exports = Prepub;
