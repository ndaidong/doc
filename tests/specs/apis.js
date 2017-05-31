var test = require('tape');

var {
  isFunction,
  isObject
} = require('bellajs');

var doc = require('../../dist/realdom.min');

test('Test overview:', (assert) => {

  let keys = [
    'add', 'queryAll', 'create', 'get', 'query', 'ready'
  ];

  let check = (k) => {
    assert.ok(isFunction(doc[k]), `doc.${k} must be function`);
  };

  keys.map(check);

  assert.ok(isObject(doc.Event), `doc.Event must be object`);

  assert.end();
});
