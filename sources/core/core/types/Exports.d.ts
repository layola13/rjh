/**
 * Object.getOwnPropertySymbols polyfill module
 * @description Provides polyfill for Symbol property enumeration
 * @example
 * const sym = Symbol('test');
 * const obj = { [sym]: 'value' };
 * const symbols = getOwnPropertySymbols(obj);
 */

/**
 * Returns an array of all symbol properties found directly upon a given object
 * @param obj - The object whose symbol properties are to be returned
 * @returns An array of all symbols found directly on the given object
 */
declare function getOwnPropertySymbols(obj: object): symbol[];

export { getOwnPropertySymbols };