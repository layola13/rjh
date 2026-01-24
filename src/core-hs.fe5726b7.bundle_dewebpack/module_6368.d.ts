/**
 * Polyfill or wrapper for Object.prototype.isPrototypeOf method.
 * Checks if an object exists in another object's prototype chain.
 * 
 * @module PrototypeChecker
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf
 */

/**
 * Determines whether an object exists in another object's prototype chain.
 * 
 * @param prototypeObj - The object whose prototype chain will be searched
 * @param object - The object to be tested
 * @returns true if the calling object is in the prototype chain of the specified object, otherwise false
 * 
 * @example
 *