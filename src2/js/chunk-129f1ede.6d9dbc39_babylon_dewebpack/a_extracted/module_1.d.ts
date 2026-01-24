/**
 * Global object polyfill module
 * 
 * Provides a cross-environment way to access the global object.
 * Works in Node.js, browsers, and other JavaScript environments.
 * 
 * @module GlobalPolyfill
 */

/**
 * Gets the global object in a cross-platform way.
 * 
 * Attempts to retrieve the global object using multiple strategies:
 * 1. Direct `this` reference (works in non-strict mode)
 * 2. Function constructor evaluation (bypasses strict mode)
 * 3. Browser window fallback (for browser environments)
 * 
 * @returns The global object (globalThis, window, or global depending on environment)
 * 
 * @example
 *