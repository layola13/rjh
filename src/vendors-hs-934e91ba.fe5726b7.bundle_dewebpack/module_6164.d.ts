/**
 * Iterates over properties of an object and executes a callback for each property.
 * Supports both forward and reverse iteration order.
 * 
 * @template T - The type of the object being iterated
 * @param obj - The object to iterate over
 * @param iteratee - Callback function invoked for each property (value, key, object)
 * @param keysFunc - Function that returns an array of property keys to iterate
 * @param fromRight - If true, iterates from right to left; otherwise left to right
 * @returns The original object
 */
export declare function iterateObject<T extends object>(
  obj: T,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => boolean | void,
  keysFunc: (obj: T) => Array<keyof T>,
  fromRight: boolean
): T;

/**
 * Higher-order function that creates an object iterator with configurable direction.
 * 
 * @param fromRight - Determines iteration direction (true for reverse, false for forward)
 * @returns A function that iterates over object properties
 */
export declare function createObjectIterator(
  fromRight: boolean
): <T extends object>(
  obj: T,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => boolean | void,
  keysFunc: (obj: T) => Array<keyof T>
) => T;