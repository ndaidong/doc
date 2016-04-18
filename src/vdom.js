/**
 * vdom
 * @ndaidong
**/

'use strict';

(() => {

  var ENV = typeof module !== 'undefined' && module.exports ? 'node' : 'browser';

  var vd = {
    ENV: ENV
  };

  var isString = (v) => {
    return typeof v === 'string';
  };
  var isElement = (v) => {
    return v instanceof HTMLElement;
  };

  var D = document;
  var DC = D.createElement;
  var DE = D.documentElement;

  var _get, _add, _create, _query, _queryAll;

  _get = (el) => {
    let p = (isString(el) ? D.getElementById(el) : el) || null;
    if (p && isElement(p)) {
      let pc = p.classList;
      p.hasClass = (c) => {
        return pc.contains(c);
      };
      p.addClass = (c) => {
        pc.add(c);
        return p;
      };
      p.removeClass = (c) => {
        pc.remove(c);
        return p;
      };
      p.toggleClass = (c) => {
        pc.toggle(c);
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
    let p = parent ? _get(parent) : D.body;
    let d = isElement(tag) ? tag : DC(tag);
    p.appendChild(d);
    return _get(d);
  };

  _create = (tag) => {
    return _get(D.createElement(tag));
  };

  _query = (c) => {
    let el, tmp = D.querySelector(c);
    if (tmp) {
      el = _get(tmp);
    }
    return el;
  };

  _queryAll = (c) => {
    let els = [], tmp = D.querySelectorAll(c);
    if (tmp) {
      for (let i = 0; i < tmp.length; i++) {
        els.push(_get(tmp[i]));
      }
    }
    return els;
  };

  var onready = (fn) => {
    let rt = D.readyState;
    if (rt !== 'loading') {
      setTimeout(fn, 0);
    } else {
      D.addEventListener('DOMContentLoaded', fn);
    }
  };

  vd.ready = onready;
  vd.one = _query;
  vd.all = _queryAll;
  vd.get = _get;
  vd.add = _add;
  vd.create = _create;

  (() => {
    let atag = _create('A');
    atag.href = D.URL;
    let loc = atag.hostname;
    atag.destroy();
    vd.hostname = loc;
  })();

  let isGecko = ((ua) => {
    let n = ua.toLowerCase();
    return /gecko/i.test(n);
  })(navigator.userAgent);

  vd.Event = (() => {

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
        if (D.createEventObject) {
          evt = D.createEventObject();
          el.fireEvent('on' + event, evt);
        } else {
          evt = D.createEvent('HTMLEvents');
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

  vd.getMousePosition = (ev) => {
    let e = ev || window.event;
    let cursor = {
      x: 0,
      y: 0
    };
    if (e.pageX || e.pageY) {
      cursor.x = e.pageX;
      cursor.y = e.pageY;
    } else {
      let de = DE;
      let db = D.body;
      cursor.x = e.clientX + (de.scrollLeft || db.scrollLeft) - (de.clientLeft || 0);
      cursor.y = e.clientY + (de.scrollTop || db.scrollTop) - (de.clientTop || 0);
    }
    return cursor;
  };

  vd.getWindowSize = () => {
    let w = 0, h = 0;
    if (window.innerWidth) {
      w = window.innerWidth;
      h = window.innerHeight;
    } else if (DE && DE.clientWidth) {
      w = DE.clientWidth;
      h = DE.clientHeight;
    } else if (D.body) {
      w = D.body.clientWidth;
      h = D.body.clientHeight;
    }
    return {
      width: w,
      height: h
    };
  };

  // exports
  if (ENV === 'node') {
    module.exports = vd;
  } else {
    let root = window || {};
    if (root.define && root.define.amd) {
      root.define(() => {
        return vd;
      });
    }
    root.DOM = vd;
  }
})();
