/**
 * Array.prototype.unshift polyfill module
 * 
 * Provides a spec-compliant implementation of Array.prototype.unshift that handles:
 * - Non-writable length properties
 * - Proper element shifting for sparse arrays
 * - Correct return value (new array length)
 * 
 * @module ArrayUnshiftPolyfill
 */

/**
 * Converts a value to an object
 * @param value - The value to convert to an object
 * @returns The converted object
 */
declare function toObject(value: unknown): object;

/**
 * Gets the length property of an array-like object
 * @param arrayLike - The array-like object
 * @returns The length of the array-like object
 */
declare function toLength(arrayLike: ArrayLike<unknown>): number;

/**
 * Sets the length property of an array-like object
 * @param arrayLike - The array-like object
 * @param newLength - The new length value
 */
declare function setLength(arrayLike: object, newLength: number): number;

/**
 * Deletes a property from an object
 * @param target - The target object
 * @param property - The property key to delete
 */
declare function deleteProperty(target: object, property: PropertyKey): void;

/**
 * Validates that the new length doesn't exceed the maximum safe array length
 * @param length - The length to validate
 * @throws {RangeError} If length exceeds maximum safe array length
 */
declare function validateLength(length: number): void;

/**
 * Polyfilled unshift method for Array.prototype
 * 
 * Adds one or more elements to the beginning of an array and returns the new length.
 * This implementation handles edge cases not properly supported in some environments:
 * - Arrays with non-writable length properties
 * - Sparse arrays (arrays with gaps)
 * 
 * @template T - The type of elements in the array
 * @param this - The array-like object to modify
 * @param items - The elements to add to the beginning of the array
 * @returns The new length of the array after adding the elements
 * 
 * @example
 * const arr = [3, 4, 5];
 * const newLength = arr.unshift(1, 2);
 * console.log(arr); // [1, 2, 3, 4, 5]
 * console.log(newLength); // 5
 */
declare function unshift<T>(this: ArrayLike<T> & object, ...items: T[]): number;

/**
 * Module exports interface
 */
export interface ArrayUnshiftPolyfill {
  /**
   * The polyfilled unshift method
   */
  unshift: typeof unshift;
}

/**
 * Polyfill configuration
 */
export interface PolyfillConfig {
  /**
   * The target object to polyfill (Array)
   */
  target: "Array";
  
  /**
   * Whether to add to the prototype
   */
  proto: true;
  
  /**
   * The arity (expected argument count) of the function
   */
  arity: 1;
  
  /**
   * Whether the polyfill is forced (bypasses native implementation check)
   */
  forced: boolean;
}

export {};