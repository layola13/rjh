/**
 * String.prototype.replace polyfill module
 * 
 * This module provides a polyfill for the String.prototype.replace method,
 * supporting advanced features like named capture groups and proper handling
 * of RegExp flags (global, unicode).
 * 
 * @module StringReplacePolyfill
 */

/**
 * Defines the polyfill for String.prototype.replace
 * 
 * @param installPolyfill - Function to install the polyfill
 * @param methodName - The method name to polyfill ('replace')
 * @param argumentCount - Expected argument count (2)
 * @param implementation - The polyfill implementation factory
 */
declare function defineReplacePolyfill(
  installPolyfill: InstallPolyfillFunction,
  methodName: string,
  argumentCount: number,
  implementation: ReplaceImplementationFactory
): void;

/**
 * Factory function that creates the replace polyfill implementation
 * 
 * @param requireThis - Function to ensure 'this' is valid
 * @param nativeReplace - Reference to native replace implementation
 * @param toObject - Function to convert value to object
 * @param tryNativeExecution - Function to attempt native execution first
 * @returns Tuple of [userFacingReplace, internalReplaceLogic]
 */
type ReplaceImplementationFactory = (
  requireThis: (context: unknown) => void,
  nativeReplace: NativeReplaceFunction,
  toObject: (value: unknown) => Record<string, unknown>,
  tryNativeExecution: (
    nativeFunc: Function,
    target: unknown,
    context: unknown,
    replacement: unknown
  ) => ExecutionResult
) => [UserFacingReplace, InternalReplaceLogic];

/**
 * Result of attempting native execution
 */
interface ExecutionResult {
  /** Whether execution completed successfully */
  done: boolean;
  /** The returned value if execution completed */
  value?: string;
}

/**
 * User-facing replace method signature
 * 
 * @param searchValue - String or RegExp to search for
 * @param replaceValue - String or function to replace with
 * @returns The resulting string after replacement
 */
type UserFacingReplace = (
  searchValue: string | RegExp,
  replaceValue: string | ReplacerFunction
) => string;

/**
 * Internal replace logic implementation
 * 
 * @param pattern - The RegExp pattern to match
 * @param replacement - String or function to replace matches with
 * @returns The resulting string after replacement
 */
type InternalReplaceLogic = (
  pattern: RegExp,
  replacement: string | ReplacerFunction
) => string;

/**
 * Function type for custom replacer
 * 
 * @param match - The matched substring
 * @param captureGroups - Captured groups from the match
 * @param offset - The offset of the match in the original string
 * @param fullString - The complete original string
 * @param namedGroups - Object containing named capture groups (if any)
 * @returns The replacement string
 */
type ReplacerFunction = (
  match: string,
  ...captureGroups: Array<string | undefined>
) => string;

/**
 * Native String.prototype.replace function reference
 */
type NativeReplaceFunction = (
  searchValue: string | RegExp,
  replaceValue: string | ReplacerFunction
) => string;

/**
 * Function to install a polyfill for a built-in method
 */
type InstallPolyfillFunction = (
  methodName: string,
  argumentCount: number,
  implementation: Function
) => void;

/**
 * Match result from RegExp.exec
 */
interface RegExpMatchResult extends Array<string> {
  /** Index of the match in the string */
  index: number;
  /** The original input string */
  input: string;
  /** Named capture groups (ES2018+) */
  groups?: Record<string, string>;
}

/**
 * Utility to convert a value to an integer within valid range
 * 
 * @param value - The value to convert
 * @returns Integer representation
 */
declare function toInteger(value: unknown): number;

/**
 * Utility to get the length property of an object
 * 
 * @param obj - The object to measure
 * @returns The length value
 */
declare function getLength(obj: unknown): number;

/**
 * Utility to advance RegExp lastIndex for unicode strings
 * 
 * @param str - The string being searched
 * @param index - Current index
 * @param unicode - Whether unicode flag is enabled
 * @returns Next valid index
 */
declare function advanceStringIndex(
  str: string,
  index: number,
  unicode: boolean
): number;

/**
 * Utility to execute RegExp and return match result
 * 
 * @param regexp - The RegExp to execute
 * @param str - The string to search
 * @returns Match result or null
 */
declare function regExpExec(
  regexp: RegExp,
  str: string
): RegExpMatchResult | null;

/**
 * Pattern for matching replacement patterns with named groups
 * Matches: $, $&, $`, $', $<name>, $1-$99
 */
declare const REPLACEMENT_PATTERN_WITH_NAMED_GROUPS: RegExp;

/**
 * Pattern for matching basic replacement patterns
 * Matches: $, $&, $`, $', $1-$99
 */
declare const REPLACEMENT_PATTERN_BASIC: RegExp;

/**
 * Maximum value calculation utility
 */
declare const max: typeof Math.max;

/**
 * Minimum value calculation utility
 */
declare const min: typeof Math.min;

/**
 * Floor value calculation utility
 */
declare const floor: typeof Math.floor;

/**
 * Processes replacement string with substitution patterns
 * 
 * @param matched - The matched substring
 * @param fullString - The complete original string
 * @param position - Position of the match
 * @param captures - Array of captured groups
 * @param namedCaptures - Object with named capture groups
 * @param replacementPattern - The replacement pattern string
 * @returns Processed replacement string
 */
declare function getSubstitution(
  matched: string,
  fullString: string,
  position: number,
  captures: Array<string | undefined>,
  namedCaptures: Record<string, string> | undefined,
  replacementPattern: string
): string;

export {
  defineReplacePolyfill,
  UserFacingReplace,
  InternalReplaceLogic,
  ReplacerFunction,
  RegExpMatchResult,
  ExecutionResult,
  getSubstitution
};