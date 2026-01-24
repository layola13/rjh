/**
 * Array.prototype.includes polyfill module
 * 
 * Provides the `includes` method for Array instances to check if an array
 * contains a specified element, with optional starting index.
 * 
 * @module ArrayIncludes
 */

/**
 * Checks if an array includes a certain element, returning true or false as appropriate.
 * 
 * @template T - The type of elements in the array
 * @param searchElement - The element to search for within the array
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

  interface ReadonlyArray<T> {
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