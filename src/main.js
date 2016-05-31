/**
 * doc
 * @ndaidong
**/

'use strict';

((factory) => {
  var root = window || {};
  if (root.define && root.define.amd) {
    root.define([], factory);
  } else if (root.exports) {
    root.exports = factory();
  } else {
    root.doc = factory();
  }
})(() => { // eslint-disable-line no-invalid-this

  var isUndefined = (v) => {
    return v === undefined; // eslint-disable-line no-undefined
  };
  var isObject = (v) => {
    return !isUndefined(v) && typeof v === 'object';
  };
  var isString = (v) => {
    return typeof v === 'string';
  };
  var isNumber = (v) => {
    return typeof v === 'number';
  };
  var isElement = (v) => {
    return v instanceof HTMLElement;
  };
  var isFunction = (v) => {
    return v && {}.toString.call(v) === '[object Function]';
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

  var normalize = (k, v) => {

    let reg = /^([a-z]+)([A-Z]{1})([a-z]+)$/;
    let mat = k.match(reg);
    if (mat && mat.index === 0) {
      let a = [];
      a.push(mat[1]);
      a.push('-');
      a.push(mat[2]);
      a.push(mat[3]);
      k = a.join('').toLowerCase();
    }

    if (isNumber(v)) {
      v += 'px';
    }

    return {
      key: k,
      value: v
    };
  };

  var get, add, create, query, queryAll;

  get = (el) => {
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

      p.setProperty = (o) => {
        for (let k in o) {
          if (o[k] !== '') {
            let v = o[k];
            if (isString(v) || isNumber(v)) {
              p.setAttribute(k, v);
            }
          }
        }
        return p;
      };

      p.setStyle = (o) => {
        let a = [];
        if (isObject(o)) {
          for (let k in o) {
            if (o[k] !== '') {
              let v = o[k];
              if (isString(v) || isNumber(v)) {
                let x = normalize(k, v);
                a.push([ x.key, x.value ].join(':'));
              }
            }
          }
        } else if (isString(o)) {
          a = o.split(';');
        }
        let s = p.getAttribute('style');
        if (s) {
          let b = s.split(';');
          a = a.concat(b);
        }
        a.push('');
        p.setAttribute('style', a.join(';'));
        return p;
      };

      p.empty = () => {
        p.innerHTML = '';
        return p;
      };

      p.html = (s) => {
        if (isUndefined(s)) {
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

  add = (tag, parent) => {
    let p = parent ? get(parent) : document.body;
    let d = isElement(tag) ? tag : document.createElement(tag);
    p.appendChild(d);
    return get(d);
  };

  create = (tag) => {
    return get(document.createElement(tag));
  };

  query = (c) => {
    let el, tmp = document.querySelector(c);
    if (tmp) {
      el = get(tmp);
    }
    return el;
  };

  queryAll = (c) => {
    let els = [], tmp = document.querySelectorAll(c);
    if (tmp) {
      for (let i = 0; i < tmp.length; i++) {
        els.push(get(tmp[i]));
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

  var Event = (() => {

    let isGecko = ((ua) => {
      let n = ua.toLowerCase();
      return /gecko/i.test(n);
    })(navigator.userAgent);

    return {
      on: (element, event, fn) => {
        if (fn && isFunction(fn)) {
          let el = isString(element) ? get(element) : element;
          if (el && isElement(el)) {
            if (event === 'wheel') {
              event = isGecko ? 'DOMMouseScroll' : 'mousewheel';
            }
            if (el.addEventListener) {
              el.addEventListener(event, fn, false);
            } else if (el.attachEvent) {
              el.attachEvent('on' + event, fn);
            }
          }
        }
      },
      off: (element, event, fn) => {
        if (fn && isFunction(fn)) {
          let el = isString(element) ? get(element) : element;
          if (el && isElement(el)) {
            if (el.removeEventListener) {
              el.removeEventListener(event, fn, false);
            } else if (el.detachEvent) {
              el.detachEvent('on' + event, fn);
            }
          }
        }
      },
      simulate: (element, event) => {
        let evt, el = isString(element) ? get(element) : element;
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
      locate: (e) => {
        let evt = e || window.event;
        let targ = evt.target || evt.srcElement;
        if (targ && targ.nodeType === 3) {
          targ = targ.parentNode;
        }
        return get(targ);
      }
    };
  })();

  return {
    ready: onready,
    one: query,
    all: queryAll,
    get: get,
    add: add,
    create: create,
    Event: Event
  };
});
