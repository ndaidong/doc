// start testing

var {join} = require('path');

let dir = '../tests/specs/';
[
  'builtTest',
  'apis',
  'dom',
  'event'
].forEach((script) => {
  require(join(dir, script));
});
