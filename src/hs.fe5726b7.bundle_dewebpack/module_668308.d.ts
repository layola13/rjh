/**
 * THREEx Module Declaration
 * 
 * This module re-exports the THREEx library from the global namespace.
 * THREEx is a collection of extensions and helpers for Three.js library.
 * 
 * @module module_668308
 * @see module_401040
 */

/**
 * THREEx namespace containing Three.js extensions and utilities.
 * The actual implementation is imported from module 401040.
 */
declare const THREEx: typeof import('./module_401040');

export = THREEx;

/**
 * Alternative named export for ESM compatibility
 */
export as namespace THREEx;