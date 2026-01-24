/**
 * Promise implementation module
 * 
 * This module re-exports the Promise implementation from the core utility library.
 * It provides access to a polyfilled or enhanced Promise implementation that may
 * include additional features beyond native ES6 Promises.
 * 
 * @module PromiseExport
 */

/**
 * Promise constructor and static methods
 * 
 * A Promise represents the eventual completion (or failure) of an asynchronous
 * operation and its resulting value.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
 */
export declare const Promise: PromiseConstructor;

/**
 * Default export of the Promise implementation
 */
export default Promise;