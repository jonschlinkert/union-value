'use strict';

require('mocha');
const assert = require('assert');
const union = require('./');

describe('union', () => {
  it('should add a value:', () => {
    let obj = {};
    union(obj, 'foo', ['a', 'b'])
    assert.deepEqual(obj.foo, ['a', 'b']);
  });

  it('should union a value:', () => {
    let obj = {foo: ['a', 'b']};
    union(obj, 'foo', ['c', 'd', 'e'])
    assert.deepEqual(obj.foo, ['a', 'b', 'c', 'd', 'e']);
  });

  it('should union a deeply nested value:', () => {
    let obj = {};
    union(obj, 'a.b.c', ['one', 'two']);
    union(obj, 'a.b.c', ['three']);
    assert.deepEqual(obj.a.b.c, ['one', 'two', 'three']);
  });

  it('should support escaped dots:', () => {
    let obj = {};
    union(obj, 'a\\.b.c', ['one', 'two']);
    union(obj, 'a\\.b.c', ['three']);
    assert.deepEqual(obj['a.b'].c, ['one', 'two', 'three']);
  });

  it('should throw an error:', () => {
    assert.throws(() => union(), /expected the first argument to be an object/);
    assert.throws(() => union({}), /expected the second argument to be a string/);
  });
});
