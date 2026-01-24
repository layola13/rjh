/**
 * Global object accessor module.
 * 
 * Provides a robust way to access the global object across different JavaScript environments
 * (browser, Node.js, Web Workers, etc.) by attempting multiple fallback strategies.
 * 
 * @module GlobalObjectAccessor
 */

/**
 * The global object reference.
 * Can be `window` in browsers, `global` in Node.js, or `self` in Web Workers.
 */
declare const globalObject: typeof globalThis;

export = globalObject;

/**
 * Type definition for the global object.
 * Represents the top-level global context available in the current JavaScript environment.
 */
export type GlobalObject = typeof globalThis;

/**
 * Returns the global object using multiple fallback strategies:
 * 
 * 1. First attempts to use `this` in non-strict mode (legacy environments)
 * 2. Falls back to `new Function("return this")()` if available
 * 3. Finally falls back to `window` object if in a browser environment
 * 
 * @returns The global object for the current environment
 * 
 * @example
 *