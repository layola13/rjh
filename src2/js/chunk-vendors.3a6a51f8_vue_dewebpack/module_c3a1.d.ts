/**
 * Object.keys polyfill module
 * 
 * Provides a fallback implementation for Object.keys when not natively available.
 * Returns an array of a given object's own enumerable property names.
 * 
 * @module ObjectKeysPolyfill
 */

/**
 * Returns an array of a given object's own enumerable string-keyed property names.
 * 
 * @template T - The type of the object
 * @param target - The object whose enumerable own properties are to be returned
 * @returns An array of strings representing the object's own enumerable property names
 * 
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const keys = objectKeys(obj); // ['a', 'b', 'c']
 * 
 * @remarks
 * This is a polyfill implementation that delegates to the native Object.keys when available.
 * If Object.keys is not natively supported, it falls back to a custom implementation
 * that filters object properties based on specific criteria.
 */
declare function objectKeys<T extends object>(target: T): Array<keyof T & string>;

export = objectKeys;