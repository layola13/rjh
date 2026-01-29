import typeOf from './194243';
import callBind from './899679';
import getOwnPropertyDescriptor from './199281';

let supportsProtoAccess: boolean;

try {
  supportsProtoAccess = [].__proto__ === Array.prototype;
} catch (error) {
  if (
    !error ||
    typeOf(error) !== 'object' ||
    !('code' in error) ||
    (error as { code: string }).code !== 'ERR_PROTO_ACCESS'
  ) {
    throw error;
  }
}

const protoDescriptor = supportsProtoAccess
  ? getOwnPropertyDescriptor?.(Object.prototype, '__proto__')
  : undefined;

const ObjectConstructor = Object;
const nativeGetPrototypeOf = ObjectConstructor.getPrototypeOf;

/**
 * Gets the prototype of an object using the most reliable method available.
 */
const getPrototype: (obj: unknown) => unknown =
  protoDescriptor && typeof protoDescriptor.get === 'function'
    ? callBind([protoDescriptor.get])
    : typeof nativeGetPrototypeOf === 'function'
    ? (obj: unknown): unknown => {
        return nativeGetPrototypeOf(obj == null ? obj : ObjectConstructor(obj));
      }
    : undefined;

export = getPrototype;