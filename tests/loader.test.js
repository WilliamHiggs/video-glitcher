let loader = require(`../src/loader.js`);
let sinon = require('sinon');
let chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
  , assert = chai.assert;

describe("loader.js spins a custom spinner while loading", () => {

  beforeEach(() => {
    this.loader = new loader;
  });

  afterEach(() => {
    this.loader = {};
    Object.defineProperty(process, 'platform', {
      value: 'darwin'
    });
  });

  describe("File class constuction", () => {
    it("builds a 'new' loader with constuctor", () => {
      expect(this.loader).to.be.an('object');
      expect(this.loader).to.have.keys('spinner', 'counter');
    });
  });

  describe("returns different spinners for different operating systems", () => {

    it("for Darwin OS returns OSX array", () => {
      // redefine process.platform
      Object.defineProperty(process, 'platform', {
        value: 'darwin'
      });

      this.loader = new loader;

      expect(this.loader.spinner).to.be.a('array');
      expect(this.loader.spinner).to.deep.equal([ '⠁', '⠃', '⠇', '⠧', '⠷', '⠿', '⠾', '⠼', '⠸', '⠘', '⠈' ]);
    });

    it("for Linux OS returns Linux array", () => {
      // redefine process.platform
      Object.defineProperty(process, 'platform', {
        value: 'linux'
      });

      this.loader = new loader;

      expect(this.loader.spinner).to.be.a('array');
      expect(this.loader.spinner).to.deep.equal(['|', '/', '-', '\\', '|', '/', '-', '\\']);
    });

    it("for other OS returns an other array", () => {
      // redefine process.platform
      Object.defineProperty(process, 'platform', {
        value: 'other'
      });

      this.loader = new loader;

      expect(this.loader.spinner).to.be.a('array');
      expect(this.loader.spinner).to.deep.equal(['◐', '◓', '◑', '◒']);
    });

  });

  describe("loader.next method (takes array as argument)", () => {
    let nextSpinner = ['1', '2', '3'];

    it("should not move counter until called", () => {
      expect(this.loader.counter).to.equal(0);
    });

    it("loader.next increments this.counter by 1 if array.length - 1 < counter", () => {
      this.loader.next(nextSpinner);
      expect(this.loader.counter).to.equal(1);
    });

    it("if loader.next is called more than the length of the array it circles back to first index", () => {
      this.loader.next(nextSpinner);
      this.loader.next(nextSpinner);
      this.loader.next(nextSpinner);
      expect(this.loader.counter).to.equal(0);
    });
  });

  describe("testing loadInterval", () => {
    let clock;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
    });

    afterEach(function() {
      clock = sinon.restore();
    });

    it("after one second the spinner increments to the next index", () => {
      this.loader.loadInterval();
      clock.tick(101);
      assert.equal(this.loader.counter, 1);
      assert.equal(this.loader.spinner[this.loader.counter], '\u2803');
      this.loader.stopInterval();
    });

    it("after two second the spinner increments to the next index", () => {
      this.loader.loadInterval();
      clock.tick(201);
      assert.equal(this.loader.counter, 2);
      assert.equal(this.loader.spinner[this.loader.counter], '\u2807');
      this.loader.stopInterval();
    });

  });
});
