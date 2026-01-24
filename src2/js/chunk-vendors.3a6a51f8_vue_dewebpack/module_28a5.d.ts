/**
 * String.prototype.split polyfill module
 * 
 * This module provides a robust implementation of the String split method
 * that handles edge cases with regular expressions, particularly focusing on:
 * - Empty capturing groups
 * - Unicode support
 * - Sticky flag ('y') support
 * - Limit parameter handling
 * 
 * @module StringSplitPolyfill
 */

/**
 * Checks if a value is a RegExp instance
 */
type IsRegExpFunction = (value: unknown) => value is RegExp;

/**
 * Converts an object to a string, handling null/undefined
 */
type RequireObjectCoercibleFunction = (value: unknown) => string;

/**
 * Gets the species constructor for creating new RegExp instances
 */
type SpeciesConstructorFunction = (instance: RegExp, defaultConstructor: RegExpConstructor) => RegExpConstructor;

/**
 * Advances string position by one code point (handles Unicode surrogate pairs)
 */
type AdvanceStringIndexFunction = (str: string, index: number, unicode: boolean) => number;

/**
 * Gets the length property of an object
 */
type ToLengthFunction = (value: unknown) => number;

/**
 * Executes a RegExp match, returning null if no match found
 */
type RegExpExecFunction = (regexp: RegExp, str: string) => RegExpExecArray | null;

/**
 * Calls the native RegExp exec method
 */
type RegExpExecNativeFunction = (this: RegExp, str: string) => RegExpExecArray | null;

/**
 * Checks if a function fails (throws or returns falsy)
 */
type FailsFunction = (fn: () => void) => boolean;

/**
 * Result object for internal operations indicating completion status
 */
interface IteratorResult<T> {
  /** Whether the operation is complete */
  done: boolean;
  /** The resulting value if done is true */
  value?: T;
}

/**
 * Split method implementation that can be called on strings
 */
interface SplitMethod {
  (this: string, separator?: string | RegExp, limit?: number): string[];
}

/**
 * RegExp prototype extension with split symbol
 */
interface RegExpWithSplit extends RegExp {
  [Symbol.split]?: (str: string, limit?: number) => string[];
}

declare module 'string-split-polyfill' {
  /**
   * Maximum unsigned 32-bit integer value used as default limit
   */
  const MAX_UINT32: 4294967295;

  /**
   * Minimum of two numbers
   */
  const min: typeof Math.min;

  /**
   * Array.prototype.push method
   */
  const arrayPush: typeof Array.prototype.push;

  /**
   * Property name constants
   */
  const SPLIT_PROPERTY: 'split';
  const LENGTH_PROPERTY: 'length';
  const LAST_INDEX_PROPERTY: 'lastIndex';

  /**
   * Checks if the RegExp 'y' (sticky) flag is supported
   */
  const SUPPORTS_STICKY_FLAG: boolean;

  /**
   * Determines if the native split implementation has known bugs with RegExp
   * Tests for various edge cases including:
   * - Empty capturing groups
   * - Negative limits
   * - Empty pattern matching
   * - Multiple consecutive empty matches
   */
  const NATIVE_SPLIT_HAS_BUGS: boolean;

  /**
   * Fixed split implementation that handles RegExp edge cases
   * 
   * @param separator - String or RegExp to split on
   * @param limit - Maximum number of splits to perform
   * @returns Array of split string segments
   */
  function fixedSplit(
    this: string,
    separator: string | RegExp | undefined,
    limit: number | undefined
  ): string[];

  /**
   * Fallback split implementation for environments where native split
   * returns incorrect results with (undefined, 0) arguments
   * 
   * @param separator - String or RegExp to split on
   * @param limit - Maximum number of splits to perform
   * @returns Array of split string segments
   */
  function fallbackSplit(
    this: string,
    separator: string | RegExp | undefined,
    limit: number | undefined
  ): string[];

  /**
   * User-facing split method that delegates to native or polyfill implementation
   * 
   * @param separator - String or RegExp to split on
   * @param limit - Maximum number of splits to perform
   * @returns Array of split string segments
   */
  function userSplit(
    this: string,
    separator: string | RegExp | undefined,
    limit: number | undefined
  ): string[];

  /**
   * RegExp split method implementation for Symbol.split
   * 
   * @param regexp - The RegExp instance to split with
   * @param str - The string to split
   * @param limit - Maximum number of splits to perform
   * @returns Array of split string segments or iterator result
   */
  function regexpSplit(
    regexp: RegExp,
    str: string,
    limit: number | undefined
  ): string[] | IteratorResult<string[]>;

  /**
   * Installs the split polyfill on String.prototype and RegExp.prototype
   * 
   * @param methodName - The method name to install ('split')
   * @param arity - The function length/arity (2)
   * @param implementation - Tuple of [String.prototype.split, RegExp.prototype[Symbol.split]]
   */
  function installPolyfill(
    methodName: string,
    arity: number,
    implementation: [SplitMethod, typeof regexpSplit]
  ): void;
}