/**
 * Global object accessor module
 * 
 * This module provides a safe way to access the global object across different JavaScript environments
 * (Node.js, Browser, Web Workers, etc.)
 * 
 * @module GlobalObjectAccessor
 */

/**
 * Retrieves the global object in a cross-environment compatible way.
 * 
 * Attempts multiple strategies to access the global object:
 * 1. Uses `this` in non-strict mode
 * 2. Falls back to `Function("return this")()` for strict mode contexts
 * 3. Uses `window` as a last resort in browser environments
 * 
 * @returns The global object (window in browsers, global in Node.js, self in Workers)
 * 
 * @example
 *