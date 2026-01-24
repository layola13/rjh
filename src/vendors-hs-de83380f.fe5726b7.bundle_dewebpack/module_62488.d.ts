/**
 * Converts an iterable object to an array.
 * 
 * This utility checks if the input is iterable (has Symbol.iterator or @@iterator)
 * and converts it to an array using Array.from(). This is typically used as a
 * polyfill helper for spread operations on iterables.
 * 
 * @param iterable - The iterable object to convert (e.g., Set, Map, NodeList, etc.)
 * @returns An array containing all elements from the iterable, or undefined if not iterable
 * 
 * @example
 *