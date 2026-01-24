/**
 * Converts an iterable or array-like object into a true array.
 * 
 * This utility function attempts to convert various iterable types (arrays, array-like objects,
 * iterables with Symbol.iterator) into a proper array using spread operator semantics.
 * 
 * @template T - The type of elements in the iterable
 * @param iterable - The iterable or array-like object to convert
 * @returns A new array containing all elements from the input
 * @throws {TypeError} If the input is not iterable and cannot be converted to an array
 * 
 * @example
 *