
class loader {
  constructor() {
    this.spinner = process.platform == 'darwin' ?
      [
        '\u2801', '\u2803', '\u2807', '\u2827', '\u2837',
        '\u283F', '\u283E', '\u283C', '\u2838', '\u2818', '\u2808'
      ] :
      [
        '|', '/', '-', '\\', '|', '/', '-', '\\'
      ];
    this.counter = 0;
    this.loadedInterval;
    console.log("loading...");
  }

  next(nextSpinner) {
    process.stdout.write('\b');
    if (this.counter == nextSpinner.length -1) {
      this.counter = 0;
    } else {
      this.counter++;
    }
  };

  loadInterval() {
    this.loadedInterval = setInterval(() => {
      process.stdout.write(this.spinner[this.counter]);
      this.next(this.spinner);
    }, 100);
  };

  stopInterval() {
    if (this.loadedInterval) {
      clearInterval(this.loadedInterval);
    }
  };
}

const loadWheel = new loader;

process.on('message', (message) => {
  if (message == 'start') {
    loadWheel.loadInterval();
  } else if (message == 'end') {
    loadWheel.stopInterval();
    process.disconnect();
  }
});

module.exports = loader;
