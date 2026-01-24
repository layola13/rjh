/**
 * RegExp.prototype.test polyfill module
 * 
 * This module provides a polyfill for RegExp.prototype.test to ensure consistent behavior
 * across different JavaScript environments. It addresses compatibility issues where calling
 * test() should trigger the exec() method if it has been overridden.
 */

/**
 * Type guard to check if a value is callable (function)
 */
type Callable = (...args: any[]) => any;

/**
 * Extended RegExp interface with exec method
 */
interface RegExpWithExec extends RegExp {
  /**
   * Executes a search on a string using a regular expression pattern,
   * and returns an array containing the results of that search.
   * 
   * @param string - The String object or string literal to search
   * @returns An array containing the results of the match, or null if no match was found
   */
  exec(string: string): RegExpExecArray | null;
}

/**
 * Configuration for polyfill behavior
 */
interface PolyfillConfig {
  /** Target object to apply polyfill (e.g., "RegExp") */
  target: string;
  
  /** Whether to apply to prototype */
  proto: boolean;
  
  /** Whether to force override even if method exists */
  forced: boolean;
}

/**
 * Polyfill implementation for RegExp.prototype.test
 * 
 * @param input - The string to test against the regular expression
 * @returns true if the regular expression matches the input string, false otherwise
 * 
 * @remarks
 * This polyfill ensures that if RegExp.exec() has been overridden, it will be properly
 * invoked during the test() operation. The native test() implementation is used as a
 * fallback when exec is not a callable function.
 * 
 * @example
 *