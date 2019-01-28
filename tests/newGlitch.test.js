var { newGlitch, pathChecker } = require("../src/newGlitch.js");
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

describe("newGlitch.js handles new instances of glitches", () => {
  describe("function: pathChecker checks that every argument exists as a path", () => {
    it("should exist as a function", () => {
      expect(pathChecker).to.be.a("function");
    });
    it("pathChecker.pathsFound should return true if all paths exist", () => {
      let goodPaths = [
        "./tests/test-media/testFile01.avi",
        "./tests/test-media/testFile02.mp4",
        "./tests/test-media/testFile03.mkv"
      ];
      var goodCheck = pathChecker(goodPaths);
      expect(goodCheck.pathsFound).to.be.true;
    });
    it("pathChecker.badPaths should return empty array if all paths exist", () => {
      let goodPaths = [
        "./tests/test-media/testFile01.avi",
        "./tests/test-media/testFile02.mp4",
        "./tests/test-media/testFile03.mkv"
      ];
      var goodCheck2 = pathChecker(goodPaths);
      expect(goodCheck2.badPaths).to.be.an('array').that.is.empty;
    });
    it("pathChecker.pathsFound should return false if one or more paths does not exist", () => {
      let badPaths = [
        "./tests/test-media/testFile01.avi",
        "./tests/test-media/testFile02.mp4",
        "./tests/test-media/testFile03.mkv",
        "./not-real-dir/not-real-file.nope"
      ];
      var badCheck = pathChecker(badPaths);
      expect(badCheck.pathsFound).to.be.false;
    });
    it("should return an array on pathChecker.badPaths if one or more paths does not exist", () => {
      let oneBadPath = [
        "./tests/test-media/testFile01.avi",
        "./tests/test-media/testFile02.mp4",
        "./tests/test-media/testFile03.mkv",
        "./not-real-dir/not-real-file.nope"
      ];
      var badCheck = pathChecker(oneBadPath);
      expect(badCheck.badPaths).to.be.an("array");
      expect(badCheck.badPaths).to.include("./not-real-dir/not-real-file.nope");
    });
    it("should return multiple bad paths in array", () => {
      let twoBadPath = [
        "./Oh-no/badPath.nope",
        "./tests/test-media/testFile01.avi",
        "./tests/test-media/testFile02.mp4",
        "./tests/test-media/testFile03.mkv",
        "./not-real-dir/not-real-file.nope"
      ];
      var badCheck = pathChecker(twoBadPath);
      expect(badCheck.badPaths).to.be.an("array");
      expect(badCheck.badPaths).to.include("./not-real-dir/not-real-file.nope");
      expect(badCheck.badPaths).to.include("./Oh-no/badPath.nope");
    });
  });
  describe("should throw new error for invalid fileNames", () => {
    it("should throw new error for undefined fileName", () => {
      expect(() => newGlitch()).to.throw(/fileName must be a a valid string/);
    });
    it("should throw new error for any other type than string", () => {
      expect(() => newGlitch({})).to.throw(/fileName must be a a valid string/);
      expect(() => newGlitch([])).to.throw(/fileName must be a a valid string/);
      expect(() => newGlitch(0)).to.throw(/fileName must be a a valid string/);
    });
    it("should throw new error for an empty string", () => {
      expect(() => newGlitch("")).to.throw(/fileName must be a a valid string/);
    });
  });
});
