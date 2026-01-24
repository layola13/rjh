/**
 * String.prototype.includes polyfill module
 * 
 * This module provides a polyfill for the String.prototype.includes method,
 * which determines whether one string may be found within another string.
 * 
 * @module StringIncludesPolyfill
 */

/**
 * Export function that registers the includes polyfill on String.prototype
 * 
 * @param exports - Module exports object
 * @param module - Module object
 * @param require - Module require function
 */
export default function(
  exports: Record<string, unknown>,
  module: { exports: unknown },
  require: (moduleId: string) => unknown
): void;

/**
 * Polyfill implementation of String.prototype.includes
 * 
 * Determines whether the search string is found within the calling string.
 * 
 * @param searchString - The string to search for within this string
 * @param position - Optional. The position within the string at which to begin searching. Defaults to 0.
 * @returns true if the search string is found anywhere within the calling string; otherwise, false
 * 
 * @example
 *