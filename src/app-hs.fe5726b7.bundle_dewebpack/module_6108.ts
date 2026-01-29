import cloneArrayBuffer from './cloneArrayBuffer';
import cloneDataView from './cloneDataView';
import cloneRegExp from './cloneRegExp';
import cloneSymbol from './cloneSymbol';
import cloneTypedArray from './cloneTypedArray';

type CloneableConstructor = 
  | ArrayBufferConstructor
  | BooleanConstructor
  | DateConstructor
  | DataViewConstructor
  | TypedArrayConstructor
  | MapConstructor
  | SetConstructor
  | NumberConstructor
  | StringConstructor
  | RegExpConstructor
  | SymbolConstructor;

type TypedArrayConstructor =
  | Float32ArrayConstructor
  | Float64ArrayConstructor
  | Int8ArrayConstructor
  | Int16ArrayConstructor
  | Int32ArrayConstructor
  | Uint8ArrayConstructor
  | Uint8ClampedArrayConstructor
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor;

interface CloneableObject {
  constructor: CloneableConstructor;
}

const OBJECT_ARRAY_BUFFER = '[object ArrayBuffer]';
const OBJECT_BOOLEAN = '[object Boolean]';
const OBJECT_DATE = '[object Date]';
const OBJECT_DATA_VIEW = '[object DataView]';
const OBJECT_FLOAT32_ARRAY = '[object Float32Array]';
const OBJECT_FLOAT64_ARRAY = '[object Float64Array]';
const OBJECT_INT8_ARRAY = '[object Int8Array]';
const OBJECT_INT16_ARRAY = '[object Int16Array]';
const OBJECT_INT32_ARRAY = '[object Int32Array]';
const OBJECT_UINT8_ARRAY = '[object Uint8Array]';
const OBJECT_UINT8_CLAMPED_ARRAY = '[object Uint8ClampedArray]';
const OBJECT_UINT16_ARRAY = '[object Uint16Array]';
const OBJECT_UINT32_ARRAY = '[object Uint32Array]';
const OBJECT_MAP = '[object Map]';
const OBJECT_SET = '[object Set]';
const OBJECT_NUMBER = '[object Number]';
const OBJECT_STRING = '[object String]';
const OBJECT_REGEXP = '[object RegExp]';
const OBJECT_SYMBOL = '[object Symbol]';

/**
 * Clones an object by type tag using the appropriate cloning strategy.
 * 
 * @param object - The object to clone
 * @param typeTag - The object type tag (e.g., '[object Date]')
 * @param isDeep - Whether to perform a deep clone
 * @returns A cloned instance of the object
 */
function cloneByTypeTag(object: CloneableObject, typeTag: string, isDeep: boolean): unknown {
  const Constructor = object.constructor as any;

  switch (typeTag) {
    case OBJECT_ARRAY_BUFFER:
      return cloneArrayBuffer(object as ArrayBuffer);
    
    case OBJECT_BOOLEAN:
    case OBJECT_DATE:
      return new Constructor(+object);
    
    case OBJECT_DATA_VIEW:
      return cloneDataView(object as DataView, isDeep);
    
    case OBJECT_FLOAT32_ARRAY:
    case OBJECT_FLOAT64_ARRAY:
    case OBJECT_INT8_ARRAY:
    case OBJECT_INT16_ARRAY:
    case OBJECT_INT32_ARRAY:
    case OBJECT_UINT8_ARRAY:
    case OBJECT_UINT8_CLAMPED_ARRAY:
    case OBJECT_UINT16_ARRAY:
    case OBJECT_UINT32_ARRAY:
      return cloneTypedArray(object as TypedArray, isDeep);
    
    case OBJECT_MAP:
    case OBJECT_SET:
      return new Constructor();
    
    case OBJECT_NUMBER:
    case OBJECT_STRING:
      return new Constructor(object);
    
    case OBJECT_REGEXP:
      return cloneRegExp(object as RegExp);
    
    case OBJECT_SYMBOL:
      return cloneSymbol(object as symbol);
    
    default:
      return undefined;
  }
}

export default cloneByTypeTag;

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