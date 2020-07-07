/*
* WARNING: these are the basic defaut parameters for glitching each file type.
* mp4 and mov files start parameters cannot be more than there end paramenters
* or you will get an error.
* Play around with these to get varied glitching results. decrease "repeat" to
* create harsher and more unpredictable glitches.
*/

const config = {
  avi: {
    val: 0,
    repeat: 100,
    off: 10000,
    freq: 1,
    start: 0,
    end: 100
  },
  mkv: {
    val: 0,
    repeat: 100,
    off: 10000,
    freq: 1,
    start: 0,
    end: 100
  },
  mp4: {
    val: 0,
    repeat: 100,
    freq: 1,
    start: 0,
    end: 100,
    left: 0,
    right: 100
  },
  mov: {
    val: 0,
    repeat: 100,
    freq: 1,
    start: 0,
    end: 100,
    left: 0,
    right: 100
  }
}

module.exports = config;
