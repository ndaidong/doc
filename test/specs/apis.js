var test = require('tape');

var {
  isFunction,
  isObject
} = require('bellajs');

var es6RD = require('../../src/main');
var fullRD = require('../../dist/realdom');
var minRD = require('../../dist/realdom.min');

var checkAPIs = (doc) => {
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
};

[es6RD, fullRD, minRD].map(checkAPIs);


