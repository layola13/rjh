/**
 * Cross-browser compatible utility to get the prototype of an object.
 * 
 * This module provides a polyfill that prefers the native Reflect.getPrototypeOf
 * when available, falling back to null if the Reflect API is not supported.
 * 
 * @module PrototypeGetter
 */

/**
 * Function that retrieves the prototype of an object.
 * Returns Reflect.getPrototypeOf if available, otherwise returns null.
 * 
 * When Reflect.getPrototypeOf is available, it can be used as:
 * @example
 * const proto = getPrototypeOf(obj);
 * 
 * @remarks
 * This is equivalent to Object.getPrototypeOf but uses the Reflect API when available.
 * If the Reflect API is not supported in the environment, this will be null.
 */
declare const getPrototypeOf: typeof Reflect.getPrototypeOf | null;

export default getPrototypeOf;