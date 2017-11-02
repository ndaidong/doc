// start testing

var {join} = require('path');

require('jsdom-global')();

let dir = '../test/specs/';
[
  'builtTest',
  'apis',
  'dom',
  'event'
].forEach((script) => {
  require(join(dir, script));
});
