import { Stack } from './Stack';
import { arrayEach } from './arrayEach';
import { assignValue } from './assignValue';
import { baseAssign } from './baseAssign';
import { baseAssignIn } from './baseAssignIn';
import { cloneBuffer } from './cloneBuffer';
import { copyArray } from './copyArray';
import { copySymbols } from './copySymbols';
import { copySymbolsIn } from './copySymbolsIn';
import { getAllKeys } from './getAllKeys';
import { getAllKeysIn } from './getAllKeysIn';
import { getTag } from './getTag';
import { initCloneArray } from './initCloneArray';
import { initCloneByTag } from './initCloneByTag';
import { initCloneObject } from './initCloneObject';
import { isArray } from './isArray';
import { isBuffer } from './isBuffer';
import { isMap } from './isMap';
import { isObject } from './isObject';
import { isSet } from './isSet';
import { keys } from './keys';
import { keysIn } from './keysIn';

const CLONE_DEEP_FLAG = 1;
const CLONE_FLAT_FLAG = 2;
const CLONE_SYMBOLS_FLAG = 4;

const ARGUMENTS_TAG = '[object Arguments]';
const ARRAY_TAG = '[object Array]';
const ARRAY_BUFFER_TAG = '[object ArrayBuffer]';
const DATA_VIEW_TAG = '[object DataView]';
const BOOLEAN_TAG = '[object Boolean]';
const DATE_TAG = '[object Date]';
const ERROR_TAG = '[object Error]';
const FUNCTION_TAG = '[object Function]';
const GENERATOR_FUNCTION_TAG = '[object GeneratorFunction]';
const MAP_TAG = '[object Map]';
const NUMBER_TAG = '[object Number]';
const OBJECT_TAG = '[object Object]';
const REGEXP_TAG = '[object RegExp]';
const SET_TAG = '[object Set]';
const STRING_TAG = '[object String]';
const SYMBOL_TAG = '[object Symbol]';
const WEAK_MAP_TAG = '[object WeakMap]';
const FLOAT32_ARRAY_TAG = '[object Float32Array]';
const FLOAT64_ARRAY_TAG = '[object Float64Array]';
const INT8_ARRAY_TAG = '[object Int8Array]';
const INT16_ARRAY_TAG = '[object Int16Array]';
const INT32_ARRAY_TAG = '[object Int32Array]';
const UINT8_ARRAY_TAG = '[object Uint8Array]';
const UINT8_CLAMPED_ARRAY_TAG = '[object Uint8ClampedArray]';
const UINT16_ARRAY_TAG = '[object Uint16Array]';
const UINT32_ARRAY_TAG = '[object Uint32Array]';

const cloneableTags: Record<string, boolean> = {
  [ARGUMENTS_TAG]: true,
  [ARRAY_TAG]: true,
  [ARRAY_BUFFER_TAG]: true,
  [DATA_VIEW_TAG]: true,
  [BOOLEAN_TAG]: true,
  [DATE_TAG]: true,
  [FLOAT32_ARRAY_TAG]: true,
  [FLOAT64_ARRAY_TAG]: true,
  [INT8_ARRAY_TAG]: true,
  [INT16_ARRAY_TAG]: true,
  [INT32_ARRAY_TAG]: true,
  [MAP_TAG]: true,
  [NUMBER_TAG]: true,
  [OBJECT_TAG]: true,
  [REGEXP_TAG]: true,
  [SET_TAG]: true,
  [STRING_TAG]: true,
  [SYMBOL_TAG]: true,
  [UINT8_ARRAY_TAG]: true,
  [UINT8_CLAMPED_ARRAY_TAG]: true,
  [UINT16_ARRAY_TAG]: true,
  [UINT32_ARRAY_TAG]: true,
  [ERROR_TAG]: false,
  [FUNCTION_TAG]: false,
  [WEAK_MAP_TAG]: false
};

type CustomizerFunction = (value: any, key?: string | number, object?: any, stack?: Stack) => any;

/**
 * The base implementation of `clone` and `cloneDeep` which tracks traversed objects.
 *
 * @param value The value to clone.
 * @param bitmask The bitmask flags (1: deep clone, 2: flatten inherited, 4: clone symbols).
 * @param customizer The function to customize cloning.
 * @param key The key of `value`.
 * @param object The parent object of `value`.
 * @param stack Tracks traversed objects and their clone counterparts.
 * @returns Returns the cloned value.
 */
function baseClone<T>(
  value: T,
  bitmask: number,
  customizer?: CustomizerFunction,
  key?: string | number,
  object?: any,
  stack?: Stack
): T {
  let result: any;
  const isDeep = (bitmask & CLONE_DEEP_FLAG) !== 0;
  const isFlat = (bitmask & CLONE_FLAT_FLAG) !== 0;
  const isFull = (bitmask & CLONE_SYMBOLS_FLAG) !== 0;

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
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    const tag = getTag(value);
    const isFunc = tag === FUNCTION_TAG || tag === GENERATOR_FUNCTION_TAG;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }

    if (tag === OBJECT_TAG || tag === ARGUMENTS_TAG || (isFunc && !object)) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }

  stack = stack || new Stack();
  const stacked = stack.get(value);

  if (stacked) {
    return stacked;
  }

  stack.set(value, result);

  if (isSet(value)) {
    value.forEach((subValue: any) => {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach((subValue: any, mapKey: any) => {
      result.set(mapKey, baseClone(subValue, bitmask, customizer, mapKey, value, stack));
    });
  }

  const keysFunc = isFull
    ? isFlat
      ? getAllKeysIn
      : getAllKeys
    : isFlat
    ? keysIn
    : keys;

  const props = isArr ? undefined : keysFunc(value);

  arrayEach(props || value, (subValue: any, propKey: string | number) => {
    if (props) {
      propKey = subValue;
      subValue = value[propKey];
    }
    assignValue(result, propKey, baseClone(subValue, bitmask, customizer, propKey, value, stack));
  });

  return result;
}

export { baseClone };