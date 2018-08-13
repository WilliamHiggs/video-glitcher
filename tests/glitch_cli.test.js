var args = require("../glitch_cli.js");

test("type of args is an array ()", () => {
  expect(typeof args).toBe("object");
});
