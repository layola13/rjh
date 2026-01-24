/**
 * Object prototype chain checking utility module
 * 
 * This module exports the native `isPrototypeOf` method for checking
 * whether an object exists in another object's prototype chain.
 * 
 * @module module_862730
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf
 */

/**
 * Determines whether an object exists in another object's prototype chain.
 * 
 * @param prototypeObj - The object whose prototype chain will be searched
 * @param object - The object to test against
 * @returns `true` if the object exists in the prototype chain, `false` otherwise
 * 
 * @example
 *