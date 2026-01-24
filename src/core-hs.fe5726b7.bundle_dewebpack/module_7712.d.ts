/**
 * Polyfill module for Object.setPrototypeOf
 * 
 * This module provides a cross-browser implementation of Object.setPrototypeOf.
 * It attempts to use the native implementation if available, otherwise falls back
 * to using __proto__ if supported, or undefined if neither is available.
 * 
 * @module setPrototypeOf
 */

/**
 * Sets the prototype (i.e., the internal [[Prototype]] property) of a specified object.
 * 
 * @template T - The type of the target object
 * @template P - The type of the prototype object
 * 
 * @param target - The object which is to have its prototype set
 * @param proto - The object's new prototype (an object or null)
 * 
 * @returns The modified target object with the new prototype
 * 
 * @throws {TypeError} If target is not an object
 * @throws {TypeError} If proto is not an object or null
 * 
 * @example
 * const obj = {};
 * const proto = { foo: 'bar' };
 * setPrototypeOf(obj, proto);
 * console.log(obj.foo); // 'bar'
 */
declare function setPrototypeOf<T extends object, P extends object | null>(
  target: T,
  proto: P
): T;

/**
 * Type definition for the setPrototypeOf function or undefined if not supported
 */
declare const _default: typeof setPrototypeOf | undefined;

export = _default;