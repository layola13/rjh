/**
 * Converts an iterable object to an array.
 * 
 * Checks if the input has a Symbol.iterator or @@iterator property,
 * indicating it's iterable, then converts it to an array using Array.from().
 * 
 * @param iterable - The iterable object to convert (e.g., Set, Map, Generator, etc.)
 * @returns An array containing all elements from the iterable, or undefined if not iterable
 * 
 * @example
 *