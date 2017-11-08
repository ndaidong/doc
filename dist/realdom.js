/**
 * realdom@3.2.4
 * built on: Wed, 08 Nov 2017 09:44:26 GMT
 * repository: https://github.com/ndaidong/realdom
 * maintainer: @ndaidong
 * License: MIT
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.realdom = {})));
}(this, (function (exports) { 'use strict';
  var asyncGenerator = function () {
    function AwaitValue(value) {
      this.value = value;
    }
    function AsyncGenerator(gen) {
      var front, back;
      function send(key, arg) {
        return new Promise(function (resolve, reject) {
          var request = {
            key: key,
            arg: arg,
            resolve: resolve,
            reject: reject,
            next: null
          };
          if (back) {
            back = back.next = request;
          } else {
            front = back = request;
            resume(key, arg);
          }
        });
      }
      function resume(key, arg) {
        try {
          var result = gen[key](arg);
          var value = result.value;
          if (value instanceof AwaitValue) {
            Promise.resolve(value.value).then(function (arg) {
              resume("next", arg);
            }, function (arg) {
              resume("throw", arg);
            });
          } else {
            settle(result.done ? "return" : "normal", result.value);
          }
        } catch (err) {
          settle("throw", err);
        }
      }
      function settle(type, value) {
        switch (type) {
          case "return":
            front.resolve({
              value: value,
              done: true
            });
            break;
          case "throw":
            front.reject(value);
            break;
          default:
            front.resolve({
              value: value,
              done: false
            });
            break;
        }
        front = front.next;
        if (front) {
          resume(front.key, front.arg);
        } else {
          back = null;
        }
      }
      this._invoke = send;
      if (typeof gen.return !== "function") {
        this.return = undefined;
      }
    }
    if (typeof Symbol === "function" && Symbol.asyncIterator) {
      AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
        return this;
      };
    }
    AsyncGenerator.prototype.next = function (arg) {
      return this._invoke("next", arg);
    };
    AsyncGenerator.prototype.throw = function (arg) {
      return this._invoke("throw", arg);
    };
    AsyncGenerator.prototype.return = function (arg) {
      return this._invoke("return", arg);
    };
    return {
      wrap: function (fn) {
        return function () {
          return new AsyncGenerator(fn.apply(this, arguments));
        };
      },
      await: function (value) {
        return new AwaitValue(value);
      }
    };
  }();
  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
      return arr2;
    } else {
      return Array.from(arr);
    }
  };
  var ob2Str = function ob2Str(val) {
    return {}.toString.call(val);
  };
  var isUndefined = function isUndefined(val) {
    return ob2Str(val) === '[object Undefined]';
  };
  var isFunction = function isFunction(val) {
    return ob2Str(val) === '[object Function]';
  };
  var isString = function isString(val) {
    return ob2Str(val) === '[object String]';
  };
  var isNumber = function isNumber(val) {
    return ob2Str(val) === '[object Number]';
  };
  var isArray = function isArray(val) {
    return Array.isArray(val);
  };
  var isObject = function isObject(val) {
    return ob2Str(val) === '[object Object]' && !isArray(val);
  };
  var isElement = function isElement(v) {
    return ob2Str(v).match(/^\[object HTML\w*Element]$/);
  };
  var toString = function toString(input) {
    var s = isNumber(input) ? String(input) : input;
    if (!isString(s)) {
      throw new Error('InvalidInput: String required.');
    }
    return s;
  };
  var trim = function trim(s) {
    var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var x = toString(s);
    x = x.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
    if (x && all) {
      x = x.replace(/\r?\n|\r/g, ' ').replace(/\s\s+|\r/g, ' ');
    }
    return x;
  };
  if (!Array.from) {
    Array.from = function (c) {
      var a = [];
      for (var i = 0; i < c.length; i++) {
        a.push(c[i]);
      }
      return a;
    };
  }
  var normalize = function normalize(k, v) {
    var reg = /^([a-z]+)([A-Z]{1})([a-z]+)$/;
    var mat = k.match(reg);
    if (mat && mat.index === 0) {
      var a = [];
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
  var get = function get(el) {
    var p = (isString(el) ? doc.getElementById(el) : el) || null;
    if (p && !p.___BEHAVIORS_ATTACHED) {
      return attachBehaviors(p);
    }
    return p;
  };
  var add = function add(tag, parent) {
    var p = parent ? get(parent) : doc.body;
    var d = isElement(tag) ? tag : doc.createElement(tag);
    p.appendChild(d);
    return get(d);
  };
  var create = function create(tag) {
    return get(doc.createElement(tag));
  };
  var query = function query(selector) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : doc;
    var el = void 0;
    var tmp = root.querySelector(selector);
    if (tmp) {
      el = get(tmp);
    }
    return el;
  };
  var queryAll = function queryAll(selector) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : doc;
    var els = [];
    var tmp = root.querySelectorAll(selector);
    if (tmp) {
      Array.from(tmp).forEach(function (el) {
        els.push(get(el));
      });
    }
    return els;
  };
  attachBehaviors = function attachBehaviors(p) {
    if (p && isElement(p)) {
      p.query = function (selector) {
        return query(selector, p);
      };
      p.queryAll = function (selector) {
        return queryAll(selector, p);
      };
      var pc = p.classList;
      p.hasClass = function () {
        var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var c = trim(className, true);
        if (!c) {
          return false;
        }
        return pc.contains(c);
      };
      p.addClass = function () {
        var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var c = trim(className, true);
        if (!c) {
          return false;
        }
        var a = c.split(' ');
        pc.add.apply(pc, toConsumableArray(a));
        return p;
      };
      p.removeClass = function () {
        var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var c = trim(className, true);
        if (!c) {
          return false;
        }
        var a = c.split(' ');
        pc.remove.apply(pc, toConsumableArray(a));
        return p;
      };
      p.toggleClass = function () {
        var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var c = trim(className, true);
        if (!c) {
          return false;
        }
        var a = c.split(' ');
        if (a.length > 1) {
          a.forEach(function (s) {
            pc.toggle(s);
          });
        } else {
          pc.toggle(c);
        }
        return p;
      };
      p.replaceClass = function () {
        var oldClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var newClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var o = trim(oldClass, true);
        var n = trim(newClass, true);
        p.removeClass(o);
        p.addClass(n);
        return p;
      };
      p.setProperty = function () {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        for (var k in o) {
          if (o[k] !== '') {
            var v = o[k];
            if (isString(v) || isNumber(v)) {
              p.setAttribute(k, v);
            }
          }
        }
        return p;
      };
      var fixStyle = function fixStyle(s) {
        return s.replace(/;+/gi, ';').replace(/:/gi, ': ') + ';';
      };
      p.setStyle = function () {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var a = [];
        if (isObject(o)) {
          for (var k in o) {
            if (o[k] !== '') {
              var v = o[k];
              if (isString(v) || isNumber(v)) {
                var x = normalize(k, v);
                a.push([x.key, x.value].join(':'));
              }
            }
          }
        } else if (isString(o)) {
          a = o.split(';');
        }
        var s = p.getAttribute('style');
        if (s) {
          var b = s.split(';');
          a = b.concat(a);
        }
        a.push('');
        var st = a.filter(function (item) {
          return trim(item, true).length > 0;
        }).map(function (item) {
          var parts = item.split(':');
          return parts.map(function (part) {
            return trim(part, true);
          }).join(':');
        }).join('; ');
        p.setAttribute('style', fixStyle(st));
        return p;
      };
      p.empty = function () {
        while (p.lastChild) {
          p.removeChild(p.lastChild);
        }
        return p;
      };
      p.html = function (s) {
        if (isUndefined(s)) {
          return p.innerHTML;
        }
        p.innerHTML = s;
        return p;
      };
      p.destroy = function () {
        if (p.parentNode) {
          p.parentNode.removeChild(p);
        }
      };
      p.___BEHAVIORS_ATTACHED = 1;
    }
    return p;
  };
  var ready = function ready(fn) {
    var rt = doc.readyState;
    var c = rt !== 'loading';
    if (c) {
      setTimeout(fn, 0);
    } else {
      doc.addEventListener('DOMContentLoaded', fn);
    }
  };
  var Event = function () {
    var isGecko = function (ua) {
      var n = ua.toLowerCase();
      return (/gecko/i.test(n)
      );
    }(nav.userAgent);
    return {
      on: function on(element, event, fn) {
        if (fn && isFunction(fn)) {
          var el = isString(element) ? get(element) : element;
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
      off: function off(element, event, fn) {
        if (fn && isFunction(fn)) {
          var el = isString(element) ? get(element) : element;
          if (el && isElement(el)) {
            if (el.removeEventListener) {
              el.removeEventListener(event, fn, false);
            } else if (el.detachEvent) {
              el.detachEvent('on' + event, fn);
            }
          }
        }
      },
      simulate: function simulate(element, event) {
        var evt = void 0;
        var el = isString(element) ? get(element) : element;
        if (doc.createEventObject) {
          evt = doc.createEventObject();
          el.fireEvent('on' + event, evt);
        } else {
          evt = doc.createEvent('HTMLEvents');
          evt.initEvent(event, true, true);
          el.dispatchEvent(evt);
        }
      },
      stop: function stop(e) {
        e.cancelBubble = true;
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        if (e.preventDefault) {
          e.preventDefault();
        }
        return false;
      },
      locate: function locate(e) {
        var evt = e || win.event;
        var targ = evt.target || evt.srcElement;
        if (targ && targ.nodeType === 3) {
          targ = targ.parentNode;
        }
        return get(targ);
      }
    };
  }();
  exports.get = get;
  exports.add = add;
  exports.create = create;
  exports.query = query;
  exports.queryAll = queryAll;
  exports.ready = ready;
  exports.Event = Event;
  Object.defineProperty(exports, '__esModule', { value: true });
})));
