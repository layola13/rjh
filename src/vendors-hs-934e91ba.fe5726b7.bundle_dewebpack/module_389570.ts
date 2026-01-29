import getTag from './getTag';
import isLength from './isLength';
import isObjectLike from './isObjectLike';

const TYPED_ARRAY_TAGS: Record<string, boolean> = {
  '[object Float32Array]': true,
  '[object Float64Array]': true,
  '[object Int8Array]': true,
  '[object Int16Array]': true,
  '[object Int32Array]': true,
  '[object Uint8Array]': true,
  '[object Uint8ClampedArray]': true,
  '[object Uint16Array]': true,
  '[object Uint32Array]': true,
  '[object Arguments]': false,
  '[object Array]': false,
  '[object ArrayBuffer]': false,
  '[object Boolean]': false,
  '[object DataView]': false,
  '[object Date]': false,
  '[object Error]': false,
  '[object Function]': false,
  '[object Map]': false,
  '[object Number]': false,
  '[object Object]': false,
  '[object RegExp]': false,
  '[object Set]': false,
  '[object String]': false,
  '[object WeakMap]': false
};

/**
 * Checks if value is classified as a typed array.
 * 
 * @param value - The value to check
 * @returns Returns true if value is a typed array, else false
 */
export default function isTypedArray(value: unknown): value is 
  | Float32Array 
  | Float64Array 
  | Int8Array 
  | Int16Array 
  | Int32Array 
  | Uint8Array 
  | Uint8ClampedArray 
  | Uint16Array 
  | Uint32Array {
  return isObjectLike(value) && isLength((value as any).length) && !!TYPED_ARRAY_TAGS[getTag(value)];
}