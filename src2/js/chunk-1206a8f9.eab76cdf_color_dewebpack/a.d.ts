/**
 * Converts an iterable or array-like object to an array.
 * This is a polyfill for the spread operator (...) functionality.
 * 
 * @module toConsumableArray
 * @description Handles conversion of various iterable types (Arrays, Sets, Maps, TypedArrays, etc.) to native arrays
 * @dependencies
 *  - a745: Array.isArray polyfill
 *  - 67bb: Symbol polyfill
 *  - 5d58: Symbol.iterator polyfill
 *  - 774e: Array.from polyfill
 */

/**
 * Creates a shallow copy of an array or array-like object
 * 
 * @param source - The source array or array-like object to copy
 * @param length - Optional length limit for the output array
 * @returns A new array containing elements from the source
 */
declare function arrayLikeToArray<T>(
  source: ArrayLike<T>,
  length?: number
): T[];

/**
 * Attempts to convert an array to a consumable array (identity function for arrays)
 * 
 * @param array - The array to convert
 * @returns A shallow copy of the array, or undefined if input is not an array
 */
declare function arrayToArray<T>(array: T[]): T[] | undefined;

/**
 * Attempts to convert an iterable object to an array using Symbol.iterator
 * 
 * @param iterable - Any object that implements the iterable protocol
 * @returns An array created from the iterable, or undefined if not iterable
 */
declare function iterableToArray<T>(iterable: Iterable<T>): T[] | undefined;

/**
 * Attempts to convert various unsupported iterable types to arrays
 * Handles: strings, Maps, Sets, Arguments objects, and TypedArrays
 * 
 * @param value - The value to attempt conversion on
 * @param length - Optional length limit for array-like conversions
 * @returns An array representation of the value, or undefined if not convertible
 */
declare function unsupportedIterableToArray<T>(
  value: unknown,
  length?: number
): T[] | undefined;

/**
 * Throws an error when attempting to spread a non-iterable value
 * 
 * @throws {TypeError} Always throws with descriptive message
 */
declare function nonIterableSpread(): never;

/**
 * Converts any iterable or array-like object to a native array.
 * This is the main export that implements spread operator behavior.
 * 
 * Supports:
 * - Native arrays
 * - Iterables (Map, Set, custom iterables)
 * - Array-like objects (Arguments, NodeList, etc.)
 * - Strings
 * - TypedArrays (Uint8Array, Int16Array, etc.)
 * 
 * @template T - The type of elements in the iterable
 * @param iterable - The iterable or array-like object to convert
 * @returns A new array containing all elements from the source
 * @throws {TypeError} If the value is not iterable or array-like
 * 
 * @example
 *