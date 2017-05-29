var test = require('tape');

var {
  isFunction,
  isObject
} = require('bellajs');

var doc = require('../../src/main');

test('Test overview:', (assert) => {

  let keys = [
    'add', 'all', 'create', 'get', 'one', 'ready'
  ];

  let check = (k) => {
    assert.ok(isFunction(doc[k]), `doc.${k} must be function`);
  };

  keys.map(check);

  assert.ok(isObject(doc.Event), `doc.Event must be object`);

  assert.end();
});
