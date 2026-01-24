/**
 * Global object accessor utility
 * 
 * This module provides a cross-environment method to access the global object.
 * It works in browsers (window), Node.js (global), and web workers (self).
 * 
 * @module GlobalObjectAccessor
 */

/**
 * Retrieves the global object in a cross-platform manner.
 * 
 * Attempts multiple strategies to access the global object:
 * 1. Uses `this` in non-strict mode (legacy approach)
 * 2. Falls back to `Function` constructor evaluation
 * 3. Finally attempts to access `window` object (browser environment)
 * 
 * @returns The global object (window in browsers, global in Node.js, self in workers)
 * 
 * @example
 * const globalObj = getGlobalObject();
 * // In browser: returns window
 * // In Node.js: returns global
 * // In web worker: returns self
 */
export function getGlobalObject(): typeof globalThis {
  let globalObject: typeof globalThis;

  try {
    // Attempt 1: Use non-strict mode `this` binding
    globalObject = (function() {
      return this;
    })() as typeof globalThis;
  } catch {
    // Not in non-strict mode context
  }

  try {
    // Attempt 2: Use Function constructor (works in most environments)
    globalObject = globalObject || new Function("return this")() as typeof globalThis;
  } catch {
    // Function constructor blocked (strict CSP)
  }

  // Attempt 3: Fallback to window object (browser environment)
  if (typeof window === "object") {
    globalObject = window as typeof globalThis;
  }

  return globalObject;
}

/**
 * The global object instance
 * @type {typeof globalThis}
 */
export default getGlobalObject();