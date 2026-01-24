/**
 * Global object detection module
 * Attempts to retrieve the global object (globalThis) in a cross-environment way
 * Compatible with: Browser (window), Node.js (global), Web Workers, and strict mode
 */

/**
 * Gets the global object in various JavaScript environments
 * 
 * Strategy:
 * 1. First tries to access `this` in non-strict mode
 * 2. Falls back to Function constructor to get global scope
 * 3. Finally defaults to `window` object in browser environments
 * 
 * @returns The global object (globalThis/window/global)
 */
declare function getGlobalObject(): typeof globalThis;

/**
 * The global object reference
 * In modern environments, this is equivalent to `globalThis`
 * In browsers, this resolves to `window`
 * In Node.js, this resolves to `global`
 */
declare const globalObject: typeof globalThis;

export = globalObject;