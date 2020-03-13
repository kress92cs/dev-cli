const dotenv = require('dotenv');
dotenv.config();

const USER = process.env.USER;
const PASS = process.env.PASSWORD;
const REPO = process.env.REPO_MAIN;

const fs = require('fs');
const gitPromise = require('simple-git/promise');

const remote = `https://${USER}:${PASS}@${REPO}`;



module.exports = (context, search) => {


    const git = gitPromise(context.root);

    context.containers.forEach(container => {

    });

    let containerName = context.containers.map(function (container) {
        return container['name'];
    })
    containerName.shift();
    if (search === 'clone') {
        // containerName.forEach(name => {
        git.silent(true)
            .clone(REPO)
            .then(() => console.log('finished cloning ' + REPO +
                " as user: " + USER + " to destination " +
                context.root))
            .catch((err) => console.error('failed: ' + "as user: " + USER + "in directory " + REPO, err));
        // });
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