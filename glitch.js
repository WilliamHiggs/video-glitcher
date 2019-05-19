#!/usr/bin/env node

const { fork } = require('child_process');
const loadWheel = fork(`${__dirname}/src/loader.js`);
const args = process.argv.slice(2);

const checkArgs = () => {
  return new Promise((resolve, reject) => {

    loadWheel.send('start');

    if (args.length === 0) {
      let reason = new Error('no arguments given');
      reject(reason);
    } else {
      resolve(true);
    }
  });
}

checkArgs()
  .then(resolve => {
    module.exports = args;
    const newGlitch = require("./src/newGlitch.js"),
          FileGlitch = require("./src/FileGlitch.js");
  })
  .catch(error => {
    console.log(error.message);
    loadWheel.send('end');
    process.exitCode = 1;
  })
  .finally(() => {
    loadWheel.send('end');
  });
