/**
 * Array search utilities module
 * Provides functions for searching elements in array-like objects
 */

/**
 * Search function that checks if an element exists in an array-like object
 * 
 * @template T - Type of elements in the array
 * @param array - The array-like object to search in
 * @param searchElement - The element to search for
 * @param fromIndex - The index to start searching from (optional)
 * @returns True if the element is found, false otherwise
 */
export function includes<T>(
  array: ArrayLike<T>,
  searchElement: T,
  fromIndex?: number
): boolean;

/**
 * Search function that returns the index of an element in an array-like object
 * 
 * @template T - Type of elements in the array
 * @param array - The array-like object to search in
 * @param searchElement - The element to search for
 * @param fromIndex - The index to start searching from (optional)
 * @returns The index of the found element, or -1 if not found
 */
export function indexOf<T>(
  array: ArrayLike<T>,
  searchElement: T,
  fromIndex?: number
): number | false;

/**
 * Module exports containing array search utilities
 */
declare const _exports: {
  /** Check if an array includes a certain element (handles NaN comparison) */
  includes: typeof includes;
  /** Find the index of an element in an array (returns false if not found for non-matches) */
  indexOf: typeof indexOf;
};

export = _exports;