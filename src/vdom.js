/**
 * vdom
 * @ndaidong
**/

'use strict';

/* eslint-disable */
/*!
 * deep-diff.
 * Licensed under the MIT License.
 * https://github.com/flitbit/diff
 */
(function(e,t){"use strict";if(typeof define==="function"&&define.amd){define([],t)}else if(typeof exports==="object"){module.exports=t()}else{e.DeepDiff=t()}})(this,function(e){"use strict";var t,n,a=[];if(typeof global==="object"&&global){t=global}else if(typeof window!=="undefined"){t=window}else{t={}}n=t.DeepDiff;if(n){a.push(function(){if("undefined"!==typeof n&&t.DeepDiff===p){t.DeepDiff=n;n=e}})}function r(e,t){e.super_=t;e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}})}function i(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:true});if(t&&t.length){Object.defineProperty(this,"path",{value:t,enumerable:true})}}function f(e,t,n){f.super_.call(this,"E",e);Object.defineProperty(this,"lhs",{value:t,enumerable:true});Object.defineProperty(this,"rhs",{value:n,enumerable:true})}r(f,i);function u(e,t){u.super_.call(this,"N",e);Object.defineProperty(this,"rhs",{value:t,enumerable:true})}r(u,i);function l(e,t){l.super_.call(this,"D",e);Object.defineProperty(this,"lhs",{value:t,enumerable:true})}r(l,i);function s(e,t,n){s.super_.call(this,"A",e);Object.defineProperty(this,"index",{value:t,enumerable:true});Object.defineProperty(this,"item",{value:n,enumerable:true})}r(s,i);function h(e,t,n){var a=e.slice((n||t)+1||e.length);e.length=t<0?e.length+t:t;e.push.apply(e,a);return e}function c(e){var t=typeof e;if(t!=="object"){return t}if(e===Math){return"math"}else if(e===null){return"null"}else if(Array.isArray(e)){return"array"}else if(e instanceof Date){return"date"}else if(/^\/.*\//.test(e.toString())){return"regexp"}return"object"}function o(t,n,a,r,i,p,b){i=i||[];var d=i.slice(0);if(typeof p!=="undefined"){if(r&&r(d,p,{lhs:t,rhs:n})){return}d.push(p)}var v=typeof t;var y=typeof n;if(v==="undefined"){if(y!=="undefined"){a(new u(d,n))}}else if(y==="undefined"){a(new l(d,t))}else if(c(t)!==c(n)){a(new f(d,t,n))}else if(t instanceof Date&&n instanceof Date&&t-n!==0){a(new f(d,t,n))}else if(v==="object"&&t!==null&&n!==null){b=b||[];if(b.indexOf(t)<0){b.push(t);if(Array.isArray(t)){var k,m=t.length;for(k=0;k<t.length;k++){if(k>=n.length){a(new s(d,k,new l(e,t[k])))}else{o(t[k],n[k],a,r,d,k,b)}}while(k<n.length){a(new s(d,k,new u(e,n[k++])))}}else{var g=Object.keys(t);var w=Object.keys(n);g.forEach(function(i,f){var u=w.indexOf(i);if(u>=0){o(t[i],n[i],a,r,d,i,b);w=h(w,u)}else{o(t[i],e,a,r,d,i,b)}});w.forEach(function(t){o(e,n[t],a,r,d,t,b)})}b.length=b.length-1}}else if(t!==n){if(!(v==="number"&&isNaN(t)&&isNaN(n))){a(new f(d,t,n))}}}function p(t,n,a,r){r=r||[];o(t,n,function(e){if(e){r.push(e)}},a);return r.length?r:e}function b(e,t,n){if(n.path&&n.path.length){var a=e[t],r,i=n.path.length-1;for(r=0;r<i;r++){a=a[n.path[r]]}switch(n.kind){case"A":b(a[n.path[r]],n.index,n.item);break;case"D":delete a[n.path[r]];break;case"E":case"N":a[n.path[r]]=n.rhs;break}}else{switch(n.kind){case"A":b(e[t],n.index,n.item);break;case"D":e=h(e,t);break;case"E":case"N":e[t]=n.rhs;break}}return e}function d(e,t,n){if(e&&t&&n&&n.kind){var a=e,r=-1,i=n.path?n.path.length-1:0;while(++r<i){if(typeof a[n.path[r]]==="undefined"){a[n.path[r]]=typeof n.path[r]==="number"?[]:{}}a=a[n.path[r]]}switch(n.kind){case"A":b(n.path?a[n.path[r]]:a,n.index,n.item);break;case"D":delete a[n.path[r]];break;case"E":case"N":a[n.path[r]]=n.rhs;break}}}function v(e,t,n){if(n.path&&n.path.length){var a=e[t],r,i=n.path.length-1;for(r=0;r<i;r++){a=a[n.path[r]]}switch(n.kind){case"A":v(a[n.path[r]],n.index,n.item);break;case"D":a[n.path[r]]=n.lhs;break;case"E":a[n.path[r]]=n.lhs;break;case"N":delete a[n.path[r]];break}}else{switch(n.kind){case"A":v(e[t],n.index,n.item);break;case"D":e[t]=n.lhs;break;case"E":e[t]=n.lhs;break;case"N":e=h(e,t);break}}return e}function y(e,t,n){if(e&&t&&n&&n.kind){var a=e,r,i;i=n.path.length-1;for(r=0;r<i;r++){if(typeof a[n.path[r]]==="undefined"){a[n.path[r]]={}}a=a[n.path[r]]}switch(n.kind){case"A":v(a[n.path[r]],n.index,n.item);break;case"D":a[n.path[r]]=n.lhs;break;case"E":a[n.path[r]]=n.lhs;break;case"N":delete a[n.path[r]];break}}}function k(e,t,n){if(e&&t){var a=function(a){if(!n||n(e,t,a)){d(e,t,a)}};o(e,t,a)}}Object.defineProperties(p,{diff:{value:p,enumerable:true},observableDiff:{value:o,enumerable:true},applyDiff:{value:k,enumerable:true},applyChange:{value:d,enumerable:true},revertChange:{value:y,enumerable:true},isConflict:{value:function(){return"undefined"!==typeof n},enumerable:true},noConflict:{value:function(){if(a){a.forEach(function(e){e()});a=null}return p},enumerable:true}});return p});
/* eslint-enable */

((global, factory) => {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    let o = factory();
    global.DOM = o.DOM;
    global.vDOM = o.vDOM;
  }
})(this, () => { // eslint-disable-line no-invalid-this

  var RD = {}, VD = {};

  var isUndefined = (v) => {
    return v === undefined; // eslint-disable-line no-undefined
  };
  var isString = (v) => {
    return typeof v === 'string';
  };
  var isElement = (v) => {
    return v instanceof HTMLElement;
  };
  var isFunction = (v) => {
    return v && {}.toString.call(v) === '[object Function]';
  };

  var hasProperty = (ob, k) => {
    if (!ob || !k) {
      return false;
    }
    let r = true;
    if (isUndefined(ob[k])) {
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

  var createId = (leng, prefix) => {
    let rn = () => {
      return Math.random().toString(36).slice(2);
    };
    let a = [];
    while (a.length < 10) {
      a.push(rn());
    }
    let r = a.join('');
    let t = r.length;
    let px = prefix || '';
    let ln = Math.max(leng || 32, px.length);
    let s = px;
    while (s.length < ln) {
      let k = Math.floor(Math.random() * t);
      s += r.charAt(k) || '';
    }
    return s;
  };


  // actual DOM
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

  RD.ready = onready;
  RD.one = _query;
  RD.all = _queryAll;
  RD.get = _get;
  RD.add = _add;
  RD.create = _create;

  RD.Event = (() => {

    let isGecko = ((ua) => {
      let n = ua.toLowerCase();
      return /gecko/i.test(n);
    })(navigator.userAgent);

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
      locate: (e) => {
        let evt = e || window.event;
        let targ = evt.target || evt.srcElement;
        if (targ && targ.nodeType === 3) {
          targ = targ.parentNode;
        }
        return _get(targ);
      }
    };
  })();

  class xMap {
    constructor() {
      this.data = {};
    }

    set(k, v) {
      let d = this.data;
      d[k] = v;
      return this;
    }

    get(k) {
      let d = this.data;
      return d[k] || null;
    }

    has(k) {
      let d = this.data;
      return hasProperty(d, k);
    }

    delete(k) {
      if (!this.has(k)) {
        return false;
      }
      let d = this.data;
      d[k] = null;
      delete d[k];
      return true;
    }
  }

  // virtual DOM
  var Actual = new xMap();
  var Virtual = new xMap();
  var Mirror = new xMap();

  var clone = (o) => {
    let s = JSON.stringify(o);
    return JSON.parse(s);
  };

  var saveMap = (id, vdom) => {
    Actual.set(id, null);
    Mirror.set(id, null);
    Virtual.set(id, vdom);
  };

  VD.get = (id, full) => {
    if (!id || !isString(id)) {
      return null;
    }
    if (full === true) {
      return {
        actual: Actual.get(id),
        virtual: Virtual.get(id),
        mirror: Mirror.get(id)
      };
    }
    return Virtual.get(id);
  };

  VD.remove = (id) => {
    Actual.delete(id);
    Virtual.delete(id);
    Mirror.delete(id);
  };

  var adiff = (a, b) => {
    let r = [];

    if (a !== b) {
      let la = a.length, lb = b.length;
      let m = Math.max(la, lb);
      if (m > 0) {
        for (let i = 0; i < la; i++) {
          let ia = a[i];
          let ka = ia.key, va = ia.value;
          let f = false;
          for (let j = 0; j < lb; j++) {
            let jb = b[j];
            let kb = jb.key, vb = jb.value;
            if (kb === ka) {
              f = true;
              if (va !== vb) {
                r.push({
                  action: 'Update',
                  key: ka,
                  value: va
                });
              }
              break;
            }
          }
          if (!f) {
            r.push({
              action: 'Remove',
              key: ka,
              value: va
            });
          }
        }
        for (let i = 0; i < lb; i++) {
          let ib = b[i];
          let kb = ib.key, vb = ib.value;
          let f = -1;
          for (let j = 0; j < la; j++) {
            let ka = a[j].key;
            if (ka === kb) {
              f = j;
              break;
            }
          }
          if (f < 0) {
            r.push({
              action: 'Add',
              key: kb,
              value: vb
            });
          }
        }
      }
    }

    return r;
  };

  var compareAttributes = (a, b) => {
    let r = [];
    if (a === b) {
      return r;
    }
    let aa = [], bb = [];
    for (let k in a) {
      if (a.hasOwnProperty(k)) {
        aa.push({
          key: k,
          value: a[k]
        });
      }
    }
    for (let k in b) {
      if (b.hasOwnProperty(k)) {
        bb.push({
          key: k,
          value: b[k]
        });
      }
    }
    return adiff(aa, bb);
  };

  var compareEvents = (a, b) => {
    if (a === b) {
      return [];
    }
    return adiff(a, b);
  };

  var compareNodeList = (a, b) => {
    let r = [];
    if (a === b) {
      return r;
    }

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        let aa = a[i], bb = b[j];
        if (aa.tagId === bb.tagId) {
          let as = compareAttributes(aa.attributes, bb.attributes);
          if (as && as.length) {
            r = r.concat(as);
          }
          let es = compareEvents(aa.events, bb.events);
          if (es && es.length) {
            r = r.concat(es);
          }
          let ns = compareEvents(aa.nodeList, bb.nodeList);
          if (ns && ns.length) {
            r = r.concat(ns);
          }
        }
      }
    }
    return r;
  };

  VD.diff = (a, b) => {
    let r = [];
    if (a !== b) {
      let as = compareAttributes(a.attributes, b.attributes);
      if (as && as.length) {
        r = r.concat(as);
      }
      let es = compareEvents(a.events, b.events);
      if (es && es.length) {
        r = r.concat(es);
      }
      let ns = compareNodeList(a.nodeList, b.nodeList);
      if (ns && ns.length) {
        r = r.concat(es);
      }
    }
    return r;
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
        } else {
          a.setAttribute(k, v);
        }
      }
    }

    let events = node.events;
    for (let k in events) {
      if (hasProperty(events, k)) {
        let v = events[k];
        RD.Event.on(a, v.name, v.callback);
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
    hasAttribute(k) {
      let as = this.attributes;
      return hasProperty(as, k);
    }
    getAttribute(k) {
      return this.attributes[k] || null;
    }
    removeAttribute(k) {
      this.attributes[k] = null;
      delete this.attributes[k];
      return this;
    }

    setEvent(name, fn) {
      this.events.push({
        name: name,
        callback: fn
      });
      return this;
    }
    removeEvent(name) {
      this.events[name] = null;
      delete this.events[name];
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

    find(tagId) {

      let item;
      let look = (node) => {
        let entries = node.nodeList || [];
        if (entries.length > 0 && !item) {
          for (let i = 0; i < entries.length; i++) {
            let j = entries[i];
            if (j.tagId === tagId) {
              item = j;
              break;
            } else {
              look(j);
            }
          }
        }
        return item;
      };

      return look(this) || null;
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
              node.nodeList = entries;
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

      let tagId = this.tagId;

      let el = RD.one(`[tagId="${tagId}"]`);
      if (!el) {
        el = _create(this.tagName);
        el.setAttribute('tagId', tagId);
      }
      if (el) {
        let tag = _get(target);
        if (!tag) {
          tag = _get(el.parentNode);
        }
        render(this.nodeList, el);
        tag.empty();
        tag.appendChild(el);

        Actual.set(tagId, el);
        Mirror.set(tagId, clone(this));
      }
    }

  }

  VD.Element = vElement;

  VD.create = (el, attrs, events, entries) => {
    return new vElement(el, attrs, events, entries);
  };

  return {
    DOM: RD,
    vDOM: VD
  };
});
