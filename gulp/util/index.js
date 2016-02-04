var exec = require('child_process').exec;

function getBiggestVersion (A) {
    var a = [];
    if (!A) {
        return [0, 0, 0];
    }
    for (var i = 0; i < A.length; i++) {
        if (A[i].match(/^\d+\.\d+\.\d+$/)) {
            var sp = A[i].split('.');
            a.push([
                Number(sp[0]), Number(sp[1]), Number(sp[2])
            ]);
        }
    }

    var r = findMax(findMax(findMax(a, 0), 1), 2);
    console.log(r)
    return r[0];
}

// a：二维数组，index，比较第几个
// return：返回保留比较后的结果组成的二维数组
function findMax (a, index) {
    var t = [];
    var b = [];
    var r = [];
    for (var i = 0; i < a.length; i++) {
        t.push(Number(a[i][index]));
    }
    var max = Math.max.apply(this, t);

    for (var j = 0; j < a.length; j++) {
        if (a[j][index] === max) {
            b.push(j);
        }
    }
    for (var m = 0; m < b.length; m++) {
        r.push(a[b[m]]);
    }
    return r;
}

/**
 * 格式化离线包版本号
 * @param  {[type]} v [description]
 * @return {[type]}   [description]
 */
function formatZipVersion (vv) {
    var v = String(vv);
    var yy = new Date().getFullYear();
    var mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
    var dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
    var diffDd = v.substr(0, 8);
    var times;
    if (String(yy) + String(mm) + String(dd) === String(diffDd)) { // 日期前缀不同，重新定义次数
        times = v.substr(-2) * 1 + 1 < 10 ? '0' + (v.substr(-2) * 1 + 1) : v.substr(-2) * 1 + 1;
    } else {
        times = '01';
    }
    return String(yy) + String(mm) + String(dd) + String(times);
}

/**
 * 执行git命令，接收指令，返回结果
 *
 */

function execGitCommand (command) {
    exec(command, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
        }
        var msg = '命令 >>> ' + command + ' <<< 的执行结果：';
        console.log(msg.green);
        if (stderr) {
            console.log(stdout);
            console.log(stderr);
        }
    });
}

module.exports = {
    'getBiggestVersion': getBiggestVersion,
    'formatZipVersion': formatZipVersion,
    'execGitCommand': execGitCommand
};
