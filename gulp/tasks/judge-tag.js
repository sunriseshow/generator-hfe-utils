var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

function gitTagFunc (currentTag) {
    exec('git tag -afm ' + new Date().getTime() + ' ' + currentTag, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
        }
        var pushOrignTag = spawn('git', ['push', 'origin', currentTag]);
        pushOrignTag.stderr.pipe(process.stderr);
    });
}
module.exports = function (gulp, Plugin, config) {
    gulp.task('hfe-judgetag', function () {
        var version = Plugin.repoInfoJSON.version;
        var ev = gulp.env.env === 'prepub' ? 'daily' : 'publish';
        var currentTag = 'hfe-awp/' + ev + '/' + version;

        exec('git tag', function (err, stdout, stderr) {
            if (err) {
                console.log(err);
            }
            if (stdout.indexOf(currentTag) > -1) {
                var command = 'git tag -d ' + currentTag + ' && git push origin :refs/tags/' + currentTag;
                exec(command, function (err, stdout, stderr) {
                    gitTagFunc(currentTag);
                });
            } else {
                exec('git push origin :refs/tags/' + currentTag, function (err, stdout, stderr) {
                    if (err) {
                        console.log(err);
                    }
                    gitTagFunc(currentTag);
                });
            }
        });
    });
};
