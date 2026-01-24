/**
 * Array slice utility module
 * 
 * Provides a type-safe wrapper around the native Array.prototype.slice method.
 * This module exports a curried version of the slice function that can be applied to any array.
 * 
 * @module ArraySliceUtil
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
 */

/**
 * Creates a shallow copy of a portion of an array into a new array object.
 * 
 * @template T - The type of elements in the array
 * @param arr - The source array to slice
 * @param start - Zero-based index at which to start extraction (optional)
 * @param end - Zero-based index before which to end extraction (optional)
 * @returns A new array containing the extracted elements
 * 
 * @example
 *