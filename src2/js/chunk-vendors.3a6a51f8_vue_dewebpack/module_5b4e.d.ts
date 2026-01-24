/**
 * Array search utility module
 * Provides indexOf/includes functionality with NaN handling
 * 
 * Dependencies:
 * - 36c3: toIndexedObject - Converts value to indexed object
 * - b447: lengthOfArrayLike - Gets array-like length
 * - 0fc9: toAbsoluteIndex - Converts relative index to absolute
 */

/**
 * Creates an array search function with configurable behavior
 * 
 * @param includeMode - If true, returns boolean for includes(); if false, returns index for indexOf()
 * @returns Search function that finds elements in array-like objects
 */
declare function createArraySearchMethod(
  includeMode: boolean
): <T = unknown>(
  target: ArrayLike<T>,
  searchElement: T,
  fromIndex?: number
) => boolean | number;

/**
 * Array search function returned by createArraySearchMethod
 * 
 * @template T - Type of array elements
 * @param target - Array-like object to search in
 * @param searchElement - Element to search for
 * @param fromIndex - Optional starting index (default: 0)
 * @returns For includes mode: true if found, false otherwise
 *          For indexOf mode: index if found, -1 otherwise
 */
interface ArraySearchFunction {
  <T = unknown>(
    target: ArrayLike<T>,
    searchElement: T,
    fromIndex?: number
  ): boolean | number;
}

/**
 * Converts value to indexed object (from module 36c3)
 */
declare function toIndexedObject<T = unknown>(value: unknown): ArrayLike<T>;

/**
 * Gets the length of an array-like object (from module b447)
 */
declare function lengthOfArrayLike(arrayLike: ArrayLike<unknown>): number;

/**
 * Converts relative index to absolute index (from module 0fc9)
 * 
 * @param index - Relative index (can be negative)
 * @param length - Length of the array
 * @returns Absolute index clamped to valid range
 */
declare function toAbsoluteIndex(index: number, length: number): number;

export = createArraySearchMethod;