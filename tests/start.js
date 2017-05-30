// start testing

var {join} = require('path');

var {JSDOM} = require('jsdom');

var dom = new JSDOM('<html><body></body></html>');

var {window} = dom;

var {
  navigator,
  document
} = window;

global.window = window;
global.document = document;
global.navigator = navigator;

let dir = '../tests/specs/';
[
  'builtTest',
  'apis',
  'dom',
  'event'
].forEach((script) => {
  require(join(dir, script));
});
