/**
 * Array iteration utilities module
 * Provides polyfill implementations for array iteration methods
 */

/**
 * Callback function type for array iteration methods
 * @template T - The type of array elements
 * @template R - The return type of the callback
 */
type ArrayIteratorCallback<T, R> = (element: T, index: number, array: T[]) => R;

/**
 * Creates an array-like object with specified length
 * @template T - The type of array elements
 */
type ArrayLike<T> = {
  readonly length: number;
  readonly [n: number]: T;
};

/**
 * Options for iteration behavior
 * 1 = forEach/map (create result array with same length)
 * 2 = filter (create empty result array)
 * 3 = some (return boolean on match)
 * 4 = every (return boolean on all match)
 * 5 = find (return element)
 * 6 = findIndex (return index)
 * 7 = filterReject (inverse filter)
 */
type IterationMode = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Execute callback for each array element with specified behavior
 * @template T - The type of input array elements
 * @template R - The type of result elements
 * @param target - The array or array-like object to iterate
 * @param callback - The function to execute for each element
 * @param thisArg - Value to use as `this` when executing callback
 * @param arraySpeciesCreate - Optional function to create result array
 * @returns Result based on iteration mode
 */
declare function forEach<T>(
  target: ArrayLike<T>,
  callback: ArrayIteratorCallback<T, void>,
  thisArg?: unknown,
  arraySpeciesCreate?: (length: number) => void[]
): undefined;

/**
 * Map array elements to new values
 * @template T - The type of input array elements
 * @template R - The type of mapped elements
 * @param target - The array or array-like object to map
 * @param callback - The mapping function
 * @param thisArg - Value to use as `this` when executing callback
 * @param arraySpeciesCreate - Optional function to create result array
 * @returns New array with mapped elements
 */
declare function map<T, R>(
  target: ArrayLike<T>,
  callback: ArrayIteratorCallback<T, R>,
  thisArg?: unknown,
  arraySpeciesCreate?: (length: number) => R[]
): R[];

/**
 * Filter array elements based on predicate
 * @template T - The type of array elements
 * @param target - The array or array-like object to filter
 * @param predicate - The test function
 * @param thisArg - Value to use as `this` when executing predicate
 * @param arraySpeciesCreate - Optional function to create result array
 * @returns New array with elements that pass the test
 */
declare function filter<T>(
  target: ArrayLike<T>,
  predicate: ArrayIteratorCallback<T, boolean>,
  thisArg?: unknown,
  arraySpeciesCreate?: (length: number) => T[]
): T[];

/**
 * Test whether at least one element passes the predicate
 * @template T - The type of array elements
 * @param target - The array or array-like object to test
 * @param predicate - The test function
 * @param thisArg - Value to use as `this` when executing predicate
 * @param arraySpeciesCreate - Optional function to create result array
 * @returns true if at least one element passes, false otherwise
 */
declare function some<T>(
  target: ArrayLike<T>,
  predicate: ArrayIteratorCallback<T, boolean>,
  thisArg?: unknown,
  arraySpeciesCreate?: (length: number) => boolean[]
): boolean;

/**
 * Test whether all elements pass the predicate
 * @template T - The type of array elements
 * @param target - The array or array-like object to test
 * @param predicate - The test function
 * @param thisArg - Value to use as `this` when executing predicate
 * @param arraySpeciesCreate - Optional function to create result array
 * @returns true if all elements pass, false otherwise
 */
declare function every<T>(
  target: ArrayLike<T>,
  predicate: ArrayIteratorCallback<T, boolean>,
  thisArg?: unknown,
  arraySpeciesCreate?: (length: number) => boolean[]
): boolean;

/**
 * Find the first element that satisfies the predicate
 * @template T - The type of array elements
 * @param target - The array or array-like object to search
 * @param predicate - The test function
 * @param thisArg - Value to use as `this` when executing predicate
 * @param arraySpeciesCreate - Optional function to create result array
 * @returns The first matching element or undefined
 */
declare function find<T>(
  target: ArrayLike<T>,
  predicate: ArrayIteratorCallback<T, boolean>,
  thisArg?: unknown,
  arraySpeciesCreate?: (length: number) => T[]
): T | undefined;

/**
 * Find the index of the first element that satisfies the predicate
 * @template T - The type of array elements
 * @param target - The array or array-like object to search
 * @param predicate - The test function
 * @param thisArg - Value to use as `this` when executing predicate
 * @param arraySpeciesCreate - Optional function to create result array
 * @returns The index of the first matching element or -1
 */
declare function findIndex<T>(
  target: ArrayLike<T>,
  predicate: ArrayIteratorCallback<T, boolean>,
  thisArg?: unknown,
  arraySpeciesCreate?: (length: number) => number[]
): number;

/**
 * Filter array elements that do NOT pass the predicate (inverse of filter)
 * @template T - The type of array elements
 * @param target - The array or array-like object to filter
 * @param predicate - The test function
 * @param thisArg - Value to use as `this` when executing predicate
 * @param arraySpeciesCreate - Optional function to create result array
 * @returns New array with elements that fail the test
 */
declare function filterReject<T>(
  target: ArrayLike<T>,
  predicate: ArrayIteratorCallback<T, boolean>,
  thisArg?: unknown,
  arraySpeciesCreate?: (length: number) => T[]
): T[];

/**
 * Exported array iteration utilities
 */
export {
  forEach,
  map,
  filter,
  some,
  every,
  find,
  findIndex,
  filterReject
};