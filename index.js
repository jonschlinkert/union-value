'use strict';

var utils = require('./utils');

module.exports = function unionValue(obj, prop, value) {
  if (!utils.isObject(obj)) {
    throw new TypeError('union-value expects the first argument to be an object.');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('union-value expects `prop` to be a string.');
  }

  var arr = utils.arrayify(utils.get(obj, prop));
  utils.set(obj, prop, utils.union(arr, utils.arrayify(value)));
  return obj;
};
