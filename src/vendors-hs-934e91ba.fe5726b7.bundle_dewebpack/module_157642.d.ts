/**
 * Creates a property accessor function that safely retrieves a value from an object.
 * Returns undefined if the input is null or undefined.
 * 
 * @template K - The property key type
 * @param propertyKey - The property key to access on the target object
 * @returns A function that takes an object and returns the value at the specified property key
 * 
 * @example
 * const getName = createPropertyGetter('name');
 * getName({ name: 'John' }); // 'John'
 * getName(null); // undefined
 */
export function createPropertyGetter<K extends PropertyKey>(
  propertyKey: K
): <T extends Record<K, unknown>>(target: T | null | undefined) => T[K] | undefined {
  return function getProperty<T extends Record<K, unknown>>(
    target: T | null | undefined
  ): T[K] | undefined {
    return target?.[propertyKey];
  };
}

export default createPropertyGetter;