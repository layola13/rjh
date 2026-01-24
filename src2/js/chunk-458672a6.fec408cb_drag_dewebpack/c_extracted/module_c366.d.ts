/**
 * Array search utility module
 * 
 * Creates a search function that can find elements in array-like objects.
 * Supports both standard equality checks and NaN-aware searches.
 * 
 * @module ArraySearchFactory
 * @dependencies
 *   - 6821: toIObject (converts value to indexed object)
 *   - 9def: toLength (converts value to valid length)
 *   - 77f1: toAbsoluteIndex (converts relative index to absolute)
 */

/**
 * Converts a value to an indexed object (array-like structure)
 */
declare function toIObject(value: unknown): ArrayLike<unknown>;

/**
 * Converts a value to a valid length integer
 */
declare function toLength(value: unknown): number;

/**
 * Converts a relative index to an absolute index within bounds
 */
declare function toAbsoluteIndex(index: number, length: number): number;

/**
 * Search function signature
 * 
 * @param target - The array-like object to search in
 * @param searchElement - The element to search for
 * @param fromIndex - The index to start searching from
 * @returns The index of the found element, or -1 if not found (when returnIndex is false)
 */
type SearchFunction = <T>(
  target: ArrayLike<T>,
  searchElement: T,
  fromIndex?: number
) => number | boolean;

/**
 * Factory function that creates array search functions
 * 
 * @param returnIndex - If true, returns the index when found; if false, returns boolean
 * @returns A search function configured based on returnIndex parameter
 * 
 * @remarks
 * - When returnIndex is true: returns index (or 0 for index 0), or false if not found
 * - When returnIndex is false: returns true if found, or -1 if not found
 * - Handles NaN searches correctly (NaN !== NaN in JavaScript)
 */
declare function createArraySearchFunction(returnIndex: boolean): SearchFunction;

export = createArraySearchFunction;