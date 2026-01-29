import { ObjectTyped } from './types';

const UNDEFINED_HASH = "__lodash_hash_undefined__";
const PLACEHOLDER = "__lodash_placeholder__";

const WRAP_CURRY_FLAG = 8;
const WRAP_CURRY_RIGHT_FLAG = 16;
const WRAP_PARTIAL_FLAG = 32;
const WRAP_PARTIAL_RIGHT_FLAG = 64;
const WRAP_ARY_FLAG = 128;
const WRAP_REARG_FLAG = 256;
const WRAP_FLIP_FLAG = 512;

const INFINITY = 1 / 0;
const MAX_SAFE_INTEGER = 9007199254740991;
const NAN = NaN;
const MAX_ARRAY_LENGTH = 4294967295;

const argsTag = "[object Arguments]";
const arrayTag = "[object Array]";
const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const errorTag = "[object Error]";
const funcTag = "[object Function]";
const genTag = "[object GeneratorFunction]";
const mapTag = "[object Map]";
const numberTag = "[object Number]";
const objectTag = "[object Object]";
const promiseTag = "[object Promise]";
const regexpTag = "[object RegExp]";
const setTag = "[object Set]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const weakMapTag = "[object WeakMap]";
const arrayBufferTag = "[object ArrayBuffer]";
const dataViewTag = "[object DataView]";
const float32Tag = "[object Float32Array]";
const float64Tag = "[object Float64Array]";
const int8Tag = "[object Int8Array]";
const int16Tag = "[object Int16Array]";
const int32Tag = "[object Int32Array]";
const uint8Tag = "[object Uint8Array]";
const uint8ClampedTag = "[object Uint8ClampedArray]";
const uint16Tag = "[object Uint16Array]";
const uint32Tag = "[object Uint32Array]";

const reInterpolate = /<%=([\s\S]+?)%>/g;
const reEscape = /<%-([\s\S]+?)%>/g;
const reEvaluate = /<%([\s\S]+?)%>/g;

const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const reIsPlainProp = /^\w*$/;
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

const reEscapeChar = /\\(\\)?/g;
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
const reHasRegExpChar = RegExp(reRegExpChar.source);

interface Hash<T = any> {
  clear(): void;
  delete(key: string): boolean;
  get(key: string): T | undefined;
  has(key: string): boolean;
  set(key: string, value: T): this;
}

interface ListCache<T = any> {
  clear(): void;
  delete(key: unknown): boolean;
  get(key: unknown): T | undefined;
  has(key: unknown): boolean;
  set(key: unknown, value: T): this;
}

interface MapCache<T = any> {
  clear(): void;
  delete(key: unknown): boolean;
  get(key: unknown): T | undefined;
  has(key: unknown): boolean;
  set(key: unknown, value: T): this;
  size: number;
}

interface Stack<T = any> {
  clear(): void;
  delete(key: unknown): boolean;
  get(key: unknown): T | undefined;
  has(key: unknown): boolean;
  set(key: unknown, value: T): this;
  size: number;
}

function apply<T, R>(
  func: (...args: any[]) => R,
  thisArg: T,
  args: any[]
): R {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

function arrayMap<T, R>(
  array: T[],
  iteratee: (value: T, index: number, array: T[]) => R
): R[] {
  let index = -1;
  const length = array?.length ?? 0;
  const result = new Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

function arrayFilter<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): T[] {
  let index = -1;
  let resIndex = 0;
  const length = array?.length ?? 0;
  const result: T[] = [];

  while (++index < length) {
    const value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

function baseGet<T>(object: any, path: PropertyKey[]): T | undefined {
  let index = 0;
  const length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return index && index === length ? object : undefined;
}

function isObject(value: unknown): value is object {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

function isObjectLike(value: unknown): value is object {
  return value != null && typeof value === 'object';
}

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

function isArray<T = any>(value: unknown): value is T[] {
  return Array.isArray(value);
}

function clone<T>(value: T): T {
  return baseClone(value, false, false);
}

function cloneDeep<T>(value: T): T {
  return baseClone(value, true, true);
}

function baseClone<T>(
  value: T,
  isDeep: boolean,
  isFull: boolean,
  customizer?: (val: any) => any,
  key?: string | number,
  object?: any,
  stack?: Map<any, any>
): T {
  let result: any;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }

  if (!isObject(value)) {
    return value;
  }

  const isArr = isArray(value);
  if (isArr) {
    result = Array.from(value);
    if (!isDeep) {
      return result;
    }
  } else {
    const tag = Object.prototype.toString.call(value);
    const isFunc = tag === funcTag || tag === genTag;

    if (tag === objectTag || tag === argsTag || (isFunc && !object)) {
      result = isFull || isFunc ? {} : Object.create(Object.getPrototypeOf(value));
      if (!isDeep) {
        return Object.assign(result, value);
      }
    } else {
      return object ? value : {};
    }
  }

  stack = stack || new Map();
  const stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  const keysFunc = isFull ? Object.getOwnPropertyNames : Object.keys;
  const props = isArr ? undefined : keysFunc(value);

  (props || value).forEach((subValue: any, key: string | number) => {
    if (props) {
      key = subValue;
      subValue = value[key as keyof typeof value];
    }
    result[key] = baseClone(subValue, isDeep, isFull, customizer, key, value, stack);
  });

  return result;
}

export {
  apply,
  arrayMap,
  arrayFilter,
  baseGet,
  isObject,
  isObjectLike,
  isFunction,
  isArray,
  clone,
  cloneDeep
};