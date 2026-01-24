/**
 * Polyfill for String.prototype.search method
 * 
 * This module implements a robust version of the String.prototype.search method
 * that handles both regular expressions and objects with Symbol.search methods.
 * 
 * @module StringSearchPolyfill
 */

/**
 * Validates that a value is an object (not null or primitive)
 * @param value - The value to check
 * @returns The validated object
 * @throws {TypeError} If the value is not an object
 */
declare function toObject(value: unknown): object;

/**
 * Checks if two values are strictly equal using SameValue algorithm
 * @param value1 - First value to compare
 * @param value2 - Second value to compare
 * @returns True if values are the same, false otherwise
 */
declare function sameValue(value1: unknown, value2: unknown): boolean;

/**
 * Performs a RegExp match operation
 * @param regexp - The regular expression to execute
 * @param str - The string to search
 * @returns The match result or null if no match found
 */
declare function regExpExec(regexp: RegExp, str: string): RegExpExecArray | null;

/**
 * Result object for method delegation attempts
 */
interface DelegationResult<T> {
  /** Indicates if the operation completed via delegation */
  done: boolean;
  /** The return value if delegation completed */
  value?: T;
}

/**
 * Attempts to delegate the search operation to a native implementation
 * @param nativeMethod - The native search implementation
 * @param searchValue - The value to search for
 * @param thisArg - The string context to search within
 * @returns Result indicating if delegation succeeded and its value
 */
declare function tryNativeDelegation(
  nativeMethod: Function,
  searchValue: unknown,
  thisArg: unknown
): DelegationResult<number>;

/**
 * String.prototype.search polyfill function
 * Searches for a match between a regular expression and this string
 * @param searchValue - A regular expression object or any value with a Symbol.search method
 * @returns The index of the first match, or -1 if no match found
 */
declare function stringSearch(this: string, searchValue: RegExp | { [Symbol.search]: Function } | unknown): number;

/**
 * RegExp.prototype[Symbol.search] implementation
 * Executes a search on a string and returns the index of the match
 * @param str - The string to search within
 * @returns The index of the match, or -1 if no match found
 */
declare function regExpSearch(this: RegExp, str: string): number;

/**
 * Defines the search method polyfill on String.prototype
 * 
 * Provides two implementations:
 * 1. String.prototype.search - Handles searchValue with Symbol.search or converts to RegExp
 * 2. RegExp.prototype[Symbol.search] - Performs the actual search and preserves lastIndex
 * 
 * @param methodName - The method name to polyfill ("search")
 * @param arity - The function arity (1)
 * @param implementation - Factory function returning [stringMethod, regExpMethod]
 */
declare function defineSearchPolyfill(
  methodName: "search",
  arity: 1,
  implementation: (
    requireObject: typeof toObject,
    symbolSearch: symbol,
    nativeSearch: Function,
    tryDelegate: typeof tryNativeDelegation
  ) => [typeof stringSearch, typeof regExpSearch]
): void;

export { stringSearch, regExpSearch, defineSearchPolyfill };