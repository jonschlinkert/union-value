/*!
 * union-value <https://github.com/jonschlinkert/union-value>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var union = require('./');

describe('union', function () {
  it('should add a value:', function () {
    var obj = {};
    union(obj, 'foo', ['a', 'b'])
    obj.foo.should.eql(['a', 'b']);
  });

  it('should union a value:', function () {
    var obj = {foo: ['a', 'b']};
    union(obj, 'foo', ['c', 'd', 'e'])
    obj.foo.should.eql(['a', 'b', 'c', 'd', 'e']);
  });

  it('should union a deeply nested value:', function () {
    var obj = {};
    union(obj, 'a.b.c', ['one', 'two']);
    union(obj, 'a.b.c', ['three']);
    obj.a.b.c.should.eql(['one', 'two', 'three']);
  });

  it('should throw an error:', function () {
    (function () {
      union();
    }).should.throw('union-value expects the first argument to be an object.');

    (function () {
      union({});
    }).should.throw('union-value expects `prop` to be a string.');
  });
});
