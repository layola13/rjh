/**
 * Polyfill module for Object.getOwnPropertySymbols
 * Exports a function that retrieves all symbol properties from an object
 */

/**
 * Exports object containing the getOwnPropertySymbols function
 */
export interface Exports {
  /**
   * Returns an array of all symbol properties found directly upon a given object.
   * 
   * @param obj - The object whose symbol properties are to be returned
   * @returns An array of all symbols found directly on the given object
   * 
   * @example
   *