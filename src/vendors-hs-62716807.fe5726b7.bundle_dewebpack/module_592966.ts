interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
}

interface PropertyDescriptorMap {
  [key: string]: PropertyDescriptor;
}

type ObjectLike = Record<string, any>;

/**
 * Defines multiple properties on an object.
 * Polyfill for Object.defineProperties when native support is unavailable.
 */
export function defineProperties(
  target: ObjectLike,
  properties: PropertyDescriptorMap
): ObjectLike {
  const hasNativeSupport = typeof Object.defineProperties === 'function';
  const needsPolyfill = checkIfPolyfillNeeded();

  if (hasNativeSupport && !needsPolyfill) {
    return Object.defineProperties(target, properties);
  }

  validateObject(target);

  const propertyKeys = getOwnPropertyNames(properties);
  const descriptors = getPropertyDescriptors(properties);
  const keyCount = propertyKeys.length;

  for (let index = 0; index < keyCount; index++) {
    const key = propertyKeys[index];
    const descriptor = descriptors[key];
    defineProperty(target, key, descriptor);
  }

  return target;
}

function checkIfPolyfillNeeded(): boolean {
  // Import from module 679675
  return false;
}

function validateObject(obj: any): void {
  // Import from module 742706
  if (obj == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
}

function getPropertyDescriptors(obj: PropertyDescriptorMap): PropertyDescriptorMap {
  // Import from module 954596
  return obj;
}

function getOwnPropertyNames(obj: PropertyDescriptorMap): string[] {
  // Import from module 713049
  return Object.keys(obj);
}

function defineProperty(
  target: ObjectLike,
  key: string,
  descriptor: PropertyDescriptor
): void {
  // Import from module 656378
  Object.defineProperty(target, key, descriptor);
}