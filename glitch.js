#!/usr/bin/env node

const checkArgs = () => {
  return new Promise((resolve, reject) => {
    var args = process.argv.slice(2);
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
  .catch(error => console.log(error.message));
