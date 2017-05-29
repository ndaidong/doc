var test = require('tape');
var sinon = require('sinon');

var {
  isFunction
} = require('bellajs');

var doc = require('../../dist/realdom.min');

let keys = [
  'on', 'off', 'simulate', 'stop', 'locate'
];

let checkEventMethods = (el, assert) => {
  keys.forEach((k) => {
    assert.ok(isFunction(el[k]), `el.${k}() must be a function`);
  });
};

test('Test doc.Event:', (assert) => {

  assert.comment('Test event listener on/off:');

  let fn = sinon.spy();
  let el = doc.add('DIV');
  let child = doc.add('DIV', el);

  doc.Event.on(el, 'click', fn);
  doc.Event.simulate(el, 'click');
  assert.ok(fn.calledOnce, 'fn must be called once');

  doc.Event.simulate(child, 'click');
  assert.ok(fn.calledTwice, 'fn must be called twice');

  doc.Event.off(el, 'click', fn);
  doc.Event.simulate(el, 'click');
  assert.ok(!fn.calledThrice, 'fn must not be called thrice');

  assert.comment('Test event listener stop bubbling:');
  let fn2 = sinon.spy((e) => {
    doc.Event.stop(e);
  });
  let fn3 = sinon.spy();
  doc.Event.on(el, 'click', fn3);
  doc.Event.on(child, 'click', fn2);
  doc.Event.simulate(child, 'click');
  assert.ok(fn2.called, 'fn2 must be called');
  assert.ok(!fn3.called, 'fn3 must not be called');

  assert.comment('Test event listener locate:');
  let fn4 = sinon.spy((e) => {
    let target = doc.Event.locate(e);
    assert.equals(target, el, 'Element and event target must be the same');
  });
  doc.Event.on(el, 'click', fn4);
  doc.Event.simulate(el, 'click');

  checkEventMethods(doc.Event, assert);

  assert.end();
});
