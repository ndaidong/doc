# realdom
A lightweight DOM & Event manipulation.

[![Build Status](https://travis-ci.org/ndaidong/realdom.svg?branch=master)](https://travis-ci.org/ndaidong/doc)
[![Dependency Status](https://gemnasium.com/badges/github.com/ndaidong/realdom.svg)](https://gemnasium.com/github.com/ndaidong/realdom)
[![NSP Status](https://nodesecurity.io/orgs/techpush/projects/6f01ff56-33f5-4a95-a785-ffab6443f40a/badge)](https://nodesecurity.io/orgs/techpush/projects/6f01ff56-33f5-4a95-a785-ffab6443f40a)


# Setup

- CDN

  - [realdom.js](https://cdn.rawgit.com/ndaidong/realdom/master/dist/realdom.js)
  - [realdom.min.js](https://cdn.rawgit.com/ndaidong/realdom/master/dist/realdom.min.js)

- This library also supports ES6 Module, AMD and UMD style.


# APIs

### DOM

 - .one(String selectors)
 - .all(String selectors)
 - .get(String ID)
 - .add(Element|String tag [, Element parent])
 - .create(Element dom)
 - .ready(Function callback)
 - .Event

Returned elements have several helpful methods as below:

 - .hasClass(String className)
 - .addClass(String className)
 - .removeClass(String className)
 - .toggleClass(String className)
 - .replaceClass(String classNameOld, String classNameNew)
 - .setProperty(Object atts)
 - .setStyle(Object style)
 - .query(String selectors)
 - .queryAll(String selectors)
 - .html([String html])
 - .empty()
 - .destroy()


#### Events

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
  let container = add('DIV');

  // then add a DIV element into container
  let div1 = add('DIV', container);

  // then add a class "sub-item" to child DIV
  div1.addClass('sub-item');

  // more a child DIV
  let div2 = add('DIV', container);

  // also add a class "sub-item"
  div2.addClass('sub-item');

  // now, we can extract list of elements by class name:
  let subItems = all('.sub-item');

  console.log(subItems);


  // create a button
  let btn = add('INPUT');

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

  // simulate a click event on there (it works as same as jQuery.trigger method)
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
