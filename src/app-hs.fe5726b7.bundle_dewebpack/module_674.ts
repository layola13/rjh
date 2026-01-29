import getBaseType from './7943';
import toSource from './7262';
import DataView from './4987';
import Map from './4718';
import Promise from './3129';
import Set from './9116';
import WeakMap from './1722';

const MAP_TAG = '[object Map]';
const PROMISE_TAG = '[object Promise]';
const SET_TAG = '[object Set]';
const WEAK_MAP_TAG = '[object WeakMap]';
const DATA_VIEW_TAG = '[object DataView]';

const dataViewCtorString = toSource(DataView);
const mapCtorString = toSource(Map);
const promiseCtorString = toSource(Promise);
const setCtorString = toSource(Set);
const weakMapCtorString = toSource(WeakMap);

let getTag = getBaseType;

const hasNativeConstructors =
  (DataView && getTag(new DataView(new ArrayBuffer(1))) !== DATA_VIEW_TAG) ||
  (Map && getTag(new Map()) !== MAP_TAG) ||
  (Promise && getTag(Promise.resolve()) !== PROMISE_TAG) ||
  (Set && getTag(new Set()) !== SET_TAG) ||
  (WeakMap && getTag(new WeakMap()) !== WEAK_MAP_TAG);

if (hasNativeConstructors) {
  getTag = function(value: unknown): string {
    const baseTag = getBaseType(value);
    const objectTag = '[object Object]';
    
    if (baseTag !== objectTag) {
      return baseTag;
    }

    const ctor = (value as Record<string, unknown>)?.constructor;
    const ctorString = ctor ? toSource(ctor) : '';

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

    return baseTag;
  };
}

export default getTag;