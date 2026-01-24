/**
 * ES6 Array.from polyfill module
 * 
 * This module provides a polyfill for the ES6 Array.from() method,
 * which creates a new Array instance from an array-like or iterable object.
 * 
 * @module ArrayFromPolyfill
 */

/**
 * Creates a new Array instance from an array-like or iterable object.
 * 
 * @template T - The type of elements in the resulting array
 * @template U - The type after mapping (if mapFn is provided)
 * 
 * @param arrayLike - An array-like or iterable object to convert to an array
 * @param mapFn - Optional map function to call on every element of the array
 * @param thisArg - Optional value to use as `this` when executing mapFn
 * 
 * @returns A new Array instance
 * 
 * @example
 *