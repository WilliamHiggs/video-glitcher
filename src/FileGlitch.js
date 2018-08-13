var fs = require("fs");

const getMPEGStart = data => data.indexOf("mdat") + 4;

const getAVIStart = data => data.indexOf("movi") + 4;

function getMPEGDataSect(data) {
  var i = 0;
  for (; i < data.length; i++) {
    if (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 1) {
      return i;
    }
  }
  return i;
}

var File = function(name) {
  this.fileName = name.substring(0, name.indexOf("."));
  this.fileType = name.substring(name.indexOf(".") + 1);
  this.rawData = fs.readFileSync(name);
  this.data = this.rawData.toString();
};

File.prototype.glitchAVI = function(off, val, freq, repeat, start, end) {
  val = val || 0;
  repeat = repeat || 100;
  off = off || 10000;
  freq = freq || 1;
  start = start || 0;
  end = end || 100;

  var x = 0,
    startDataLength =
      getAVIStart(this.data) +
      Math.round(this.rawData.length * (start / 100.0)),
    endDataLength = Math.round(this.rawData.length * (end / 100.0));

  for (; startDataLength < endDataLength; startDataLength++) {
    if (x % freq == 0) {
      for (var j = 0; j < repeat; j++) {
        this.rawData[startDataLength + off * (1 + j)] = val;
      }
    }
    x++;
  }
};

File.prototype.glitchMKV = function(off, val, freq, repeat, start, end) {
  val = val || 0;
  repeat = repeat || 100;
  off = off || 10000;
  freq = freq || 1;
  start = start || 0;
  end = end || 100;

  var x = 0,
    startDataLength = Math.round(this.rawData.length * (start / 100.0)),
    endDataLength = Math.round(this.rawData.length * (end / 100.0));

  for (; startDataLength < endDataLength; startDataLength++) {
    if (
      this.rawData[startDataLength] == 31 &&
      this.rawData[startDataLength + 1] == 67 &&
      this.rawData[startDataLength + 2] == 182 &&
      this.rawData[startDataLength + 3] == 117 &&
      x % freq == 0
    ) {
      for (var j = 0; j < repeat; j++) {
        this.rawData[startDataLength + off * (1 + j)] = val;
      }
    }
    x++;
  }
};

File.prototype.glitchMP4 = function(val, freq, repeat, start, end, left, right) {
  val = val || 0;
  repeat = repeat || 100;
  freq = freq || 1;
  start = start || 0;
  end = end || 100;
  left = left || 10;
  right = right || 90;

  if (start >= end) {
    console.log("Start value must be less than end value.");
    return;
  }

  var x = 0;
  if (this.fileType == "mp4") {
    var MPEGStart = getMPEGStart(this.data),
      startDataLength =
        MPEGStart +
        Math.round((this.rawData.length - MPEGStart) * (start / 100.0)),
      endDataLength = Math.round(
        (this.rawData.length - MPEGStart) * (end / 100.0)
      );

    for (; startDataLength < endDataLength; startDataLength++) {
      if (
        this.rawData[startDataLength] == 0 &&
        this.rawData[startDataLength + 1] == 0 &&
        this.rawData[startDataLength + 2] == 1 &&
        (this.rawData[startDataLength + 3] & 0x1f) != 5 &&
        x % freq == 0
      ) {
        /*
          63 non iframe
          console.log(this.rawData[startDataLength+3] & 0x1F);
        */
        var nextSect = getMPEGDataSect(this.rawData.slice(startDataLength + 3)),
          leftNextSect = parseInt(nextSect * (left / 100.0)),
          rightNextSect = parseInt(nextSect * (right / 100.0));

        for (; leftNextSect < rightNextSect; leftNextSect++) {
          if (leftNextSect % (repeat * 100) === 0) {
            this.rawData[startDataLength + leftNextSect] = val;
          }
        }
      }
      x++;
    }
  }
};

File.prototype.generate = function(fn) {
  if (fn == undefined) {
    fs.writeFileSync(
      this.fileName + "_glitched." + this.fileType,
      this.rawData,
      "utf8"
    );
  } else {
    fs.writeFileSync(fn, this.rawData, "utf8");
  }
};

module.exports = {
  File: File,
  getMPEGStart: getMPEGStart,
  getAVIStart: getAVIStart
}
