# doc
Another small DOM & Event manipulation

## Setup

##### CDN

```
<script type="text/javascript" src="https://cdn.rawgit.com/ndaidong/doc/master/dist/doc.min.js"></script>

<script type="text/javascript">
  doc.Event.on('btnGenerate', 'click', (e) => {
    doc.Event.stop(e);
    var typ = doc.get('mainInput').value;
    var txt = '';
    switch (typ) {
      case 'sentence': txt = txtgen.sentence(); break;
      case 'paragraph': txt = txtgen.paragraph(); break;
      case 'article': txt = txtgen.article(); break;
    }
    doc.get('result').value = txt;
  });
</script>
```

##### SystemJS

```
System.config({
  baseURL: '/path/to/js/folder',
  map: {
    doc: 'doc.min'
  }
});

System.import('doc').then(function(doc){
  // use doc's methods here
});
```

##### RequireJS

```
require.config({
  baseUrl: '/path/to/js/folder',
  paths: {
    doc: 'doc.min'
  }
});

requirejs('vdom', function(doc){
  // use doc's methods here
});

```


## APIs

#### Basic methods

 - doc.one(String selectors)
 - doc.all(String selectors)
 - doc.get(String ID)
 - doc.add(Element|String tag [, Element parent])
 - doc.create(Element dom)

Returned elements have several helpful methods as below:

 - .hasClass(String className)
 - .addClass(String className)
 - .removeClass(String  className)
 - .toggleClass(String  className)
 - .setProperty(Object atts)
 - .setStyle(Object style)
 - .html([String html])
 - .empty()
 - .destroy()

#### Callback on ready

 - doc.ready(Function callback)

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
