#!/usr/bin/env node

const { fork } = require('child_process');
const loadWheel = fork(`${__dirname}/src/loader.js`);

const checkArgs = () => {
  return new Promise((resolve, reject) => {

    var args = process.argv.slice(2);
    loadWheel.send('start');
    module.exports = args;

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
    var newGlitch = require("./src/newGlitch.js"),
        FileGlitch = require("./src/FileGlitch.js");
  })
  .catch(error => {
    console.log(error.message);
    process.exitCode = 1;
  })
  .finally(() => {
    loadWheel.send('end');
  });
