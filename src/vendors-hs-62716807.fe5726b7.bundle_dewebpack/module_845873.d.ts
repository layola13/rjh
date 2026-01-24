/**
 * DOM availability detection utility
 * 
 * Checks if the code is running in a browser environment with DOM support.
 * This is useful for universal/isomorphic applications that run in both
 * Node.js and browser environments.
 * 
 * @module DOMDetection
 */

/**
 * Indicates whether the current environment has DOM support.
 * 
 * Returns `true` if:
 * - `window` object exists
 * - `window.document` exists
 * - `window.document.createElement` function exists
 * 
 * Returns `false` in server-side environments (Node.js, Deno, etc.)
 * or environments without DOM APIs.
 * 
 * @example
 *