const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

const testObject = { 1: 2 };
const descriptor = getOwnPropertyDescriptor(testObject, '1');
const needsPolyfill = descriptor && !propertyIsEnumerable.call(testObject, '1');

export const f = needsPolyfill
  ? function (key: PropertyKey): boolean {
      const descriptor = getOwnPropertyDescriptor(this, key);
      return !!descriptor && descriptor.enumerable;
    }
  : propertyIsEnumerable;