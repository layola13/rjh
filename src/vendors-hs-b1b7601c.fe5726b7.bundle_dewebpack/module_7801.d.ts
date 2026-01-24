/**
 * Safely retrieves a property value from an object.
 * Returns undefined if the object is null or undefined.
 * 
 * @template T - The type of the object
 * @template K - The key type that extends keyof T
 * @param obj - The object to retrieve the property from
 * @param key - The property key to access
 * @returns The value at the specified key, or undefined if obj is null/undefined
 * 
 * @example
 * const user = { name: 'John', age: 30 };
 * getProperty(user, 'name'); // returns 'John'
 * getProperty(null, 'name'); // returns undefined
 */
declare function getProperty<T extends object, K extends keyof T>(
  obj: T | null | undefined,
  key: K
): T[K] | undefined;

export default getProperty;