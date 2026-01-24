/**
 * Converts an iterable value to an array.
 * This is a utility function that handles various iterable types including:
 * - Arrays
 * - Array-like objects (e.g., NodeList, arguments)
 * - Iterables (e.g., Set, Map, String)
 * 
 * @template T - The type of elements in the iterable
 * @param value - The value to convert to an array
 * @returns An array containing the elements from the input value
 * @throws {TypeError} If the value is not iterable and cannot be converted to an array
 */
export default function toArray<T = unknown>(value: Iterable<T> | ArrayLike<T>): T[];

/**
 * Named export for compatibility
 */
export function toArray<T = unknown>(value: Iterable<T> | ArrayLike<T>): T[];