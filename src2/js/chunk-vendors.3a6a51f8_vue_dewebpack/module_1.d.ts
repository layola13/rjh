/**
 * String split implementation with RegExp support
 * Splits a string using a regular expression pattern with advanced Unicode and sticky flag handling
 * 
 * @module StringSplitRegExp
 */

/**
 * Performs string splitting with RegExp, handling Unicode, sticky flags, and limit constraints
 * 
 * @param pattern - The RegExp pattern or string to split by
 * @param limit - Maximum number of splits to perform (optional)
 * @returns Array of split string segments
 * 
 * @remarks
 * This function implements advanced string splitting with:
 * - Unicode-aware character advancement
 * - Sticky flag (y) support for position-based matching
 * - Case-insensitive (i) and multiline (m) flag preservation
 * - Capture group inclusion in results
 * - Efficient handling of zero-length matches
 */
declare function splitWithRegExp(
  this: string,
  pattern: RegExp | string,
  limit?: number
): string[];

/**
 * Type definition for RegExp match execution result
 */
type RegExpExecResult = RegExpExecArray | null;

/**
 * Helper function type for executing RegExp match
 * 
 * @param regexp - The regular expression to execute
 * @param str - The string to match against
 * @returns Match result array or null if no match
 */
type RegExpExecFunction = (regexp: RegExp, str: string) => RegExpExecResult;

/**
 * Helper function type for advancing string position with Unicode awareness
 * 
 * @param str - The source string
 * @param index - Current position in string
 * @param unicode - Whether to handle Unicode surrogate pairs
 * @returns Next valid character position
 */
type AdvanceStringIndexFunction = (
  str: string,
  index: number,
  unicode: boolean
) => number;

/**
 * Helper function type for calculating minimum of two values
 * 
 * @param a - First value
 * @param b - Second value
 * @returns Minimum of the two values
 */
type MinFunction = (a: number, b: number) => number;

/**
 * Helper function type for converting value to object
 * 
 * @param value - Value to convert
 * @returns Object representation
 */
type RequireObjectCoercibleFunction = <T>(value: T) => T;

/**
 * Helper function type for getting RegExp species constructor
 * 
 * @param regexp - Source RegExp
 * @param constructor - Constructor function
 * @returns Species constructor for creating new RegExp
 */
type SpeciesConstructorFunction = (
  regexp: RegExp,
  constructor: RegExpConstructor
) => RegExpConstructor;

/**
 * Constants for split operation
 */
declare const MAX_UINT32: number;
declare const SUPPORTS_STICKY_FLAG: boolean;

/**
 * RegExp flags interface
 */
interface RegExpFlags {
  /** Case-insensitive flag */
  readonly ignoreCase: boolean;
  /** Multiline flag */
  readonly multiline: boolean;
  /** Unicode flag */
  readonly unicode: boolean;
  /** Sticky flag */
  readonly sticky?: boolean;
  /** Global flag */
  readonly global?: boolean;
  /** Source pattern */
  readonly source: string;
}

export { splitWithRegExp, RegExpExecResult, RegExpFlags };