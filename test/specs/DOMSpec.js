/**
 * Testing
 * @ndaidong
 */

/* global DOM */

'use strict';

describe('General', () => {

  let keys = [
    'Event',
    'add', 'all', 'create', 'get', 'getMousePosition', 'getWindowSize', 'one', 'ready'
  ];

  let check = (k) => {
    it(`DOM.${k} must be defined`, () => {
      expect(DOM[k]).toBeDefined();
    });
  };

  keys.map(check);
});

describe('DOM.create', () => {

  let d = DOM.create('DIV');
  it('Created element must have nodeType', () => {
    expect(d.nodeType).toBeDefined();
  });
  afterEach(() => {
    d.destroy();
  });
});

describe('DOM.add', () => {

  let d = DOM.add('DIV');
  it('Added element must have nodeType', () => {
    expect(d.nodeType).toBeDefined();
  });
  afterEach(() => {
    d.destroy();
  });
});

describe('DOM.get', () => {

  let d = document.createElement('SPAN');
  d.setAttribute('id', 'domtest');
  d.className = 'noop';
  d.innerHTML = 'Hello world';
  document.body.appendChild(d);

  let el = DOM.get('domtest');
  it('Element must be found', () => {
    expect(el).toBeDefined();
  });
  it('Element ID must be "domtest"', () => {
    expect(el.id).toEqual('domtest');
  });
  it('Element.html() must be "Hello world"', () => {
    expect(el.html()).toEqual('Hello world');
  });

  let keys = [
    'addClass', 'hasClass', 'removeClass', 'toggleClass'
  ];

  let check = (k) => {
    it(`Element.${k} must be defined`, () => {
      expect(el[k]).toBeDefined();
    });
  };

  keys.map(check);

  afterEach(() => {
    d.destroy();
  });
});

describe('Element has no class: call .addClass()', () => {

  let el = DOM.add('DIV');
  el.addClass('nano selinium');

  it('.addClass("nano selinium"): Element must have them both', () => {
    expect(el.hasClass('nano')).toBe(true);
    expect(el.hasClass('selinium')).toBe(true);
  });

  afterEach(() => {
    el.destroy();
  });
});

describe('Element has 3 classes "nano selinium animate": call .removeClass()', () => {

  let el = DOM.add('DIV');
  el.addClass('nano selinium animate');

  el.removeClass('nano animate');
  it('.removeClass("nano animate"): Element must loss them', () => {
    expect(el.hasClass('nano')).toBe(false);
    expect(el.hasClass('animate')).toBe(false);
    expect(el.hasClass('selinium')).toBe(true);
  });

  afterEach(() => {
    el.destroy();
  });
});

describe('Element has 2 classes "nano selinium": call .toggleClass()', () => {

  let el = DOM.add('DIV');
  el.addClass('nano selinium');

  el.toggleClass('nano animate');
  it('.toggleClass("nano animate"): "nano" gone, "animate" came', () => {
    expect(el.hasClass('nano')).toBe(false);
    expect(el.hasClass('animate')).toBe(true);
    expect(el.hasClass('selinium')).toBe(true);
  });

  afterEach(() => {
    el.destroy();
  });
});

describe('DOM.Event on & simulate', () => {

  let el = DOM.add('DIV');
  let fn;

  beforeEach(() => {
    fn = jasmine.createSpy('func');
    DOM.Event.on(el, 'click', fn);
    DOM.Event.simulate(el, 'click');
  });

  it('tracks that the spy was called', () => {
    expect(fn).toHaveBeenCalled();
  });

  afterEach(() => {
    el.destroy();
  });
});

describe('DOM.Event off & simulate', () => {

  let el = DOM.add('DIV');
  let fn;

  beforeEach(() => {
    fn = jasmine.createSpy('func');
    DOM.Event.on(el, 'click', fn);
    DOM.Event.off(el, 'click', fn);
    DOM.Event.simulate(el, 'click');
  });

  it('tracks that the spy was not called', () => {
    expect(fn).not.toHaveBeenCalled();
  });

  afterEach(() => {
    el.destroy();
  });
});
