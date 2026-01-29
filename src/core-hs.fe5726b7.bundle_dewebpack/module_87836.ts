/**
 * Array search utilities for indexOf and includes operations
 * Provides optimized implementations with NaN handling
 */

/**
 * Configuration for array search behavior
 */
interface SearchConfig {
  /** Whether to return boolean (includes) or index (indexOf) */
  returnBoolean: boolean;
}

/**
 * Creates a search function for arrays with configurable behavior
 * @param returnBoolean - If true, returns boolean (includes behavior), if false returns index (indexOf behavior)
 * @returns Search function that finds elements in arrays
 */
declare function createArraySearchFunction(
  returnBoolean: boolean
): <T>(
  target: ArrayLike<T>,
  searchElement: T,
  fromIndex?: number
) => boolean | number;

/**
 * Checks if an array includes a certain element
 * Handles NaN values correctly (NaN === NaN for this operation)
 * @param target - The array-like object to search in
 * @param searchElement - The element to search for
 * @param fromIndex - The index to start searching from (default: 0)
 * @returns True if the element is found, false otherwise
 */
export declare function includes<T>(
  target: ArrayLike<T>,
  searchElement: T,
  fromIndex?: number
): boolean;

/**
 * Returns the first index at which a given element can be found
 * Does not treat NaN specially (NaN !== NaN for this operation)
 * @param target - The array-like object to search in
 * @param searchElement - The element to search for
 * @param fromIndex - The index to start searching from (default: 0)
 * @returns The index of the element, or -1 if not found
 */
export declare function indexOf<T>(
  target: ArrayLike<T>,
  searchElement: T,
  fromIndex?: number
): number;

/**
 * Array-like object interface
 */
interface ArrayLike<T> {
  readonly length: number;
  readonly [index: number]: T;
}