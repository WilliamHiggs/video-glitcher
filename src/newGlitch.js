var { File } = require("./FileGlitch.js");
const path = require('path');
const fs = require('fs');
var videoNames = require("../glitch.js");

console.log("loading...");

function newGlitch(fileName) {
  var file = new File(fileName);
  var fileType = path.extname(fileName)
    .substring(1)
    .toLowerCase();

  if (fileType === "mp4" || fileType === "mov") {
    file.glitchMP4();
  } else if (fileType === "mkv") {
    file.glitchMKV();
  } else if (fileType === "avi") {
    file.glitchAVI();
  } else {
    throw new Error("Invalid File Type");
    process.exitCode = 1;
    return;
  }
  file.generate();
  //return file.rawData;
}

function pathChecker(pathArray) {
  var pathCheck = {
    badPaths: []
  };
  var pathsFoundArray = pathArray.map(path => {
    if (fs.existsSync(path)) {
      return true;
    } else {
      return false;
    }
  });
  if (pathsFoundArray.includes(false)) {
    pathCheck.badPaths = pathsFoundArray.map((path, index) => {
      if (path === false) {
        return pathArray[index];
      }
    })
    .filter(path => path !== undefined);
    pathCheck.pathsFound = false;
    return pathCheck;
  } else {
    pathCheck.pathsFound = true;
    return pathCheck;
  }
};


try {
  var pathsExist = pathChecker(videoNames);
  if (
    pathsExist.pathsFound === true &&
    pathsExist.badPaths.length === 0
  ) {
    videoNames.forEach(videoName => newGlitch(videoName));
  } else if (
    pathsExist.pathsFound === false &&
    pathsExist.badPaths.length > 0
  ) {
    throw new Error(`Could not find the following files: ${pathsExist.pathsFound}`);
  }
}
catch(error) {
  console.error(error);
  process.exitCode = 1;
}
finally {
  console.log("process finished");
}

module.exports = {
  newGlitch: newGlitch,
  pathChecker: pathChecker
}
