var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

function gitTagFunc(currentTag) {
    exec('git tag -afm ' + new Date().getTime() + ' ' + currentTag, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            return;
        }
        var pushOrignTag = spawn('git', ['push', 'origin', currentTag]);
        pushOrignTag.stderr.pipe(process.stderr);
    });
}
module.exports = function (gulp, Plugin, config) {
    gulp.task('hfe-judgetag', function () {
        var version = Plugin.repoInfoJSON.version;
        var ev = gulp.env.env === 'prepub' ? 'daily' : 'publish';
        var currentTag = 'awp/' + ev + '/' + version;

        exec('git tag', function (err, stdout, stderr) {
            if (err) {
                console.log(err.red);
                return;
            }
            if (stdout.indexOf(currentTag) > -1) {
                var command = 'git tag -d ' + currentTag + ' && git push origin :refs/tags/' + currentTag;
                exec(command, function (err, stdout, stderr) {
                    if (err) {
                        console.log(err.red);
                        return;
                    }
                    gitTagFunc(currentTag);
                });
            } else {
                exec('git push origin :refs/tags/' + currentTag, function (err, stdout, stderr) {
                    if (err) {
                        console.log(err.red);
                        return;
                    }
                    gitTagFunc(currentTag);
                });
            }
        });
    });
};
