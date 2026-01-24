/**
 * Extracts a specified number of elements from an iterable object.
 * This is a helper function that implements iterator slicing functionality,
 * commonly used in transpiled code to support array destructuring with limits.
 * 
 * @param iterable - The iterable object to extract elements from (must have Symbol.iterator or @@iterator)
 * @param count - The maximum number of elements to extract from the iterator
 * @returns An array containing up to `count` elements from the iterable
 * 
 * @example
 *