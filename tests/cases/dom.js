var test = require('tape');

var {
  isFunction
} = require('bellajs');

var doc = require('../../src/main');

let keys = [
  'addClass', 'hasClass', 'removeClass', 'toggleClass', 'replaceClass',
  'query', 'queryAll',
  'setProperty', 'setStyle',
  'html', 'empty', 'destroy'
];

let checkElementMethods = (el, assert) => {
  keys.forEach((k) => {
    assert.ok(isFunction(el[k]), `el.${k}() must be a function`);
  });
};

test('Test doc.create():', (assert) => {

  let el = doc.create('DIV');
  assert.ok(el.nodeType, `Created element must be HTMLElement`);

  checkElementMethods(el, assert);

  el.destroy();

  assert.end();
});

test('Test doc.add():', (assert) => {

  let el = doc.add('DIV');
  assert.ok(el.nodeType, `Added element must be HTMLElement`);

  checkElementMethods(el, assert);

  el.destroy();

  assert.end();
});

test('Test doc.get():', (assert) => {

  let d = document.createElement('SPAN');
  d.setAttribute('id', 'domtest');
  document.body.appendChild(d);

  let el = doc.get('domtest');
  assert.ok(el.nodeType, `Founded element must be HTMLElement`);
  assert.equals(el.id, 'domtest', `Element ID must be "domtest"`);

  el.destroy();

  assert.end();
});

test('Test Element instance:', (assert) => {

  let d = document.createElement('SPAN');
  d.setAttribute('id', 'domtest');
  d.className = 'noop';
  d.innerHTML = 'Hello world';
  document.body.appendChild(d);

  let el = doc.get('domtest');
  assert.comment('Test Element.html()');
  el.html('dlrow olleH');
  assert.equals(el.html(), 'dlrow olleH', `Element.html() must be "dlrow olleH"`);

  assert.comment('Test Element.empty()');
  el.empty();
  assert.equals(el.html(), '', `Element.html() must be empty`);

  assert.comment('Test Element.setProperty()');
  el.setProperty({
    _name: 'Welcome',
    _key: 1234
  });
  assert.equals(el.getAttribute('_name'), 'Welcome', `Element must have property "_name" is "Welcome"`);
  assert.equals(el.getAttribute('_key'), '1234', `Element must have property "_key" is "1234"`);

  assert.comment('Test Element.setStyle()');
  el.setStyle({
    fontSize: 15,
    backgroundColor: 'green',
    maxWidth: 500,
    'margin-top': '20px'
  });
  let o = d.getAttribute('style');
  let s = 'font-size: 15px; background-color: green; max-width: 500px; margin-top: 20px;';
  assert.equals(o, s, `Element must have the expected style`);

  el.setStyle('color: red;');
  o = d.getAttribute('style');
  s = 'font-size: 15px; background-color: green; max-width: 500px; margin-top: 20px; color: red;';
  assert.equals(o, s, `Element style color must be added`);


  assert.comment('Test Element.query()');
  let ul = doc.add('UL', d);
  let li1 = doc.add('LI', ul);
  let li2 = doc.add('LI', ul);
  let li3 = doc.add('LI', ul);

  ul.addClass('noob');

  li1.addClass('noob');
  let found = ul.query('.noob');
  assert.equals(found, li1, `Element.query('.noob') must return li1`);
  assert.ok(!li2.hasClass('noob'), `li2 must do not have class "noob"`);
  assert.ok(!li3.hasClass('noob'), `li3 must do not have class "noob"`);

  ul.destroy();


  assert.comment('Test Element.queryAll()');
  ul = doc.add('UL', d);
  li1 = doc.add('LI', ul);
  li2 = doc.add('LI', ul);
  li3 = doc.add('LI', ul);

  ul.addClass('noob');

  li1.addClass('noob');
  li3.addClass('noob');
  found = ul.queryAll('.noob');
  assert.equals(found[0], li1, `Element.queryAll('.noob') firt item must be li1`);
  assert.equals(found[1], li3, `Element.queryAll('.noob') firt item must be li3`);
  assert.ok(!li2.hasClass('noob'), `li3 must do not have class "noob"`);

  ul.destroy();


  assert.comment('Test Element.destroy()');
  el.destroy();

  let tmp = doc.get('domtest');
  assert.equals(tmp, null, `Element "domtest" now must be null`);

  assert.end();
});
