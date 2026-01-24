/**
 * Promise utility module
 * 
 * This module provides a reference to the native Promise constructor
 * or a polyfilled version from the environment's root object.
 * 
 * @module PromiseReference
 */

/**
 * Gets the native Promise constructor from the global object.
 * 
 * This function retrieves the Promise implementation from the environment's
 * root object (window in browsers, global in Node.js).
 * 
 * @returns The native Promise constructor or undefined if not available
 */
export declare function getPromise(): PromiseConstructor | undefined;

/**
 * Reference to the native or polyfilled Promise constructor.
 * 
 * This is typically used to ensure consistent Promise behavior across
 * different JavaScript environments.
 */
declare const promiseReference: PromiseConstructor | undefined;

export default promiseReference;