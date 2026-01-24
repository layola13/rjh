/**
 * Polyfill for String.prototype.search method
 * Provides ES6+ compliant implementation of the search method
 * @module StringSearchPolyfill
 */

/**
 * Executes a search for a match between a regular expression and a string
 * @param pattern - The regular expression or string to search for
 * @param stringValue - The string to search within
 * @param searchFunction - The native search implementation
 * @returns The index of the first match, or -1 if no match is found
 */
export declare function search(
  pattern: RegExp | string,
  stringValue: string,
  searchFunction: (regexp: RegExp, str: string) => number
): number;

/**
 * Symbol.search method type for custom objects
 */
export declare type SymbolSearchMethod = (str: string) => number;

/**
 * String prototype search method signature
 * @param searchValue - A regular expression or string to search for
 * @returns The index of the first match, or -1 if not found
 */
export declare function stringPrototypeSearch(
  this: string,
  searchValue: RegExp | string | { [Symbol.search]?: SymbolSearchMethod }
): number;

/**
 * RegExp prototype search implementation
 * @param string - The string to search within
 * @returns The index of the first match, or -1 if not found
 */
export declare function regExpPrototypeSearch(
  this: RegExp,
  string: string
): number;

/**
 * Search result interface
 */
export interface SearchResult {
  /** Indicates if the operation completed */
  done: boolean;
  /** The resulting index value, or -1 if not found */
  value?: number;
  /** The match index from RegExp execution */
  index?: number;
}

/**
 * Internal search implementation details
 */
export declare namespace SearchImplementation {
  /**
   * Checks if a value is null or undefined
   */
  function isNullOrUndefined(value: unknown): value is null | undefined;

  /**
   * Requires an object (throws if null/undefined)
   */
  function requireObjectCoercible(value: unknown): object;

  /**
   * Converts value to string
   */
  function toString(value: unknown): string;

  /**
   * Checks if two values are the same value (SameValue algorithm)
   */
  function sameValue(x: unknown, y: unknown): boolean;

  /**
   * Gets the Symbol.search method from an object
   */
  function getMethod(
    value: unknown,
    symbol: symbol
  ): SymbolSearchMethod | undefined;

  /**
   * Executes a regular expression against a string
   */
  function regExpExec(regexp: RegExp, string: string): RegExpExecArray | null;
}