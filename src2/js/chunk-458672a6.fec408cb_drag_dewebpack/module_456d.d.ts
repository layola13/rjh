/**
 * Object.keys polyfill module
 * 
 * Provides a cross-browser compatible implementation of Object.keys
 * that converts an object to an array of its enumerable property names.
 * 
 * @module ObjectKeysPolyfill
 */

/**
 * Converts an object to its required object form (handles primitives)
 * @param value - The value to convert to an object
 * @returns The value converted to an object
 */
declare function toObject(value: unknown): object;

/**
 * Gets all enumerable own property names of an object
 * @param obj - The object to get keys from
 * @returns Array of property names
 */
declare function getObjectKeys(obj: object): string[];

/**
 * Defines or polyfills the Object.keys method
 * @param methodName - The name of the method to polyfill (e.g., "keys")
 * @param implementation - Factory function that returns the polyfill implementation
 */
declare function definePolyfill(
  methodName: string,
  implementation: () => (target: unknown) => string[]
): void;

/**
 * Object.keys implementation
 * Returns an array of a given object's own enumerable property names
 * 
 * @param target - The object whose enumerable own properties are to be returned
 * @returns An array of strings representing all the enumerable properties of the given object
 * 
 * @example
 *