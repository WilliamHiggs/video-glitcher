var { File } = require("./FileGlitch.js");
const path = require('path');
var videoNames = require("../glitch.js");

console.log("loading...");

function newGlitch(fileName) {
  var file = new File(fileName),
    fileType = path.extname(fileName).substring(1);
  /*
  ** @TODO use node event emiter to handle these as events.
  **       count the iterations of the event and stdout it
  **       when the process is complete.
  **       make an event factory in new directory,
  **       use the filetype as a paramater for creation
  **       emit event which triggers the file methods ??? profit
  */
  if (fileType === "mp4") {
    file.glitchMP4();
    file.generate();
  } else if (fileType === "mkv") {
    file.glitchMKV();
    file.generate();
  } else if (fileType === "avi") {
    file.glitchAVI();
    file.generate();
  } else {
    throw "Invalid File Type";
    console.log("Invalid File Type");
    process.exitCode = 1;
  }
  //return file.rawData;
}

try {
  /*
  **@TODO check all videoNames are valid before attempting to glitch them to avoid
  **      the process dying half way through a glitch session.
  **      Make this a promise instead of a try/catch block. see glitch.js for refs.
  */
  videoNames.forEach(videoName => newGlitch(videoName));
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
  newGlitch: newGlitch
}
