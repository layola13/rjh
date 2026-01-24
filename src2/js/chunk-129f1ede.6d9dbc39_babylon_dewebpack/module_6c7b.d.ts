/**
 * Array.prototype.fill() polyfill module
 * 
 * This module extends the Array prototype with the fill() method,
 * which fills all the elements of an array from a start index to an end index with a static value.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
 */

/**
 * Fills all the elements of an array from a start index to an end index with a static value.
 * The end index is not included.
 * 
 * @template T - The type of elements in the array
 * @param value - Value to fill the array with
 * @param start - Start index (default: 0)
 * @param end - End index (default: array.length)
 * @returns The modified array
 * 
 * @example
 *