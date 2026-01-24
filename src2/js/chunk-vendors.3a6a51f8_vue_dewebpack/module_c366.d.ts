/**
 * Array search utility module
 * Provides configurable array searching with support for NaN detection
 * 
 * @module ArraySearchUtility
 * @dependencies
 *  - 6821: toIObject - Converts value to indexed object
 *  - 9def: toLength - Converts value to valid array length
 *  - 77f1: toAbsoluteIndex - Converts relative index to absolute position
 */

/**
 * Converts a value to an indexed object (array-like)
 * @param value - The value to convert
 * @returns An indexed object representation
 */
declare function toIObject(value: unknown): Record<number, unknown>;

/**
 * Converts a value to a valid length integer
 * @param value - The value to convert
 * @returns A valid non-negative integer length
 */
declare function toLength(value: unknown): number;

/**
 * Converts a relative index to an absolute array index
 * @param index - The relative index (can be negative)
 * @param length - The array length
 * @returns The absolute index position
 */
declare function toAbsoluteIndex(index: number, length: number): number;

/**
 * Search mode for array searching
 * - true: Returns boolean indicating if value exists (indexOf behavior)
 * - false: Returns index of found element or -1 (includes behavior)
 */
type SearchMode = boolean;

/**
 * Creates an array search function with configurable behavior
 * 
 * @param includesMode - If true, returns boolean; if false, returns index
 * @returns A search function that handles both indexOf and includes semantics
 * 
 * @example
 * const indexOf = createArraySearch(false);
 * indexOf([1, 2, 3], 2, 0); // returns 1
 * 
 * const includes = createArraySearch(true);
 * includes([1, NaN, 3], NaN, 0); // returns true
 */
declare function createArraySearch(includesMode: SearchMode): <T = unknown>(
  target: ArrayLike<T>,
  searchElement: T,
  fromIndex: number
) => number | boolean;

export = createArraySearch;