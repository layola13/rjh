import baseGetTag from './baseGetTag';
import toSource from './toSource';

const mapTag = '[object Map]';
const promiseTag = '[object Promise]';
const setTag = '[object Set]';
const weakMapTag = '[object WeakMap]';
const dataViewTag = '[object DataView]';

interface Constructor {
  new (...args: any[]): any;
}

const dataViewCtorString = toSource(DataView);
const mapCtorString = toSource(Map);
const promiseCtorString = toSource(Promise);
const setCtorString = toSource(Set);
const weakMapCtorString = toSource(WeakMap);

let getTag = baseGetTag;

if (
  (DataView && getTag(new DataView(new ArrayBuffer(1))) !== dataViewTag) ||
  (Map && getTag(new Map()) !== mapTag) ||
  (Promise && getTag(Promise.resolve()) !== promiseTag) ||
  (Set && getTag(new Set()) !== setTag) ||
  (WeakMap && getTag(new WeakMap()) !== weakMapTag)
) {
  getTag = function(value: unknown): string {
    const result = baseGetTag(value);
    const ctor: Constructor | undefined = result === '[object Object]' 
      ? (value as any)?.constructor 
      : undefined;
    const ctorString = ctor ? toSource(ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag;
        case weakMapCtorString:
          return weakMapTag;
      }
    }

    return result;
  };
}

export default getTag;