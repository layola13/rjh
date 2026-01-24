/**
 * Global object accessor module
 * 
 * This module provides a safe way to access the global object across different JavaScript environments
 * (browser, Node.js, Web Workers, etc.). It attempts multiple strategies to obtain the global object.
 */

/**
 * Retrieves the global object in a cross-environment compatible way.
 * 
 * Strategy:
 * 1. First attempts to use `this` in non-strict mode to get the global object
 * 2. Falls back to `new Function("return this")()` if step 1 fails
 * 3. Finally falls back to `window` object if in a browser environment
 * 
 * @returns The global object (globalThis, window, global, or self depending on environment)
 * 
 * @example
 *