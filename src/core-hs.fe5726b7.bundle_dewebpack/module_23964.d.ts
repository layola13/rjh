/**
 * String.prototype.at polyfill module
 * 
 * Provides the `at` method for String instances, which returns the character
 * at a given index (supports negative indices to count from the end).
 * 
 * @module StringAtPolyfill
 */

/**
 * Returns the character at the specified index in a string.
 * Supports negative indices to count from the end of the string.
 * 
 * @param index - The zero-based index of the character to retrieve.
 *                Negative values count back from the end of the string.
 * @returns The character at the specified index, or undefined if the index is out of bounds.
 * 
 * @example
 * "hello".at(1)   // 'e'
 * "hello".at(-1)  // 'o'
 * "hello".at(10)  // undefined
 */
interface String {
  at(index: number): string | undefined;
}

declare module 'string-at-polyfill' {
  /**
   * Configuration for the String.at polyfill
   */
  export interface StringAtPolyfillOptions {
    /** Target object to apply the polyfill to */
    target: 'String';
    /** Whether to apply to prototype */
    proto: boolean;
    /** Whether the polyfill is forced to be applied */
    forced: boolean;
  }

  /**
   * Internal implementation of String.prototype.at
   * 
   * @param this - The string instance
   * @param index - The position to retrieve the character from
   * @returns The character at the given index or undefined if out of bounds
   */
  export function at(this: string, index: number): string | undefined;
}