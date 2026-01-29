/**
 * Array species constructor utility
 * @description Determines the appropriate constructor for creating array-like objects,
 * respecting the ES6 Symbol.species pattern
 * @module ArraySpeciesCreate
 * @example
 * const arr = [1, 2, 3];
 * const Constructor = arraySpeciesCreate(arr);
 * const newArr = new Constructor(5);
 */

/**
 * Determines the constructor to use for array creation based on Symbol.species
 * @param input - The value to check, typically an array or array-like object
 * @returns The constructor function to use for creating new array instances
 */
declare function arraySpeciesCreate(input: any): ArrayConstructor;

export { arraySpeciesCreate };
