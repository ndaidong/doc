/**
 * Testing
 * @ndaidong
 */

/* global doc */

describe('Testing doc APIs', () => {

  describe('Overview', () => {

    let keys = [
      'Event',
      'add', 'all', 'create', 'get', 'one', 'ready'
    ];

    let check = (k) => {
      it(`doc.${k} must be defined`, () => {
        expect(doc[k]).toBeDefined();
      });
    };

    keys.map(check);
  });

  describe('doc.create', () => {

    let d = doc.create('DIV');
    it('Created element must have nodeType', () => {
      expect(d.nodeType).toBeDefined();
      d.destroy();
    });
  });

  describe('doc.add', () => {

    let d = doc.add('DIV');
    it('Added element must have nodeType', () => {
      expect(d.nodeType).toBeDefined();
      d.destroy();
    });
  });

  describe('doc.get', () => {

    let d = document.createElement('SPAN');
    d.setAttribute('id', 'domtest');
    d.className = 'noop';
    d.innerHTML = 'Hello world';
    document.body.appendChild(d);

    let el = doc.get('domtest');
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

    describe('Element.setProperty', () => {

      d.setProperty({
        _name: 'Welcome',
        _key: 1234
      });

      it('It must have the attribute "_name"', () => {
        expect(d.hasAttribute('_name')).toBe(true);
      });

      it('It must have the attribute "_key"', () => {
        expect(d.hasAttribute('_key')).toBe(true);
      });

    });

    describe('Element.setStyle', () => {

      d.setStyle({
        color: 'red',
        fontSize: 15,
        backgroundColor: 'green',
        maxWidth: 500,
        'margin-top': '20px'
      });

      it('It must have the expected style', () => {
        let o = d.getAttribute('style');
        expect(o === 'color:red;font-size:15px;background-color:green;max-width:500px;margin-top:20px;').toBe(true);
      });

    });

    describe('Element.query', () => {

      let ul = doc.add('UL', d);
      let li1 = doc.add('LI', ul);
      let li2 = doc.add('LI', ul);
      let li3 = doc.add('LI', ul);

      ul.addClass('noob');

      li1.addClass('noob');
      it('It must find out li1', () => {
        let found = ul.query('.noob');
        expect(found).toBe(li1);
        expect(li2.hasClass('noob')).toBe(false);
        expect(li3.hasClass('noob')).toBe(false);
      });

      ul.destroy();

    });

    describe('Element.queryAll', () => {

      let ul = doc.add('UL', d);
      let li1 = doc.add('LI', ul);
      let li2 = doc.add('LI', ul);
      let li3 = doc.add('LI', ul);

      ul.addClass('noob');

      li1.addClass('noob');
      li3.addClass('noob');
      it('It must find out li1, li3', () => {
        let found = ul.queryAll('.noob');
        expect(found[0]).toBe(li1);
        expect(found[1]).toBe(li3);
        expect(li2.hasClass('noob')).toBe(false);
      });

      ul.destroy();

    });

    afterEach(() => {
      d.destroy();
      el.destroy();
    });
  });

  describe('doc.destroy', () => {

    let d = doc.add('DIV');
    d.id = 'randomid';

    it('Added element must have nodeType', () => {
      let x = document.getElementById('randomid');
      expect(x).toBeDefined();
    });

    it('Added element must be removed', () => {
      d.destroy();
      let x = doc.get('randomid');
      expect(x).toBe(null);
    });

  });

  describe('Test classes handling', () => {

    describe('Element has no class: call .addClass()', () => {

      let el = doc.add('DIV');
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

      let el = doc.add('DIV');
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

      let el = doc.add('DIV');
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

    describe('Element has 2 classes "nano selinium": call .replaceClass("nano", "sila")', () => {

      let el = doc.add('DIV');
      el.addClass('nano selinium');

      el.replaceClass('nano', 'sila');
      it('.replaceClass("nano", "sila"): "nano" gone, "sila" came', () => {
        expect(el.hasClass('nano')).toBe(false);
        expect(el.hasClass('sila')).toBe(true);
        expect(el.hasClass('selinium')).toBe(true);
      });

      afterEach(() => {
        el.destroy();
      });
    });

  });


  describe('Test Event handling', () => {
    describe('doc.Event on & simulate', () => {

      let el = doc.add('DIV');
      let fn;

      beforeEach(() => {
        fn = jasmine.createSpy('func');
        doc.Event.on(el, 'click', fn);
        doc.Event.simulate(el, 'click');
      });

      it('tracks that the spy was called', () => {
        expect(fn).toHaveBeenCalled();
      });

      afterEach(() => {
        el.destroy();
      });
    });

    describe('doc.Event off & simulate', () => {

      let el = doc.add('DIV');
      let fn;

      beforeEach(() => {
        fn = jasmine.createSpy('func');
        doc.Event.on(el, 'click', fn);
        doc.Event.off(el, 'click', fn);
        doc.Event.simulate(el, 'click');
      });

      it('tracks that the spy was not called', () => {
        expect(fn).not.toHaveBeenCalled();
      });

      afterEach(() => {
        el.destroy();
      });
    });
  });

});
