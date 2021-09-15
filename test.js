import { deepEqual, throws } from 'node:assert';
import 'mocha';
import union from './index.js';

describe('union', () => {
  it('should add a value:', () => {
    let obj = {};
    union(obj, 'foo', ['a', 'b'])
    deepEqual(obj.foo, ['a', 'b']);
  });

  it('should union a value:', () => {
    let obj = {foo: ['a', 'b']};
    union(obj, 'foo', ['c', 'd', 'e'])
    deepEqual(obj.foo, ['a', 'b', 'c', 'd', 'e']);
  });

  it('should union a deeply nested value:', () => {
    let obj = {};
    union(obj, 'a.b.c', ['one', 'two']);
    union(obj, 'a.b.c', ['three']);
    deepEqual(obj.a.b.c, ['one', 'two', 'three']);
  });

  it('should support escaped dots:', () => {
    let obj = {};
    union(obj, 'a\\.b.c', ['one', 'two']);
    union(obj, 'a\\.b.c', ['three']);
    deepEqual(obj['a.b'].c, ['one', 'two', 'three']);
  });

  it('should throw an error:', () => {
    throws(() => union(), /expected the first argument to be an object/);
    throws(() => union({}), /expected the second argument to be a string/);
  });
});
