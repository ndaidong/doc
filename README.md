# doc
A lightweight DOM & Event manipulation.

[![Dependency Status](https://gemnasium.com/badges/github.com/ndaidong/doc.svg)](https://gemnasium.com/github.com/ndaidong/doc)
[![NSP Status](https://nodesecurity.io/orgs/techpush/projects/6f01ff56-33f5-4a95-a785-ffab6443f40a/badge)](https://nodesecurity.io/orgs/techpush/projects/6f01ff56-33f5-4a95-a785-ffab6443f40a)


## Setup

- CDN

  - [doc.js](https://cdn.rawgit.com/ndaidong/doc/master/dist/doc.js)
  - [doc.min.js](https://cdn.rawgit.com/ndaidong/doc/master/dist/doc.min.js)

- This library also supports ES6 Module, AMD and UMD style.


## APIs

#### DOM

 - doc.one(String selectors)
 - doc.all(String selectors)
 - doc.get(String ID)
 - doc.add(Element|String tag [, Element parent])
 - doc.create(Element dom)
 - doc.ready(Function callback)

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

- doc.Event.on(String|Element s, String eventName, Function callback)
- doc.Event.off(String|Element s, String eventName, Function callback)
- doc.Event.simulate(String|Element s, String eventName)
- doc.Event.stop(Event e)
- doc.Event.locate(Event e)


Examples:

```
doc.ready(function(){

  // Add a new element to document.body
  var container = doc.add('DIV');

  // then add a DIV element into container
  var div1 = doc.add('DIV', container);

  // then add a class "sub-item" to child DIV
  div1.addClass('sub-item');

  // more a child DIV
  var div2 = doc.add('DIV', container);

  // also add a class "sub-item"
  div2.addClass('sub-item');

  // now, we can extract list of elements by class name:
  var subItems = doc.all('.sub-item');

  console.log(subItems);


  // create a button
  var btn = doc.add('INPUT');

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
  doc.Event.on(btn, 'click', function(){
    alert('Hello! How it\'s going?');
  });

  // simulate a click event on there (it works as same as jQuery.trigger method)
  doc.Event.simulate(btn, 'click');

});
```


# License

The MIT License (MIT)
