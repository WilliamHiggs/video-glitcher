var {File} = require("./FileGlitch.js");
var videoNames = require("../glitch_cli.js");

console.log("loading...");

function newGlitch(fileName) {
  var file = new File(fileName),
    fileType = fileName.substring(fileName.indexOf(".") + 1);

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
  }
  //return file.rawData;
}

try {
  videoNames.forEach(videoName => newGlitch(videoName));
}
catch(error) {
  console.error(error);
}
finally {
  console.log("complete");
}

module.exports = {
  newGlitch: newGlitch
}
