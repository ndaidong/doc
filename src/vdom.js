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

  var isString = (v) => {
    return typeof v === 'string';
  };
  var isElement = (v) => {
    return v instanceof HTMLElement;
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

  var vBranches = new Map();

  var parseHTML = (s) => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(s, 'text/xml');
    console.log(doc); // eslint-disable-line
    return [];
  };

  var parseAttributes = (node) => { // eslint-disable-line
    let o = Object.create({});
    return o;
  };

  class vElement {
    constructor(el, attrs, entries) {

      let id = createId(16);
      let rdom = _get(el) || _add('DIV');
      rdom.setAttribute('tagid', id);

      this.rdom = rdom;
      this.tagId = id;
      this.attributes = attrs || parseAttributes(rdom);
      this.entries = entries || parseHTML(rdom.html());

      vBranches.set(id, this);
      return this;
    }

    html(s) {
      this.html = parseHTML(s);
      return this;
    }

    setAttribute(k, v) {
      this.attributes[k] = v;
      return this;
    }

    clean() {
      this.entries = [];
      return this;
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
