const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

;(async () => {
    let output = '';

    await exec.exec('kubectl get secret expat-forum-v2-secret -o jsonpath="{.data}"', [], {
        silent: true,
        listeners: {
            stdout: (data) => {
                output += data.toString();
            },
        }
    });

    const secret = JSON.parse(output);

    Object.keys(secret).forEach(key => {
        core.exportVariable(key, secret[key]);
    });

    

    // console.log(output);
})();

// const exec = require('@actions/exec');

// let myOutput = '';
// let myError = '';

// const options = {};
// options.listeners = {
//   stdout: (data: Buffer) => {
//     myOutput += data.toString();
//   },
//   stderr: (data: Buffer) => {
//     myError += data.toString();
//   }
// };
// options.cwd = './lib';

// await exec.exec('node', ['index.js', 'foo=bar'], options);

// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }