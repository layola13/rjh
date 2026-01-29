import getTag from './getTag';
import getPrototypeOf from './getPrototypeOf';
import isObjectLike from './isObjectLike';

const functionProto = Function.prototype;
const objectProto = Object.prototype;
const funcToString = functionProto.toString;
const hasOwnProp = objectProto.hasOwnProperty;
const objectCtorString = funcToString.call(Object);

/**
 * Checks if value is a plain object, that is, an object created by the
 * Object constructor or one with a [[Prototype]] of null.
 *
 * @param value - The value to check
 * @returns Returns true if value is a plain object, else false
 */
export default function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
    return false;
  }
  
  const proto = getPrototypeOf(value);
  
  if (proto === null) {
    return true;
  }
  
  const Ctor = hasOwnProp.call(proto, 'constructor') && proto.constructor;
  
  return typeof Ctor === 'function' && 
         Ctor instanceof Ctor && 
         funcToString.call(Ctor) === objectCtorString;
}