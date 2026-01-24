/**
 * Array search utility module
 * Provides a higher-order function for creating array search operations
 * 
 * @module ArraySearchFactory
 * @dependencies
 *   - toIndexedObject: Converts value to indexed object (6821)
 *   - toLength: Converts value to valid array length (9def)
 *   - toAbsoluteIndex: Converts relative index to absolute position (77f1)
 */

/**
 * Converts a value to an indexed object (array-like object with numeric indices)
 */
declare function toIndexedObject<T = unknown>(value: unknown): Record<number, T> & { length: number };

/**
 * Converts a value to a valid array length (non-negative integer)
 */
declare function toLength(value: unknown): number;

/**
 * Converts a relative index to an absolute position within array bounds
 * @param index - The index to convert (can be negative)
 * @param length - The length of the array
 */
declare function toAbsoluteIndex(index: number, length: number): number;

/**
 * Search operation mode
 * @param strict - If true, performs strict search behavior (returns index or true/false)
 *                 If false, performs indexOf-like behavior (returns index or -1)
 */
type SearchMode = boolean;

/**
 * Creates an array search function with configurable behavior
 * 
 * @param strict - When true, returns boolean for found/not found.
 *                 When false, returns numeric index or -1.
 * @returns A search function that can find elements in array-like objects
 * 
 * @example
 * // Create indexOf-like function
 * const indexOf = createArraySearch(false);
 * indexOf([1, 2, 3], 2, 0); // returns 1
 * 
 * @example
 * // Create includes-like function
 * const includes = createArraySearch(true);
 * includes([1, NaN, 3], NaN, 0); // returns true (handles NaN correctly)
 */
declare function createArraySearch(strict: SearchMode): <T>(
  target: ArrayLike<T>,
  searchElement: T,
  fromIndex: number
) => boolean | number;

/**
 * Search function returned by createArraySearch
 * 
 * @template T - The type of elements in the array
 * @param target - The array-like object to search in
 * @param searchElement - The element to search for
 * @param fromIndex - The index to start searching from
 * @returns In strict mode: true if found, false otherwise
 *          In non-strict mode: index if found, -1 otherwise
 */
type ArraySearchFunction = <T>(
  target: ArrayLike<T>,
  searchElement: T,
  fromIndex: number
) => boolean | number;

export default createArraySearch;