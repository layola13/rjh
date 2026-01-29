import clone from './clone';
import constant from './constant';
import each from './each';
import filter from './filter';
import has from './has';
import isArray from './isArray';
import isEmpty from './isEmpty';
import isFunction from './isFunction';
import isUndefined from './isUndefined';
import keys from './keys';
import map from './map';
import reduce from './reduce';
import size from './size';
import transform from './transform';
import union from './union';
import values from './values';

interface LodashSubset {
  clone: typeof clone;
  constant: typeof constant;
  each: typeof each;
  filter: typeof filter;
  has: typeof has;
  isArray: typeof isArray;
  isEmpty: typeof isEmpty;
  isFunction: typeof isFunction;
  isUndefined: typeof isUndefined;
  keys: typeof keys;
  map: typeof map;
  reduce: typeof reduce;
  size: typeof size;
  transform: typeof transform;
  union: typeof union;
  values: typeof values;
}

let lodashUtils: LodashSubset | undefined;

try {
  lodashUtils = {
    clone,
    constant,
    each,
    filter,
    has,
    isArray,
    isEmpty,
    isFunction,
    isUndefined,
    keys,
    map,
    reduce,
    size,
    transform,
    union,
    values
  };
} catch (error) {
  lodashUtils = undefined;
}

const result: LodashSubset = lodashUtils ?? (window as any)._;

export default result;