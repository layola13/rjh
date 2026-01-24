/**
 * String.prototype.match polyfill module
 * 
 * This module provides a polyfill for the String.prototype.match method,
 * handling both regular and global regex matching with proper unicode support.
 */

/**
 * Performs pattern matching on a string using a regular expression.
 * 
 * @param pattern - The regular expression pattern or string to match against
 * @returns An array of matches, or null if no matches are found
 * 
 * @remarks
 * - If the pattern is null or undefined, it's converted to a RegExp
 * - If the pattern has a Symbol.match method, it will be used
 * - For non-global regex, returns the first match with capture groups
 * - For global regex, returns all matches without capture groups
 * - Handles unicode flag properly for correct character indexing
 */
declare function match(this: string, pattern: string | RegExp | null | undefined): RegExpMatchArray | null;

/**
 * Internal helper: Converts a value to an object, throwing if null/undefined
 */
declare function requireObjectCoercible(value: unknown): object;

/**
 * Internal helper: Converts a value to an integer for length operations
 */
declare function toLength(value: unknown): number;

/**
 * Internal helper: Advances string index by one code point (handles unicode)
 * 
 * @param string - The string to traverse
 * @param index - Current index position
 * @param unicode - Whether to handle unicode surrogate pairs
 * @returns The next valid index position
 */
declare function advanceStringIndex(string: string, index: number, unicode: boolean): number;

/**
 * Internal helper: Executes a regex match and returns structured result
 * 
 * @param regex - The RegExp object to execute
 * @param string - The string to match against
 * @returns The match result array or null
 */
declare function regExpExec(regex: RegExp, string: string): RegExpExecArray | null;

/**
 * Internal helper: Defines a built-in method on a prototype with polyfill support
 * 
 * @param key - The method name to define (e.g., "match")
 * @param length - The function length property
 * @param executor - Factory function that returns [nativeMethod, polyfillMethod]
 */
declare function defineBuiltInMethod(
  key: string,
  length: number,
  executor: (
    requireObjectCoercible: typeof requireObjectCoercible,
    symbolMethod: symbol,
    nativeMethod: Function,
    polyfillMethod: Function
  ) => [Function, Function]
): void;

/**
 * Extended String interface with proper match typing
 */
declare global {
  interface String {
    /**
     * Matches a string against a regular expression.
     * 
     * @param matcher - A regular expression object or string pattern
     * @returns An array containing the entire match result and any parentheses-captured substrings,
     *          or null if no match was found. For global matches, returns all matches without groups.
     * 
     * @example
     *