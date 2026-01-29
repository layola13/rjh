const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

const testObject = { 1: 2 };
const needsPolyfill = getOwnPropertyDescriptor && !propertyIsEnumerable.call(testObject, 1);

export const f = needsPolyfill
  ? function (this: object, propertyKey: PropertyKey): boolean {
      const descriptor = getOwnPropertyDescriptor(this, propertyKey);
      return !!descriptor && descriptor.enumerable;
    }
  : propertyIsEnumerable;