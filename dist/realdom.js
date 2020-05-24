/**
 * realdom@4.0.1
 * built on: Sun, 24 May 2020 10:42:40 GMT
 * repository: https://github.com/ndaidong/realdom
 * maintainer: @ndaidong
 * License: MIT
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.realdom = {}));
}(this, (function (exports) {
  const ob2Str = (val) => {
    return {}.toString.call(val);
  };
  const isArray = (val) => {
    return Array.isArray(val);
  };
  const isString = (val) => {
    return String(val) === val;
  };
  const isNumber = (val) => {
    return Number(val) === val;
  };
  const isNil = (val) => {
    return val === null || val === undefined;
  };
  const isFunction = (val) => {
    return ob2Str(val) === '[object Function]';
  };
  const isObject = (val) => {
    return ob2Str(val) === '[object Object]' && !isArray(val);
  };
  const isElement = (v) => {
    return ob2Str(v).match(/^\[object HTML\w*Element]$/) !== null;
  };
  const normalize = (k, v) => {
    const reg = /^([a-z]+)([A-Z]{1})([a-z]+)$/;
    const mat = k.match(reg);
    if (mat && mat.index === 0) {
      const a = [];
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
      value: v,
    };
  };
  const nav = navigator;
  const win = window;
  const doc = document;
  const anchor = {
    attachBehaviors: () => {},
  };
  const get = (el) => {
    const p = (isString(el) ? doc.getElementById(el) : el) || null;
    if (p && !p.___BEHAVIORS_ATTACHED) {
      return anchor.attachBehaviors(p);
    }
    return p;
  };
  const add = (tag, parent) => {
    const p = parent ? get(parent) : doc.body;
    const d = isElement(tag) ? tag : doc.createElement(tag);
    p.appendChild(d);
    return get(d);
  };
  const create = (tag) => {
    return get(doc.createElement(tag));
  };
  const query = (selector, root = doc) => {
    const tmp = root.querySelector(selector);
    return tmp ? get(tmp) : null;
  };
  const queryAll = (selector, root = doc) => {
    const tmp = root.querySelectorAll(selector);
    return !tmp ? [] : Array.from(tmp).map((el) => {
      return get(el);
    });
  };
  anchor.attachBehaviors = (p) => {
    if (p && isElement(p)) {
      p.query = (selector) => {
        return query(selector, p);
      };
      p.queryAll = (selector) => {
        return queryAll(selector, p);
      };
      p.hasClass = (className = '') => {
        const c = className.trim();
        return !c ? false : p.classList.contains(c);
      };
      p.addClass = (...args) => {
        p.classList.add(...args);
        return p;
      };
      p.removeClass = (...args) => {
        p.classList.remove(...args);
        return p;
      };
      p.toggleClass = (...args) => {
        args.forEach((c) => {
          p.classList.toggle(c);
        });
        return p;
      };
      p.replaceClass = (oldClass = '', newClass = '') => {
        const o = oldClass.trim();
        const n = newClass.trim();
        p.removeClass(o);
        p.addClass(n);
        return p;
      };
      p.setProperty = (o = {}) => {
        Object.keys(o).forEach((k) => {
          const v = o[k];
          if (isString(v) || isNumber(v)) {
            p.setAttribute(k, v);
          }
        });
        return p;
      };
      const fixStyle = (s) => {
        return s.replace(/;+/gi, ';').replace(/:/gi, ': ') + ';';
      };
      p.setStyle = (o = {}) => {
        const props = isString(o) ? o.split(';') : isObject(o) ? ((input) => {
          return Object.keys(input).map((k) => {
            const v = input[k];
            if (isString(v) || isNumber(v)) {
              const x = normalize(k, v);
              return [x.key, x.value].join(':');
            }
            return null;
          }).filter((item) => {
            return !isNil(item);
          });
        })(o) : [];
        const currStyle = p.getAttribute('style') || '';
        const currStyleList = currStyle.split(';');
        const combinedPropes = [...currStyleList, ...props, ''];
        const st = combinedPropes.filter((item) => {
          return item.trim().length > 0;
        }).map((item) => {
          const parts = item.split(':');
          return parts.map((part) => {
            return part.trim();
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
        if (isNil(s)) {
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
  const ready = (fn) => {
    const rt = doc.readyState;
    const c = rt !== 'loading';
    return c ? setTimeout(fn, 0) : doc.addEventListener('DOMContentLoaded', fn);
  };
  const Event = (() => {
    const isGecko = ((ua) => {
      const n = ua.toLowerCase();
      return (/gecko/i).test(n);
    })(nav.userAgent);
    return {
      on: (element, event, fn) => {
        return !isFunction(fn) ? false : (() => {
          const el = isString(element) ? get(element) : element;
          return !isElement(el) ? false : (() => {
            const evt = event !== 'wheel' ? event : isGecko ? 'DOMMouseScroll' : 'mousewheel';
            el.addEventListener(evt, fn, false);
          })();
        })();
      },
      off: (element, event, fn) => {
        return !isFunction(fn) ? false : (() => {
          const el = isString(element) ? get(element) : element;
          return !isElement(el) ? false : el.removeEventListener(event, fn, false);
        })();
      },
      simulate: (element, event) => {
        const el = isString(element) ? get(element) : element;
        const evt = doc.createEvent('HTMLEvents');
        evt.initEvent(event, true, true);
        el.dispatchEvent(evt);
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
        const evt = e || win.event;
        let targ = evt.target || evt.srcElement;
        if (targ && targ.nodeType === 3) {
          targ = targ.parentNode;
        }
        return get(targ);
      },
    };
  })();

  exports.Event = Event;
  exports.add = add;
  exports.create = create;
  exports.get = get;
  exports.query = query;
  exports.queryAll = queryAll;
  exports.ready = ready;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
