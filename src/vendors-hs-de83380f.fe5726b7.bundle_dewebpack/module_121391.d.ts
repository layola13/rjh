/**
 * Converts array-like objects to arrays with optional length limiting.
 * Handles Map, Set, Arguments, and TypedArray instances.
 * 
 * @param value - The array-like object to convert
 * @param maxLength - Optional maximum length to limit the resulting array
 * @returns An array representation of the input, or undefined if conversion is not possible
 */
export default function arrayLikeToArray<T = unknown>(
  value: ArrayLike<T> | Iterable<T> | null | undefined,
  maxLength?: number
): T[] | undefined;

/**
 * Helper function that performs the actual array conversion with length limiting.
 * This corresponds to the imported module (699934).
 * 
 * @param arrayLike - The array-like object to convert
 * @param length - Optional maximum number of elements to include
 * @returns A new array containing elements from the input
 */
declare function unsafeArrayFrom<T>(
  arrayLike: ArrayLike<T>,
  length?: number
): T[];