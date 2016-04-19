# vdom
DOM &amp; Virtual DOM

## Usage


##### SystemJS

```
System.config({
  baseURL: '/path/to/vdom.js/folder',
  map: {
    vdom: 'vdom'
  }
});

System.import('vdom').then(function(exp){
  let DOM = exp.DOM;
  let vDOM = exp.vDOM;
  // use DOM and vDOM here
});
```

##### RequireJS

```
require.config({
  baseUrl: '/path/to/vdom.js/folder',
  paths: {
    vdom: 'vdom'
  }
});

requirejs('vdom', function(exp){
  let DOM = exp.DOM;
  let vDOM = exp.vDOM;
  // use DOM and vDOM here
});

```


##### CDN

```
<script type="text/javascript" src="https://cdn.rawgit.com/ndaidong/vdom/master/dist/vdom.min.js"></script>
```

## Actual DOM APIs

#### Basic methods

 - DOM.one(String selectors)
 - DOM.all(String selectors)
 - DOM.get(String ID)
 - DOM.add(Element|String tag [, Element parent])
 - DOM.create(Element dom)

Returned elements have several helpful methods as below:

 - .hasClass(String className)
 - .addClass(String className)
 - .removeClass(String  className)
 - .toggleClass(String  className)
 - .html([String html])
 - .empty()
 - .destroy()

#### Callback on ready

 - DOM.ready(Function callback)

#### Events

- DOM.Event.on(String|Element s, String eventName, Function callback)
- DOM.Event.off(String|Element s, String eventName, Function callback)
- DOM.Event.simulate(String|Element s, String eventName)
- DOM.Event.stop(Event e)
- DOM.Event.locate(Event e)


Examples:


```
DOM.ready(function(){

    // Add a new element to document.body
    var container = DOM.add('DIV');

    // then add a DIV element into container
    var div1 = DOM.add('DIV', container);

    // then add a class "sub-item" to child DIV
    div1.addClass('sub-item');

    // more a child DIV
    var div2 = DOM.add('DIV', container);

    // also add a class "sub-item"
    div2.addClass('sub-item');

    // now, we can extract list of elements by class name:
    var subItems = DOM.all('.sub-item');

    console.log(subItems);


    // create a button
    var btn = DOM.add('BUTTON');

    // set label
    btn.html('Say Hello!');

    // set an event listener
    DOM.Event.on(btn, 'click', function(){
        alert('Hello! How it\'s going?');
    });

    // simulate a click event on there (it works as same as jQuery.trigger method)
    DOM.Event.simulate(btn, 'click');

});
```


## Virtual DOM APIs

#### Basic methods

 - vDOM.create(String ID | HTMLElement tagName [, Object attrs [, Object events [, Array entries ] ] ])
 - vDOM.get(String tagId)
 - vDOM.getFull(String tagId)
 - vDOM.remove(String tagId)

Example:

```
var el = vDOM.create('DIV', {type: 'text', class: 'nano'});
```

Returned virtual element will come with several helpful methods as below:

 - .setAttribute(key, value)
 - .setEvent(eventName, callback)
 - .insert()
 - .append()
 - .render(String | HTMLElement target)

These methods are chainable. The interface of .insert() and .append() is similar to vDOM.create() and also returns the virtual elements.

For an instance:

```
<div id="header"></div>

<script type="text/javascript">
  var container = vDOM.create('DIV', {class: 'header menu'});
  let ul = container.append('ul');
  ul.setAttribute('class', 'sub-menu');
  for (var i = 0; i < 5; i++){
    ul.append('li', {id: 'li_' + i, text: 'Menu item ' + i});
  }
  ul.render('header');
</script>
```

Every virtual element has a "tagId" property that is unique and can be used in the remain vDOM's methods such as *get* or *remove*. For example we can access full data related to the above *container* (virtual) element by:

```
var tmp = vDOM.getFull(container.tagId);
console.log(tmp);
```

Virtual DOM APIs is quite basic for right now. Other stuffs as *diff*, *patch* may be implemented in next version.


# License

The MIT License (MIT)
