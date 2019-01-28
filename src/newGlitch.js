const path = require('path'),
      fs = require('fs');

var { File } = require("./FileGlitch.js"),
    videoNames = require("../glitch.js");

function newGlitch(fileName) {

  if (
      !fileName ||
      typeof(fileName) !== "string" ||
      fileName.length === 0
    ) {
    throw new Error("fileName must be a a valid string");
    process.exitCode = 1;
    return;
  }

  let file = new File(fileName);
  let fileType = path.extname(fileName)
    .substring(1)
    .toLowerCase();

  switch (fileType) {
    case "mp4":
      file.glitchMP4(false);
      break;
    case "mov":
      file.glitchMP4(true);
      break;
    case "mkv":
      file.glitchMKV();
      break;
    case "avi":
      file.glitchAVI();
    default:
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
    pathsExist.pathsFound &&
    pathsExist.badPaths.length === 0
  ) {
    videoNames.forEach(videoName => newGlitch(videoName));
  } else if (
    pathsExist.pathsFound === false &&
    pathsExist.badPaths.length > 0
  ) {
    throw new Error(`Could not find the following files: ${pathsExist.badPaths}`);
  }
}
catch(error) {
  console.error(error);
  process.exitCode = 1;
}
finally {
  console.log("process finished");
  process.exitCode = 0;
}

module.exports = {
  newGlitch: newGlitch,
  pathChecker: pathChecker
}
