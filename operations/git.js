
const git = require('simple-git');

module.exports = (context, search) => {


    let arrayOfGits =
        [
            "git@bitbucket.org:imove-dev/imove-event-api.git",
            "git@bitbucket.org:imove-dev/trip-logger-service.git",
            "git@bitbucket.org:imove-dev/kinto-cloud.git",
            "git@bitbucket.org:imove-dev/vehicle-api.git",
            "git@bitbucket.org:imove-dev/inventory-api.git",
            "git@bitbucket.org:imove-dev/task-api.git",
        ]

    const GIT_SSH_COMMAND = "ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no";

    git()
        .env('GIT_SSH_COMMAND', GIT_SSH_COMMAND)
        .status((err, status) => { if (err) { console.log(err) } })

    const gitPromise = require('simple-git/promise');

    function gitClone(repoToClone, toPath) {
        gitPromise(toPath).env({ ...process.env, GIT_SSH_COMMAND })
            .clone(repoToClone)
            .then(() => console.log('finished cloning ' + repoToClone +
                " to destination " +
                toPath))
            .catch((err) => console.error('failed: ' + "in directory " + repoToClone, err));
    }

    function cloneAllFromRepository(arrayWithRepoGit, toPath) {
        arrayWithRepoGit.forEach(element => {
            gitClone(element, toPath);
        });
    }

    if (search === 'clone') {
        cloneAllFromRepository(arrayOfGits, (context.root + "\\testFolder"));
    }
}