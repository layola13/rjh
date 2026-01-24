/**
 * Polyfill module for Object.getOwnPropertySymbols
 * Provides access to the native getOwnPropertySymbols method for retrieving symbol properties
 */

/**
 * Gets an array of all symbol properties found directly on a given object
 * @param obj - The object whose symbol properties are to be returned
 * @returns An array of all symbols found directly on the given object
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols
 */
export const getOwnPropertySymbols: (obj: any) => symbol[] = Object.getOwnPropertySymbols;