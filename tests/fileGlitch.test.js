const {getMPEGStart, getAVIStart} = require("../src/FileGlitch.js");

test('returns indexOf plus 4', () => {
    expect(getMPEGStart(["mdat","blank","blank","blank"])).toBe(4);
});

test('returns indexOf plus 4', () => {
    expect(getAVIStart(["movi","blank","blank","blank"])).toBe(4);
});
