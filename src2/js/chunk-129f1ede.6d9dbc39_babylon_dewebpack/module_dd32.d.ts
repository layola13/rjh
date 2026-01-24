/**
 * Number polyfill module
 * 
 * This module imports various Number-related polyfills and re-exports
 * the enhanced Number constructor from the core library.
 * 
 * @module NumberPolyfill
 */

/**
 * Polyfilled Number constructor with ES2015+ features
 * 
 * Includes polyfills for:
 * - Number.isFinite
 * - Number.isInteger
 * - Number.isNaN
 * - Number.isSafeInteger
 * - Number.parseFloat
 * - Number.parseInt
 * - Number.EPSILON
 * - Number.MAX_SAFE_INTEGER
 * - Number.MIN_SAFE_INTEGER
 * - Number prototype extensions
 */
declare const NumberPolyfill: NumberConstructor;

export default NumberPolyfill;