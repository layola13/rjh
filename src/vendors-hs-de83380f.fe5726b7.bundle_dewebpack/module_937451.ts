/**
 * Gets a property value from an object or its prototype chain.
 * Polyfill for Reflect.get with prototype chain traversal support.
 * 
 * @param target - The target object
 * @param propertyKey - The property key to retrieve
 * @param receiver - The value of 'this' for getter calls
 * @returns The property value
 */
function get<T = unknown>(
  target: object,
  propertyKey: PropertyKey,
  receiver?: unknown
): T | undefined {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    return Reflect.get(target, propertyKey, receiver);
  }

  const owner = findPropertyOwner(target, propertyKey);
  
  if (!owner) {
    return undefined;
  }

  const descriptor = Object.getOwnPropertyDescriptor(owner, propertyKey);
  
  if (!descriptor) {
    return undefined;
  }

  if (descriptor.get) {
    const context = arguments.length < 3 ? target : receiver;
    return descriptor.get.call(context);
  }

  return descriptor.value;
}

/**
 * Traverses the prototype chain to find the object that owns a property.
 * 
 * @param target - The starting object
 * @param propertyKey - The property key to search for
 * @returns The object that owns the property, or null if not found
 */
function findPropertyOwner(
  target: object,
  propertyKey: PropertyKey
): object | null {
  let current: object | null = target;

  while (current !== null) {
    if (Object.prototype.hasOwnProperty.call(current, propertyKey)) {
      return current;
    }
    current = Object.getPrototypeOf(current);
  }

  return null;
}

export default get;