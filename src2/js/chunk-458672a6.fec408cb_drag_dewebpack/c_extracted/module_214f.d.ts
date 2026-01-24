/**
 * Fix RegExp-related methods module
 * 
 * This module provides a utility to fix and polyfill RegExp-related methods
 * (like replace, split, match, search) to ensure consistent behavior across
 * different JavaScript engines, particularly handling edge cases with:
 * - Named capture groups ($<name> syntax)
 * - Species constructor pattern
 * - exec() method overrides
 * 
 * @module RegExpMethodFixer
 */

/**
 * Options for the internal method replacement callback
 */
interface MethodReplacementResult {
  /** Whether the operation completed successfully */
  done: boolean;
  /** The result value if done is true */
  value?: unknown;
}

/**
 * Callback function type for native method interception
 * 
 * @param nativeMethod - The native method being called
 * @param regexp - The RegExp instance or object
 * @param str - The string being operated on
 * @param arg2 - Second argument (replacer/limit depending on method)
 * @param isNativeCall - Whether this is a native RegExp.exec call
 * @returns Result indicating whether to use native or custom implementation
 */
type MethodInterceptor = (
  nativeMethod: Function,
  regexp: RegExp | object,
  str: string,
  arg2?: unknown,
  isNativeCall?: boolean
) => MethodReplacementResult;

/**
 * Fixes RegExp-related method to ensure consistent behavior across engines
 * 
 * This function patches String.prototype and RegExp.prototype methods to handle
 * edge cases and ensure spec-compliant behavior for methods like replace, split,
 * match, and search.
 * 
 * @param methodName - The name of the method to fix (e.g., 'replace', 'split')
 * @param arity - The expected number of arguments (1 or 2)
 * @param implementationFactory - Factory function that returns the fixed implementation
 * 
 * @example
 *