/**
 * Array.prototype.includes polyfill
 * 
 * Adds the `includes` method to Array prototype for checking if an array
 * contains a specific element, with optional start index parameter.
 * 
 * @module ArrayIncludesPolyfill
 */

/**
 * Checks if an array includes a certain element, returning true or false.
 * 
 * @template T - The type of elements in the array
 * @param searchElement - The element to search for
 * @param fromIndex - Optional starting index for the search (defaults to 0)
 * @returns True if the element is found, false otherwise
 */
declare function includes<T>(
  this: T[],
  searchElement: T,
  fromIndex?: number
): boolean;

declare global {
  interface Array<T> {
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * 
     * @param searchElement - The element to search for
     * @param fromIndex - The position in this array at which to begin searching for searchElement
     * @returns A boolean indicating whether the element was found
     */
    includes(searchElement: T, fromIndex?: number): boolean;
  }
}

export {};