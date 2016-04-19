/**
 * vdom
 * @ndaidong
**/

'use strict';

(() => {

  var ENV = typeof module !== 'undefined' && module.exports ? 'node' : 'browser';

  var D = {
    ENV: ENV
  };

  var vD = {
    ENV: ENV
  };

  var tof = (v) => {
    let ots = Object.prototype.toString;
    let s = typeof v;
    if (s === 'object') {
      if (v) {
        if (ots.call(v).indexOf('HTML') !== -1 && ots.call(v).indexOf('Element') !== -1) {
          return 'element';
        }
        if (v instanceof Array ||
          (
            !(v instanceof Object) &&
            ots.call(v) === '[object Array]' ||
            typeof v.length === 'number' && typeof v.splice !== 'undefined' &&
            typeof v.propertyIsEnumerable !== 'undefined' && !v.propertyIsEnumerable('splice')
          )
        ) {
          return 'array';
        }
        if (!(v instanceof Object) &&
          (ots.call(v) === '[object Function]' ||
          typeof v.call !== 'undefined' &&
           typeof v.propertyIsEnumerable !== 'undefined' &&
            !v.propertyIsEnumerable('call')
          )
        ) {
          return 'function';
        }
      }
      return 'object';
    } else if (s === 'function' && typeof v.call === 'undefined') {
      return 'object';
    }
    return s;
  };

  var isDef = (val) => {
    return tof(val) !== 'undefined';
  };
  var isNull = (val) => {
    return tof(val) === null || val === null;
  };
  var isString = (val) => {
    return !isNull(val) && tof(val) === 'string';
  };
  var isFunction = (val) => {
    return !isNull(val) && tof(val) === 'function';
  };
  var isElement = (val) => {
    if (val && ENV === 'node' && val._root) {
      return true;
    }
    return !isNull(val) && tof(val) === 'element';
  };

  var hasProperty = (ob, k) => {
    if (!ob || !k) {
      return false;
    }
    let r = true;
    if (!isDef(ob[k])) {
      r = k in ob;
    }
    return r;
  };

  var trim = (s, all) => {
    if (!isString(s)) {
      return '';
    }
    let x = s ? s.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '') : s || '';
    if (x && all) {
      return x.replace(/\r?\n|\r/g, ' ').replace(/\s\s+|\r/g, ' ');
    }
    return x;
  };

  // real DOM
  var _get, _add, _create, _query, _queryAll;

  _get = (el) => {
    let p = (isString(el) ? document.getElementById(el) : el) || null;
    if (p && isElement(p)) {
      let pc = p.classList;
      p.hasClass = (c) => {
        c = trim(c, true);
        if (!c) {
          return false;
        }
        return pc.contains(c);
      };
      p.addClass = (c) => {
        c = trim(c, true);
        if (!c) {
          return false;
        }
        let a = c.split(' ');
        if (a.length > 1) {
          a.forEach((s) => {
            pc.add(s);
          });
        } else {
          pc.add(c);
        }
        return p;
      };
      p.removeClass = (c) => {
        c = trim(c, true);
        if (!c) {
          return false;
        }
        let a = c.split(' ');
        if (a.length > 1) {
          a.forEach((s) => {
            pc.remove(s);
          });
        } else {
          pc.remove(c);
        }
        return p;
      };
      p.toggleClass = (c) => {
        c = trim(c, true);
        if (!c) {
          return false;
        }
        let a = c.split(' ');
        if (a.length > 1) {
          a.forEach((s) => {
            pc.toggle(s);
          });
        } else {
          pc.toggle(c);
        }
        return p;
      };
      p.empty = () => {
        p.innerHTML = '';
        return p;
      };
      p.html = (s) => {
        if (!s) {
          return p.innerHTML;
        }
        p.innerHTML = s;
        return p;
      };
      p.destroy = () => {
        if (p.parentNode) {
          p.parentNode.removeChild(p);
        }
      };
    }
    return p;
  };

  _add = (tag, parent) => {
    let p = parent ? _get(parent) : document.body;
    let d = isElement(tag) ? tag : document.createElement(tag);
    p.appendChild(d);
    return _get(d);
  };

  _create = (tag) => {
    return _get(document.createElement(tag));
  };

  _query = (c) => {
    let el, tmp = document.querySelector(c);
    if (tmp) {
      el = _get(tmp);
    }
    return el;
  };

  _queryAll = (c) => {
    let els = [], tmp = document.querySelectorAll(c);
    if (tmp) {
      for (let i = 0; i < tmp.length; i++) {
        els.push(_get(tmp[i]));
      }
    }
    return els;
  };

  var onready = (fn) => {
    let rt = document.readyState;
    if (rt !== 'loading') {
      setTimeout(fn, 0);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  };

  D.ready = onready;
  D.one = _query;
  D.all = _queryAll;
  D.get = _get;
  D.add = _add;
  D.create = _create;

  (() => {
    let atag = _create('A');
    atag.href = document.URL;
    let loc = atag.hostname;
    atag.destroy();
    D.hostname = loc;
  })();

  let isGecko = ((ua) => {
    let n = ua.toLowerCase();
    return /gecko/i.test(n);
  })(navigator.userAgent);

  D.Event = (() => {

    return {
      on: (element, event, callback) => {
        if (event === 'wheel') {
          event = isGecko ? 'DOMMouseScroll' : 'mousewheel';
        }
        let el = isString(element) ? _get(element) : element;
        let fn = () => {};
        let cb = callback || fn;

        if (el.addEventListener) {
          el.addEventListener(event, cb, false);
        } else if (el.attachEvent) {
          el.attachEvent('on' + event, cb);
        }
      },
      off: (element, event, callback) => {
        let el = isString(element) ? _get(element) : element;
        if (el.removeEventListener) {
          el.removeEventListener(event, callback, false);
        } else if (el.detachEvent) {
          el.detachEvent('on' + event, callback);
        }
      },
      simulate: (element, event) => {
        let evt, el = isString(element) ? _get(element) : element;
        if (document.createEventObject) {
          evt = document.createEventObject();
          el.fireEvent('on' + event, evt);
        } else {
          evt = document.createEvent('HTMLEvents');
          evt.initEvent(event, true, true);
          el.dispatchEvent(evt);
        }
      },
      stop: (e) => {
        e.cancelBubble = true;
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        if (e.preventDefault) {
          e.preventDefault();
        }
        return false;
      },
      detect: (e) => {
        let evt = e || window.event;
        let targ = evt.target || evt.srcElement;
        if (targ && targ.nodeType === 3) {
          targ = targ.parentNode;
        }
        return _get(targ);
      }
    };
  })();

  D.getMousePosition = (ev) => {
    let e = ev || window.event;
    let cursor = {
      x: 0,
      y: 0
    };
    if (e.pageX || e.pageY) {
      cursor.x = e.pageX;
      cursor.y = e.pageY;
    } else {
      let de = document.documentElement;
      let db = document.body;
      cursor.x = e.clientX + (de.scrollLeft || db.scrollLeft) - (de.clientLeft || 0);
      cursor.y = e.clientY + (de.scrollTop || db.scrollTop) - (de.clientTop || 0);
    }
    return cursor;
  };

  D.getWindowSize = () => {
    let w = 0, h = 0;
    if (window.innerWidth) {
      w = window.innerWidth;
      h = window.innerHeight;
    } else if (document.documentElement && document.documentElement.clientWidth) {
      w = document.documentElement.clientWidth;
      h = document.documentElement.clientHeight;
    } else if (document.body) {
      w = document.body.clientWidth;
      h = document.body.clientHeight;
    }
    return {
      width: w,
      height: h
    };
  };


  // virtual DOM

  var createId = (leng, prefix) => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    chars += chars.toLowerCase();
    chars += '0123456789';
    let t = chars.length;
    let px = prefix || '';
    let ln = Math.max(leng || 32, px.length);
    let s = px;
    while (s.length < ln) {
      let k = Math.floor(Math.random() * t);
      s += chars.charAt(k) || '';
    }
    return s;
  };

  var Actual = new Map();
  var Virtual = new Map();
  var Mirror = new Map();

  var clone = (o) => {
    let s = JSON.stringify(o);
    return JSON.parse(s);
  };

  var saveMap = (id, vdom) => {
    Actual.set(id, null);
    Mirror.set(id, null);
    Virtual.set(id, vdom);
  };

  vD.get = (id) => {
    return Virtual.get(id);
  };

  vD.getFull = (id) => {
    return {
      actual: Actual.get(id),
      virtual: Virtual.get(id),
      mirror: Mirror.get(id)
    };
  };

  vD.remove = (id) => {
    Actual.remove(id);
    Virtual.remove(id);
    Mirror.remove(id);
  };

  var v2a = (node, parent) => {
    let a = parent ? _add(node.tagName, parent) : _create(node.tagName);
    a.setAttribute('tagId', node.tagId);

    let attrs = node.attributes;
    for (let k in attrs) {
      if (hasProperty(attrs, k)) {
        let v = attrs[k];
        if (k === 'text') {
          let t = document.createTextNode(v);
          a.appendChild(t);
        } else if (isString(v)) {
          a.setAttribute(k, v);
        }
      }
    }

    let events = node.events;
    for (let k in events) {
      if (hasProperty(events, k)) {
        let v = events[k];
        D.Event.on(a, v.name, v.callback);
      }
    }

    let ls = node.nodeList;
    if (ls.length > 0) {
      for (let i = 0; i < ls.length; i++) {
        let n = ls[i];
        v2a(n, a);
      }
    }
  };

  var render = (nodes, target) => {
    for (let i = 0; i < nodes.length; i++) {
      let n = nodes[i];
      v2a(n, target);
    }
  };

  class vElement {

    constructor(tag, attrs, events, entries) {

      let id = createId(16);
      let el = _get(tag) || _create(tag);

      el.empty();

      this.tagName = el.tagName;
      this.tagId = id;
      this.attributes = attrs || Object.create(null);

      let evs = [];
      for (let k in events) {
        if (hasProperty(events, k)) {
          let fn = events[k];
          if (isFunction(fn)) {
            evs.push({
              name: k,
              callback: fn
            });
          }
        }
      }

      this.events = evs;
      this.nodeList = entries || [];

      saveMap(id, this);

      return this;
    }

    setAttribute(k, v) {
      this.attributes[k] = v;
      return this;
    }
    setEvent(name, fn) {
      this.events.push({
        name: name,
        callback: fn
      });
      return this;
    }

    insert(tag, attrs, events, entries) {
      let n = new vElement(tag, attrs, events, entries);
      n.parentId = this.tagId;
      this.nodeList.unshift(n);
      return n;
    }

    append(tag, attrs, events, entries) {
      let n = new vElement(tag, attrs, events, entries);
      n.parentId = this.tagId;
      this.nodeList.push(n);
      return n;
    }

    remove(tagId) {
      let removed = false;

      let rmTag = (node) => {
        let entries = node.nodeList || [];
        if (entries.length > 0) {
          for (let i = entries.length - 1; i >= 0; i--) {
            let j = entries[i];
            if (j.tagId === tagId) {
              entries.splice(i, 1);
              removed = true;
              break;
            } else {
              rmTag(j);
            }
          }
        }
      };

      rmTag(this);
      return removed;
    }

    render(target) {

      let el = _get(target);
      let tagId = this.tagId;

      if (!el) {
        el = D.one(`[tagId="${tagId}"]`);
      }

      if (el) {
        el.empty();
        el.setAttribute('tagId', tagId);
        render(this.nodeList, el);
        Actual.set(tagId, el);
        Mirror.set(tagId, clone(this));
      }
    }

  }

  vD.create = (el, attrs, entries) => {
    return new vElement(el, attrs, entries);
  };

  // exports
  if (ENV === 'node') {
    module.exports = {
      DOM: D,
      vDOM: vD
    };
  } else {
    let root = window || {};
    if (root.define && root.define.amd) {
      root.define(() => {
        return {
          DOM: D,
          vDOM: vD
        };
      });
    }
    root.DOM = D;
    root.vDOM = vD;
  }
})();
