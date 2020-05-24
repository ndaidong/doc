// realdom.test

const {
  isObject,
  isFunction,
  isElement,
} = require('bellajs');

const realdom = require('../dist/realdom');

describe('Check realdom APIs', () => {
  describe('Check publicMethods', () => {
    const publicMethods = [
      'get',
      'add',
      'create',
      'query',
      'queryAll',
      'ready',
    ];

    const check = (k) => {
      it(`realdom.${k} must be defined`, () => {
        expect(realdom[k]).toBeDefined();
      });
      it(`realdom.${k} must be function`, () => {
        expect(isFunction(realdom[k])).toBe(true);
      });
    };

    publicMethods.map(check);
  });
});


describe('Check realdom created HTMLElement DOM APIs', () => {
  describe('Check realdom.create()', () => {
    const elm = realdom.create('span');
    it(`realdom.create() must return an HTMLElement`, () => {
      expect(isElement(elm)).toBe(true);
    });
    it(`Created element must be a SPAN`, () => {
      expect(elm.tagName).toBe('SPAN');
    });

    describe('Check domMethods', () => {
      const domMethods = [
        'addClass', 'hasClass', 'removeClass', 'toggleClass', 'replaceClass',
        'query', 'queryAll',
        'setProperty', 'setStyle',
        'html', 'empty', 'destroy',
      ];

      const check = (k) => {
        it(`elm.${k} must be defined`, () => {
          expect(elm[k]).toBeDefined();
        });
        it(`elm.${k} must be function`, () => {
          expect(isFunction(elm[k])).toBe(true);
        });
      };

      domMethods.map(check);
    });
  });
});

describe('Check DOM manipulation methods', () => {
  const d = document.createElement('SPAN');
  d.setAttribute('id', 'domtest');
  document.body.appendChild(d);

  const domtest = realdom.get('domtest');
  it(`realdom.get('domtest') must return an HTMLElement`, () => {
    expect(isElement(domtest)).toBe(true);
  });
  it(`realdom.get('something-else') must return null`, () => {
    expect(realdom.get('something-else')).toBe(null);
  });

  const elmChild = realdom.add('div', 'domtest');
  it(`realdom.add('div', 'domtest') must return an HTMLElement`, () => {
    expect(isElement(elmChild)).toBe(true);
  });
  it(`Created element must be a DIV`, () => {
    expect(elmChild.tagName).toBe('DIV');
  });

  it(`realdom.add(domtest) must work`, () => {
    expect(realdom.add(domtest)).toBe(domtest);
  });

  const ul = realdom.add('ul', 'domtest');
  ul.setAttribute('id', 'menu');
  ul.addClass('x-menu', 'inactive');
  for (let i = 1; i < 5; i++) {
    const li = realdom.add('li', ul);
    li.addClass('menu-item');
  }

  it(`realdom.query('#menu') must work as well`, () => {
    const queryUl = realdom.query('#menu');
    expect(queryUl).toBe(ul);
  });
  it(`domtest.query('#menu') must work as well`, () => {
    const queryUl = d.query('#menu');
    expect(queryUl).toBe(ul);
  });

  it(`realdom.queryAll('li.menu-item') must work as well`, () => {
    const queryLi = realdom.queryAll('li.menu-item');
    expect(Array.isArray(queryLi)).toBe(true);
    expect(queryLi.length).toEqual(4);
  });
  it(`queryUl.queryAll('li.menu-item') must work as well`, () => {
    const queryUl = realdom.query('#menu');
    const queryLi = queryUl.queryAll('li.menu-item');
    expect(Array.isArray(queryLi)).toBe(true);
    expect(queryLi.length).toEqual(4);
  });

  it(`ul.empty() must work as well`, () => {
    const queryUl = realdom.query('#menu');
    queryUl.empty();
    const queryLi = queryUl.queryAll('li.menu-item');
    expect(Array.isArray(queryLi)).toBe(true);
    expect(queryLi.length).toEqual(0);
  });

  it(`ul.destroy() must work as well`, () => {
    ul.destroy();
    const queryUl = realdom.get('menu');
    expect(queryUl).toBe(null);
  });

  it(`domtest.html('Hello') must work as well`, () => {
    domtest.html('Hello');
    expect(domtest.html()).toBe('Hello');
  });
  it(`domtest.html('') must work as well`, () => {
    domtest.html('');
    expect(domtest.html()).toBe('');
  });

  it(`domtest.setProperty() must work as well`, () => {
    domtest.setProperty({
      name: 'Alice',
      age: 15,
      nonsense: {
        x: 7,
      },
    });
    expect(domtest.getAttribute('name')).toBe('Alice');
    expect(domtest.getAttribute('age')).toBe('15');
    expect(domtest.getAttribute('nonsense')).toBe(null);
  });

  it(`domtest.setStyle() must work as well`, () => {
    domtest.setStyle({
      'fontSize': 15,
      'backgroundColor': 'green',
      'maxWidth': 500,
      'margin-top': '20px',
    });
    const style = 'font-size: 15px; background-color: green; max-width: 500px; margin-top: 20px;';
    expect(domtest.getAttribute('style')).toBe(style);
    domtest.setStyle('padding-top: 20px');
    expect(domtest.getAttribute('style')).toBe(style + ' padding-top: 20px;');
  });
});

describe('Check DOM Event methods', () => {
  it(`realdom.ready() must work as well`, () => {
    const mockCallback = jest.fn((x) => x);
    realdom.ready(mockCallback);
    setTimeout(() => {
      expect(mockCallback).toHaveBeenCalled();
    }, 0);
  });

  const Event = realdom.Event;
  it(`realdom.Event must be an Object`, () => {
    expect(isObject(Event)).toBe(true);
  });

  const evtest = realdom.add('div', 'domtest');
  evtest.setAttribute('id', 'evtest');

  it(`Event on must work as well`, () => {
    const mockCallback = jest.fn((x) => x);
    Event.on(evtest, 'click', mockCallback);
    Event.simulate(evtest, 'click');
    expect(mockCallback).toHaveBeenCalled();
    Event.simulate(evtest, 'click');
    expect(mockCallback).toHaveBeenCalled();
  });

  it(`Event off must work as well`, () => {
    const mockCallback = jest.fn((x) => x);
    Event.on(evtest, 'click', mockCallback);
    Event.simulate(evtest, 'click');
    expect(mockCallback).toHaveBeenCalled();
    mockCallback.mockReset();
    Event.off(evtest, 'click', mockCallback);
    Event.simulate(evtest, 'click');
    expect(mockCallback).not.toBeCalled();
  });

  it(`Event locate must work as well`, () => {
    const fn = (evt) => {
      expect(Event.locate(evt)).toBe(evtest);
    };
    Event.on(evtest, 'click', fn);
    Event.simulate(evtest, 'click');
  });

  it(`Event locate must work as well`, () => {
    const mockCallback = jest.fn((x) => x);
    const fn = (evt) => {
      Event.stop(evt);
      expect(mockCallback).not.toBeCalled();
    };
    Event.on(evtest, 'click', fn);
    Event.simulate(evtest, 'click');
  });
});

describe('Check DOM element class handling', () => {
  const elm = realdom.create('span');
  const class1 = 'test-class-1';
  const class2 = 'test-class-2';
  it(`Created element must have no class`, () => {
    expect(elm.hasClass(class1)).toBe(false);
  });
  it(`addClass("${class1}") must work as well`, () => {
    expect(elm.addClass(class1)).toBe(elm);
  });
  it(`addClass(nothing) must return itself too`, () => {
    expect(elm.addClass()).toBe(elm);
  });
  it(`Added class must be found with hasClass("${class1}")`, () => {
    expect(elm.hasClass(class1)).toBe(true);
  });
  it(`toggleClass("${class2}") must work as well`, () => {
    expect(elm.toggleClass(class2)).toBe(elm);
  });
  it(`After toogling, "${class2}" must exist as long as "${class1}")`, () => {
    expect(elm.hasClass(class1)).toBe(true);
    expect(elm.hasClass(class2)).toBe(true);
  });
  it(`toggleClass("${class1}") must work as well`, () => {
    expect(elm.toggleClass(class1)).toBe(elm);
  });
  it(`After toogling, "${class1}" must go away)`, () => {
    expect(elm.hasClass(class1)).toBe(false);
    expect(elm.hasClass(class2)).toBe(true);
  });
  it(`toggleClass(nothing) must return itself too`, () => {
    expect(elm.toggleClass()).toBe(elm);
  });
  it(`replaceClass("${class2}", "${class1}") must work as well`, () => {
    expect(elm.replaceClass(class2, class1)).toBe(elm);
  });
  it(`After replacing, only "${class1}" can be found)`, () => {
    expect(elm.hasClass(class1)).toBe(true);
    expect(elm.hasClass(class2)).toBe(false);
  });
  it(`hasClass(nothing) must return false`, () => {
    expect(elm.hasClass()).toBe(false);
  });
  it(`toggleClass(${class1}, ${class2}) must work as well`, () => {
    expect(elm.toggleClass(class1, class2)).toBe(elm);
  });
  it(`After toogling, only "${class2}" can be found)`, () => {
    expect(elm.hasClass(class1)).toBe(false);
    expect(elm.hasClass(class2)).toBe(true);
  });
  it(`removeClass("${class2}") must work as well`, () => {
    expect(elm.removeClass(class2)).toBe(elm);
  });
  it(`After removing, no class can be found)`, () => {
    expect(elm.hasClass(class1)).toBe(false);
    expect(elm.hasClass(class2)).toBe(false);
  });
  it(`removeClass(nothing) must return itself too`, () => {
    expect(elm.removeClass()).toBe(elm);
  });

  it(`addClass(cl1, cl2, cl3) must work as well`, () => {
    expect(elm.addClass('cl1', 'cl2', 'cl3')).toBe(elm);
    expect(elm.hasClass('cl1')).toBe(true);
    expect(elm.hasClass('cl2')).toBe(true);
    expect(elm.hasClass('cl3')).toBe(true);
  });
  it(`removeClass(cl1, cl2, cl3) must work as well`, () => {
    expect(elm.removeClass('cl1', 'cl2', 'cl3')).toBe(elm);
    expect(elm.hasClass('cl1')).toBe(false);
    expect(elm.hasClass('cl2')).toBe(false);
    expect(elm.hasClass('cl3')).toBe(false);
  });
});

