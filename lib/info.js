var exec = require('child_process').exec;
var Promise = require('bluebird');
var info = {};
module.exports = new Promise(function (resolve, reject){
    exec('git remote show origin -n | grep h.URL | sed "s/.*:\\/\\///;s/\git@git.sankuai.com\\///;s/.git$//"', function(error, stout, sterr) {
        if (!error) {
            info.group = stout.split('/')[0];
            info.name = stout.split('/')[1].replace('\n','');
            resolve(info);
        }
    });
})
