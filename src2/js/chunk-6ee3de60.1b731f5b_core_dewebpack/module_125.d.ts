/**
 * Global object accessor module
 * 
 * Provides a safe way to access the global object across different JavaScript environments
 * (browser, Node.js, web workers, etc.)
 * 
 * @module GlobalAccessor
 */

/**
 * Gets the global object in a cross-environment compatible way.
 * 
 * Resolution order:
 * 1. Attempts to use `this` in non-strict mode (works in Node.js and older environments)
 * 2. Falls back to `Function("return this")()` (works in most environments)
 * 3. Falls back to `window` object if available (browser environment)
 * 
 * @returns {typeof globalThis} The global object (window in browsers, global in Node.js, etc.)
 */
declare function getGlobalObject(): typeof globalThis;

/**
 * The resolved global object instance
 */
declare const globalObject: typeof globalThis;

export = globalObject;
export { getGlobalObject };