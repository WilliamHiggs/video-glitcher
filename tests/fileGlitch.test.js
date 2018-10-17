var { File } = require("../src/FileGlitch.js");
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

/*
**@TODO REWRITE TESTS FOR mocha
*/
describe("FileGlitch.js main glitch module", () => {
  describe("File class constuction", () => {
    it("builds a 'new' File with constuctor", () => {
      var testFile01 = new File("./tests/test-media/testFile01.avi");
      expect(testFile01).to.be.an('object');
      expect(testFile01.name).to.equal("./tests/test-media/testFile01.avi");
      expect(testFile01.fileName).to.equal("./tests/test-media/testFile01");
      expect(testFile01.fileType).to.equal("avi");
    });
    it("has mpeg start method", () => {
      var testFile02 = new File("./tests/test-media/testFile02.mp4");
      expect(testFile02.getMPEGStart(["mdat","1","2","3","4"])).to.equal(4);
      expect(testFile02.getMPEGStart(["mdat","1","2","3","4"])).to.not.equal("mdat");
    });
    it("has avi start method", () => {
      var testFile03 = new File("./tests/test-media/testFile01.avi");
      expect(testFile03.getAVIStart(["movi","1","2","3","4"])).to.equal(4);
      expect(testFile03.getAVIStart(["movi","1","2","3","4"])).to.not.equal("movi");
    });
    it("has getMPEGDataSect method", () => {
      var testFile04 = new File("./tests/test-media/testFile01.avi");
      let goodMPEGdata = [1,1,1,0,1,1,1,1,1,0,0,1];
      let emptyMPEGdata = [];
      let badMPEGdata = [0,0,0,0,0,0,0,0];
      expect(testFile04.getMPEGDataSect([0])).to.equal(1);
      expect(testFile04.getMPEGDataSect(goodMPEGdata)).to.equal(9);
      expect(testFile04.getMPEGDataSect(badMPEGdata)).to.equal(8);
      expect(testFile04.getMPEGDataSect(emptyMPEGdata)).to.equal(0);
    });
  });
});
