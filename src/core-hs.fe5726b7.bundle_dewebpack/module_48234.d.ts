/**
 * Array utility functions for resizing, comparing, and appending arrays.
 * @module ArrayUtils
 */

/**
 * Callback function to initialize new elements when resizing an array.
 * @param index - The index of the element being initialized
 * @returns The value to set at the given index
 */
export type ArrayInitializer<T> = (index: number) => T;

/**
 * Callback function to compare two elements for equality.
 * @param a - The first element to compare
 * @param b - The second element to compare
 * @returns True if the elements are considered equal, false otherwise
 */
export type EqualityComparator<T> = (a: T, b: T) => boolean;

/**
 * Resizes an array to a specified length.
 * If the new length is greater than the current length and an initializer is provided,
 * new elements will be initialized using the initializer function.
 * 
 * @template T - The type of elements in the array
 * @param array - The array to resize
 * @param newLength - The desired length of the array
 * @param initializer - Optional function to initialize new elements
 * @returns The resized array
 * 
 * @example
 *