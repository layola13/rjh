function getPrototypeOf(obj: any): any | null {
  if (obj == null) {
    return null;
  }
  
  if (typeof Object.getPrototypeOf === 'function') {
    return Object.getPrototypeOf(obj);
  }
  
  // Fallback for older environments
  if (obj.__proto__ !== undefined) {
    return obj.__proto__;
  }
  
  // Fallback using constructor
  if (obj.constructor && obj.constructor.prototype) {
    return obj.constructor.prototype;
  }
  
  return null;
}

/**
 * Traverses the prototype chain to find an object that has the specified property.
 * @param obj - The object to start searching from
 * @param propertyKey - The property key to search for
 * @returns The object in the prototype chain that owns the property, or null if not found
 */
function findPropertyOwner(obj: any, propertyKey: string | symbol): any | null {
  let current = obj;
  
  while (current !== null && !Object.prototype.hasOwnProperty.call(current, propertyKey)) {
    current = getPrototypeOf(current);
  }
  
  return current;
}

export default findPropertyOwner;