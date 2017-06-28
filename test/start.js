// start testing

var {join} = require('path');

let dir = '../test/specs/';
[
  'builtTest',
  'apis',
  'dom',
  'event'
].forEach((script) => {
  require(join(dir, script));
});
