import baseGetTag from './baseGetTag';
import getToStringTag from './getToStringTag';

const MAP_TAG = '[object Map]';
const PROMISE_TAG = '[object Promise]';
const SET_TAG = '[object Set]';
const WEAK_MAP_TAG = '[object WeakMap]';
const DATA_VIEW_TAG = '[object DataView]';

const dataViewCtorString = getToStringTag(DataView);
const mapCtorString = getToStringTag(Map);
const promiseCtorString = getToStringTag(Promise);
const setCtorString = getToStringTag(Set);
const weakMapCtorString = getToStringTag(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 * Handles native types that have inconsistent toString behavior across environments.
 */
function getTag(value: unknown): string {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  
  const tag = baseGetTag(value);
  
  // Check if native types need manual tag resolution
  if (
    (DataView && baseGetTag(new DataView(new ArrayBuffer(1))) !== DATA_VIEW_TAG) ||
    (Map && baseGetTag(new Map()) !== MAP_TAG) ||
    (Promise && baseGetTag(Promise.resolve()) !== PROMISE_TAG) ||
    (Set && baseGetTag(new Set()) !== SET_TAG) ||
    (WeakMap && baseGetTag(new WeakMap()) !== WEAK_MAP_TAG)
  ) {
    if (tag === '[object Object]') {
      const ctor = (value as object).constructor;
      const ctorString = ctor ? getToStringTag(ctor) : undefined;
      
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return DATA_VIEW_TAG;
          case mapCtorString:
            return MAP_TAG;
          case promiseCtorString:
            return PROMISE_TAG;
          case setCtorString:
            return SET_TAG;
          case weakMapCtorString:
            return WEAK_MAP_TAG;
        }
      }
    }
  }
  
  return tag;
}

export default getTag;