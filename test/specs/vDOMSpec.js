/**
 * Testing
 * @ndaidong
 */

/* global vDOM */

'use strict';

describe('Testing Virtual DOM APIs', () => {

  describe('General', () => {

    let keys = [
      'create', 'get', 'remove'
    ];

    let check = (k) => {
      it(`vDOM must have "${k}" method`, () => {
        expect(vDOM[k]).toBeDefined();
      });
    };

    keys.map(check);
  });

  describe('vDOM.create', () => {

    let keys = [
      'append', 'insert', 'find', 'remove',
      'setEvent', 'removeEvent',
      'setAttribute', 'hasAttribute', 'getAttribute', 'removeAttribute',
      'render'
    ];

    let d = vDOM.create('DIV', {
      class: 'titanium',
      colors: 'red, blue'
    });

    it('Created element must be instance of vDOM.Element class', () => {
      expect(d).toEqual(jasmine.any(vDOM.Element));
    });

    let check = (k) => {
      it(`Created element must have "${k}" method`, () => {
        expect(d[k]).toBeDefined();
      });
    };

    keys.map(check);

    it('Created element must have property "class"', () => {
      expect(d.hasAttribute('class')).toBe(true);
    });
    it('And value of class must be "titanium"', () => {
      expect(d.getAttribute('class')).toBe('titanium');
    });
    it('Created element must have property "colors"', () => {
      expect(d.hasAttribute('colors')).toBe(true);
    });
    it('And value of colors must be "red, blue"', () => {
      expect(d.getAttribute('colors')).toBe('red, blue');
    });

    let g = d.append('SPAN');
    it('From parent, find an item must be returned it', () => {
      expect(d.find(g.tagId)).toBe(g);
      keys.forEach((k) => {
        it(`Created element must have "${k}" method`, () => {
          expect(g[k]).toBeDefined();
        });
      });
    });

  });

});
