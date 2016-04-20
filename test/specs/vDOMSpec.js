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
    [
      'append', 'insert', 'remove',
      'setEvent', 'removeEvent',
      'setAttribute', 'hasAttribute', 'removeAttribute',
      'render'
    ].map(check);

  });

});
