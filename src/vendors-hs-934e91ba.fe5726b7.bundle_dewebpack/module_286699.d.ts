/**
 * Creates a property accessor function that safely retrieves a property value from an object.
 * Returns undefined if the object is null or undefined.
 * 
 * @template T - The type of the object being accessed
 * @template K - The key type of the property being accessed
 * @param obj - The object to access properties from
 * @returns A function that takes a property key and returns the corresponding value or undefined
 * 
 * @example
 * const user = { name: 'John', age: 30 };
 * const getProperty = createPropertyAccessor(user);
 * console.log(getProperty('name')); // 'John'
 * 
 * const nullObj = null;
 * const safeAccessor = createPropertyAccessor(nullObj);
 * console.log(safeAccessor('name')); // undefined
 */
export function createPropertyAccessor<T extends Record<string | number | symbol, unknown>>(
  obj: T | null | undefined
): <K extends keyof T>(key: K) => T[K] | undefined {
  return function<K extends keyof T>(key: K): T[K] | undefined {
    return obj?.[key];
  };
}

export default createPropertyAccessor;