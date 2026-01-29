import cloneArrayBuffer from './cloneArrayBuffer';
import cloneDataView from './cloneDataView';
import cloneRegExp from './cloneRegExp';
import cloneSymbol from './cloneSymbol';
import cloneTypedArray from './cloneTypedArray';

interface CloneableObject {
  constructor: new (...args: any[]) => any;
}

type CloneableTag =
  | '[object ArrayBuffer]'
  | '[object Boolean]'
  | '[object Date]'
  | '[object DataView]'
  | '[object Float32Array]'
  | '[object Float64Array]'
  | '[object Int8Array]'
  | '[object Int16Array]'
  | '[object Int32Array]'
  | '[object Uint8Array]'
  | '[object Uint8ClampedArray]'
  | '[object Uint16Array]'
  | '[object Uint32Array]'
  | '[object Map]'
  | '[object Set]'
  | '[object Number]'
  | '[object String]'
  | '[object RegExp]'
  | '[object Symbol]';

/**
 * Initializes an object clone based on its `toStringTag`.
 */
function initCloneByTag(
  value: CloneableObject,
  tag: CloneableTag,
  isDeep: boolean
): any {
  const Constructor = value.constructor;

  switch (tag) {
    case '[object ArrayBuffer]':
      return cloneArrayBuffer(value as ArrayBuffer);

    case '[object Boolean]':
    case '[object Date]':
      return new Constructor(+value);

    case '[object DataView]':
      return cloneDataView(value as DataView, isDeep);

    case '[object Float32Array]':
    case '[object Float64Array]':
    case '[object Int8Array]':
    case '[object Int16Array]':
    case '[object Int32Array]':
    case '[object Uint8Array]':
    case '[object Uint8ClampedArray]':
    case '[object Uint16Array]':
    case '[object Uint32Array]':
      return cloneTypedArray(value as TypedArray, isDeep);

    case '[object Map]':
    case '[object Set]':
      return new Constructor();

    case '[object Number]':
    case '[object String]':
      return new Constructor(value);

    case '[object RegExp]':
      return cloneRegExp(value as RegExp);

    case '[object Symbol]':
      return cloneSymbol(value as symbol);
  }
}

type TypedArray =
  | Float32Array
  | Float64Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array;

export default initCloneByTag;