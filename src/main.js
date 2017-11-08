/**
 * realdom
 * @ndaidong
**/

import {
  isUndefined,
  isObject,
  isString,
  isNumber,
  isElement,
  isFunction,
  trim
} from 'bellajs';


if (!Array.from) {
  Array.from = (c) => {
    let a = [];
    for (let i = 0; i < c.length; i++) {
      a.push(c[i]);
    }
    return a;
  };
}

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

var nav = navigator;
var win = window;
var doc = document;

var attachBehaviors;

export var get = (el) => {
  let p = (isString(el) ? doc.getElementById(el) : el) || null;
  if (p && !p.___BEHAVIORS_ATTACHED) {
    return attachBehaviors(p);
  }
  return p;
};

export var add = (tag, parent) => {
  let p = parent ? get(parent) : doc.body;
  let d = isElement(tag) ? tag : doc.createElement(tag);
  p.appendChild(d);
  return get(d);
};

export var create = (tag) => {
  return get(doc.createElement(tag));
};

export var query = (selector, root = doc) => {
  let el;
  let tmp = root.querySelector(selector);
  if (tmp) {
    el = get(tmp);
  }
  return el;
};

export var queryAll = (selector, root = doc) => {
  let els = [];
  let tmp = root.querySelectorAll(selector);
  if (tmp) {
    Array.from(tmp).forEach((el) => {
      els.push(get(el));
    });
  }
  return els;
};

attachBehaviors = (p) => {
  if (p && isElement(p)) {

    p.query = (selector) => {
      return query(selector, p);
    };
    p.queryAll = (selector) => {
      return queryAll(selector, p);
    };

    let pc = p.classList;

    p.hasClass = (className = '') => {
      let c = trim(className, true);
      if (!c) {
        return false;
      }
      return pc.contains(c);
    };

    p.addClass = (className = '') => {
      let c = trim(className, true);
      if (!c) {
        return false;
      }
      let a = c.split(' ');
      pc.add(...a);
      return p;
    };

    p.removeClass = (className = '') => {
      let c = trim(className, true);
      if (!c) {
        return false;
      }
      let a = c.split(' ');
      pc.remove(...a);
      return p;
    };

    p.toggleClass = (className = '') => {
      let c = trim(className, true);
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

    p.replaceClass = (oldClass = '', newClass = '') => {
      let o = trim(oldClass, true);
      let n = trim(newClass, true);
      p.removeClass(o);
      p.addClass(n);
      return p;
    };

    p.setProperty = (o = {}) => {
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

    let fixStyle = (s) => {
      return s.replace(/;+/gi, ';').replace(/:/gi, ': ') + ';';
    };

    p.setStyle = (o = {}) => {

      let a = [];
      if (isObject(o)) {
        for (let k in o) {
          if (o[k] !== '') {
            let v = o[k];
            if (isString(v) || isNumber(v)) {
              let x = normalize(k, v);
              a.push([x.key, x.value].join(':'));
            }
          }
        }
      } else if (isString(o)) {
        a = o.split(';');
      }
      let s = p.getAttribute('style');
      if (s) {
        let b = s.split(';');
        a = b.concat(a);
      }
      a.push('');
      let st = a.filter((item) => {
        return trim(item, true).length > 0;
      }).map((item) => {
        let parts = item.split(':');
        return parts.map((part) => {
          return trim(part, true);
        }).join(':');
      }).join('; ');
      p.setAttribute('style', fixStyle(st));
      return p;
    };

    p.empty = () => {
      while (p.lastChild) {
        p.removeChild(p.lastChild);
      }
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

    p.___BEHAVIORS_ATTACHED = 1;

  }
  return p;
};

export var ready = (fn) => {
  let rt = doc.readyState;
  let c = rt !== 'loading';
  if (c) {
    setTimeout(fn, 0);
  } else {
    doc.addEventListener('DOMContentLoaded', fn);
  }
};

export var Event = (() => {

  let isGecko = ((ua) => {
    let n = ua.toLowerCase();
    return (/gecko/i).test(n);
  })(nav.userAgent);

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
      let evt;
      let el = isString(element) ? get(element) : element;
      if (doc.createEventObject) {
        evt = doc.createEventObject();
        el.fireEvent('on' + event, evt);
      } else {
        evt = doc.createEvent('HTMLEvents');
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
      let evt = e || win.event;
      let targ = evt.target || evt.srcElement;
      if (targ && targ.nodeType === 3) {
        targ = targ.parentNode;
      }
      return get(targ);
    }
  };
})();
