var fs = require('fs');
var {join} = require('path');

var {jsdom} = require('jsdom/lib/old-api.js');

var html = fs.readFileSync(join(__dirname, './index.html'), 'utf8');

jsdom.env(html,
  [
    'libs/jasmine-2.4.1/jasmine.js',
    'libs/jasmine-2.4.1/jasmine-html.js',
    'libs/jasmine-2.4.1/boot.js',
    '../dist/doc.min.js',
    'specs/docSpec.js'
  ],
  (err, window) => {
    if (err) {
      console.error(err);
    }
    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;

    let dir = '../tests/cases/';
    [
      'apis',
      'dom'
    ].forEach((script) => {
      require(join(dir, script));
    });
  }
);

