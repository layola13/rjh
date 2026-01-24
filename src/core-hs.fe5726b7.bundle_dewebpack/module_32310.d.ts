/**
 * String.prototype.match polyfill module
 * 
 * This module provides a polyfill for the ES6+ String.prototype.match method,
 * supporting both global and non-global regular expression matching with Unicode awareness.
 * 
 * @module StringMatchPolyfill
 */

/**
 * Type definition for the match symbol used in regex operations
 */
declare const MATCH_SYMBOL: unique symbol;

/**
 * Represents a regular expression with match capabilities
 */
interface RegExpWithMatch {
  /**
   * Executes a search on a string using a regular expression pattern
   * @param string - The string to search within
   * @returns An array of matches or null if no match is found
   */
  [MATCH_SYMBOL](string: string): RegExpMatchArray | null;
  
  /**
   * Indicates whether the regular expression uses global matching
   */
  global: boolean;
  
  /**
   * Indicates whether the regular expression uses Unicode mode
   */
  unicode: boolean;
  
  /**
   * The index at which to start the next match
   */
  lastIndex: number;
}

/**
 * Object that can be null or undefined
 */
type Nullish = null | undefined;

/**
 * Checks if a value is nullish (null or undefined)
 * @param value - The value to check
 * @returns True if the value is null or undefined
 */
declare function isNullish(value: unknown): value is Nullish;

/**
 * Retrieves the match method from a regular expression or string-like object
 * @param target - The object to retrieve the match method from
 * @param symbolMatch - The symbol key for the match method
 * @returns The match method or undefined if not found
 */
declare function getMethod(
  target: unknown,
  symbolMatch: typeof MATCH_SYMBOL
): ((str: string) => RegExpMatchArray | null) | undefined;

/**
 * Converts a value to a string representation
 * @param value - The value to convert
 * @returns The string representation of the value
 */
declare function toString(value: unknown): string;

/**
 * Converts a value to a number (used for lastIndex calculations)
 * @param value - The value to convert
 * @returns The numeric representation
 */
declare function toLength(value: unknown): number;

/**
 * Requires that a value is an object (throws if not)
 * @param value - The value to check
 * @returns The value as an object
 * @throws TypeError if the value is not an object
 */
declare function requireObjectCoercible(value: unknown): object;

/**
 * Advances a string index, accounting for Unicode surrogate pairs
 * @param str - The string being indexed
 * @param index - The current index
 * @param unicode - Whether to handle Unicode surrogate pairs
 * @returns The next index position
 */
declare function advanceStringIndex(
  str: string,
  index: number,
  unicode: boolean
): number;

/**
 * Executes a regex match operation
 * @param regexp - The regular expression to use
 * @param str - The string to match against
 * @returns Match array or null
 */
declare function regExpExec(
  regexp: RegExpWithMatch,
  str: string
): RegExpMatchArray | null;

/**
 * Result of a completed match operation
 */
interface MatchResult {
  /**
   * Indicates the operation completed
   */
  done: true;
  
  /**
   * The result value (match array or null)
   */
  value: RegExpMatchArray | string[] | null;
}

/**
 * Polyfill implementation for String.prototype.match
 * 
 * Extends String prototype to support enhanced regex matching with:
 * - Global match support (returns all matches)
 * - Unicode-aware string indexing
 * - Symbol-based regex protocol support
 * 
 * @param pattern - A regular expression object or string pattern
 * @returns An array of match results or null if no match found
 */
declare global {
  interface String {
    /**
     * Matches a string with a regular expression, and returns an array containing the results
     * @param regexp - A regular expression or string to match against
     * @returns An array of matches, or null if no match is found
     */
    match(regexp: string | RegExp): RegExpMatchArray | null;
  }
}

export {};