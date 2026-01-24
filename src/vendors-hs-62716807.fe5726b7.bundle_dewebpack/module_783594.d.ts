/**
 * Array search utilities for includes and indexOf operations
 * Provides optimized implementations with NaN handling
 */

/**
 * Configuration for array search behavior
 */
interface SearchOptions {
  /** Whether to include the element itself in the search */
  includes: boolean;
}

/**
 * Creates a search function for arrays with configurable behavior
 * @param shouldInclude - If true, returns boolean for presence check; if false, returns index
 * @returns A search function that works on array-like objects
 */
type SearchFunction = (
  target: unknown[],
  searchElement: unknown,
  fromIndex?: number
) => boolean | number;

/**
 * Searches for an element in an array starting from a given index
 * Handles special case of NaN inequality (NaN !== NaN)
 * 
 * @param target - The array-like object to search in
 * @param searchElement - The element to search for
 * @param fromIndex - The index to start searching from (optional)
 * @returns For includes mode: true if found, false otherwise
 *          For indexOf mode: index if found, -1 otherwise
 */
declare function createSearchFunction(shouldInclude: boolean): SearchFunction;

/**
 * Array search utilities module
 */
declare module 'array-search-utils' {
  /**
   * Checks if an array includes a certain element
   * Returns true if the element is found, including NaN values
   * 
   * @param target - The array to search in
   * @param searchElement - The element to search for
   * @param fromIndex - The position to start searching from
   * @returns True if the element is found, false otherwise
   */
  export function includes(
    target: unknown[],
    searchElement: unknown,
    fromIndex?: number
  ): boolean;

  /**
   * Returns the first index at which a given element can be found
   * Returns -1 if the element is not present
   * Note: Does not handle NaN equality
   * 
   * @param target - The array to search in
   * @param searchElement - The element to locate
   * @param fromIndex - The index to start searching from
   * @returns The index of the element, or -1 if not found
   */
  export function indexOf(
    target: unknown[],
    searchElement: unknown,
    fromIndex?: number
  ): number;
}