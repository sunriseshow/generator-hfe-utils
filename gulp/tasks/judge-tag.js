var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

function gitTagFunc (currentTag) {
    var prepubProp = spawn('git', ['tag', '-f', '-a', '-m', new Date().getTime(), currentTag]);
    prepubProp.stdout.pipe(process.stdout);
    prepubProp.stderr.pipe(process.stderr);
    prepubProp.stdout.on('close', function (code) {
        if (code === 0) {
            var pushOrignTag = spawn('git', ['push', 'origin', currentTag]);
            pushOrignTag.stderr.pipe(process.stderr);
        }
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
                var command = 'git tag -d ' + currentTag + ' && git push origin --delete ' + currentTag;
                console.log(command);
                exec(command, function (err, stdout, stderr) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(stdout);
                    console.log(stderr);
                    gitTagFunc(currentTag);
                });
            } else {
                exec('git push origin --delete ' + currentTag, function (err, stdout, stderr) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(stdout);
                    console.log(stderr);
                    gitTagFunc(currentTag);
                });
            }
        });
    });
};
