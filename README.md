# realdom
A lightweight DOM & Event manipulation.

[![NPM](https://badge.fury.io/js/realdom.svg)](https://badge.fury.io/js/realdom)
[![Build Status](https://travis-ci.org/ndaidong/realdom.svg?branch=master)](https://travis-ci.org/ndaidong/realdom)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/realdom/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/realdom?branch=master)


# Setup

- CDN

  - [realdom.js](https://rawgit.com/ndaidong/realdom/master/dist/realdom.js)
  - [realdom.min.js](https://rawgit.com/ndaidong/realdom/master/dist/realdom.min.js)
  - [realdom.min.map](https://rawgit.com/ndaidong/realdom/master/dist/realdom.min.map)

- Also supports ES6 Module, CommonJS, AMD and UMD style.


### Usage

```
import {create, add} from 'realdom';

const div = create('DIV');
div.addClass('panel');

const span = add('SPAN', div);
span.html('Hello world');
// ...

```

### How does it work?

Here are several examples:

- [Material Design - Ripple effect](https://codepen.io/ndaidong/full/VbNPBa/)
- [Material Design - Floating input label](https://codepen.io/ndaidong/full/NjmYrj/)
- [Material Design - Animation effect - Grid render](https://codepen.io/ndaidong/full/WjqbjJ/)
- [Test CSS 3D transform](https://codepen.io/ndaidong/pen/JRmXvZ)


# APIs

### DOM

```
import {
  ready,
  create,
  add,
  get,
  query,
  queryAll
} from 'realdom';

const rows = queryAll('table tr');
rows.forEach((row) => {
  row.style.backgroundColor = 'red';
});

```

 - .query(String selectors)
 - .queryAll(String selectors)
 - .get(String ID)
 - .add(Element|String tag [, Element parent])
 - .create(Element dom)
 - .ready(Function callback)

Returned elements have several helpful methods as below:

 - .hasClass(String className)
 - .addClass(String className_1, String className_2, ...)
 - .removeClass(String className_1, String className_2, ...)
 - .toggleClass(String className_1, String className_2, ...)
 - .replaceClass(String classNameOld, String classNameNew)
 - .setProperty(Object atts)
 - .setStyle(Object style)
 - .query(String selectors)
 - .queryAll(String selectors)
 - .html([String html])
 - .empty()
 - .destroy()


#### Event

```
import { Event } from 'realdom';
```

- .Event.on(String|Element s, String eventName, Function callback)
- .Event.off(String|Element s, String eventName, Function callback)
- .Event.simulate(String|Element s, String eventName)
- .Event.stop(Event e)
- .Event.locate(Event e)


Examples:

```
import {
  ready,
  add,
  all,
  Event
} from 'realdom';

ready(() => {

  // Add a new element to document.body
  const container = add('DIV');

  // then add a DIV element into container
  const div1 = add('DIV', container);

  // then add a class "sub-item" to child DIV
  div1.addClass('sub-item');

  // more a child DIV
  const div2 = add('DIV', container);

  // also add a class "sub-item"
  div2.addClass('sub-item');

  // now, we can extract list of elements by class name:
  const subItems = all('.sub-item');

  console.log(subItems);


  // create a button
  const btn = add('INPUT');

  // add some attributes
  btn.setProperty({
    type: 'button',
    id: 'btnLogin',
    value: 'Login'
  });

  // specify css style
  btn.setStyle({
    color: 'red',
    fontSize: 15,
    backgroundColor: '#ff6',
    maxWidth: 500,
    'padding-top': '2px'
  });

  // set an event listener
  Event.on(btn, 'click', () => {
    alert('Hello! How it\'s going?');
  });

  // simulate/trigger a click event on there
  Event.simulate(btn, 'click');

});
```


# Test

```
git clone https://github.com/ndaidong/realdom.git
cd realdom
npm install
npm test
```



# License

The MIT License (MIT)
