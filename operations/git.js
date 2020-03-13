const dotenv = require('dotenv');
dotenv.config();

const USER = process.env.USER;
const PASS = process.env.PASSWORD;
const REPO = REPO_MAIN + 'image-api-chris/src/master/'

const fs = require('fs');
const gitPromise = require('simple-git/promise');

const remote = `https://${USER}:${PASS}@${REPO}`;



module.exports = (context, search) => {

    const git = gitPromise(context.root);
    if (search === 'clone') {
        git.silent(true)
            .clone(remote)
            .then(() => console.log('finished cloning ' + REPO +
                " as user: " + USER + " to destination " +
                context.root))
            .catch((err) => console.error('failed: ' + "as user: " + USER + "in directory " + context.root, err));
    }
    if (search === "pull") {
        require('simple-git')(context.root)
            .pull((err, update) => {
                if (update && update.summary.changes) {
                    console.log("Successfull pulled down " + update.summary.changes + " number of files")
                    require('child_process').exec('npm restart');
                }
            });
    }
    if (search === "commit") {
        require('simple-git')(context.root)
            .add('./*')
            .commit("first commit!")
            .push(['-u', 'origin', 'master'], () => console.log('done'));
    }
}