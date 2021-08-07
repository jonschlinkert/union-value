import get from 'get-value';
import set from 'set-value';

const isObject = val => {
  return val != null && typeof val === 'object' && !Array.isArray(val);
};

const union = (...args) => [...new Set([...args].flat())];
const first = (...args) => args.find(v => v != null);

export default (obj, prop, value) => {
  if (!isObject(obj)) {
    throw new TypeError('expected the first argument to be an object');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('expected the second argument to be a string');
  }

  const arr = [].concat(first(get(obj, prop), []));
  set(obj, prop, union(arr, [].concat(first(value, []))));
  return obj;
};
