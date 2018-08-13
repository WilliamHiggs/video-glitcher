#!/usr/bin/env node

var checkArgs = new Promise(
  function (resolve, reject) {
    var args = process.argv.slice(2);
    module.exports = args;
    if (args === undefined || args === null) {
      resolve(args);
    } else {
      let reason = new Error('no arguments given');
      reject(reason);
    }
  }
);

var runProgram = function () {
  checkArgs
    .then(fulfilled => {
      var newGlitch = require("./src/newGlitch.js");
      var FileGlitch = require("./src/FileGlitch.js");
    })
    .catch(error => {
      console.log(error.message);
    });
};

runProgram();
