const USER = 'kress92cs';
const PASS = 'QWaszx123890';
const REPO = 'github.com/kress92cs/nodejsclone'

const gitPromise = require('simple-git/promise');
const git = gitPromise(require('os').homedir() + "\\GitHub");

const remote = `https://${USER}:${PASS}@${REPO}`;



module.exports = (context, search) => {
    if (search === 'clone') {
        git.silent(true)
            .clone(remote)
            .then(() => console.log('finished cloning ' + REPO +
                " as user: " + USER + " to destination " +
                require('os').homedir()) + "\\GitHub")
            .catch((err) => console.error('failed: ' + "as user: " + USER, err));
    }
    if (search === "pull") {
        require('simple-git')(require('os').homedir() + "\\GitHub\\nodejsclone")
            .pull((err, update) => {
                if (update && update.summary.changes) {
                    console.log("Successfull pulled down " + update.summary.changes + " number of files")
                    require('child_process').exec('npm restart');
                }
            });
    }
    if (search === "commit") {
        require('simple-git')(require('os').homedir() + "\\GitHub\\nodejsclone")
            .add('./*')
            .commit("first commit!")
            .push(['-u', 'origin', 'master'], () => console.log('done'));
    }
}