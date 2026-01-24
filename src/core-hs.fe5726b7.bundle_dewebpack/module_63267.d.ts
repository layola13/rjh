/**
 * String.prototype.replace polyfill module
 * Provides enhanced replace functionality with support for named capture groups
 */

/**
 * Result of a regex replacement operation
 */
interface RegExpExecArrayWithGroups extends RegExpExecArray {
  /** Named capture groups from the regex match */
  groups?: Record<string, string>;
}

/**
 * Callback function type for String.prototype.replace
 * @param match - The matched substring
 * @param args - Capture groups, offset, and original string
 * @returns Replacement string
 */
type ReplaceCallback = (
  match: string,
  ...args: unknown[]
) => string;

/**
 * Function to generate replacement string from match data
 * @param matched - The matched substring
 * @param str - The original string being searched
 * @param position - The index of the match in the original string
 * @param captures - Array of captured groups
 * @param namedCaptures - Object containing named capture groups
 * @param replacement - The replacement string or function
 * @returns The final replacement string
 */
declare function getSubstitution(
  matched: string,
  str: string,
  position: number,
  captures: Array<string | undefined>,
  namedCaptures: Record<string, string> | undefined,
  replacement: string | ReplaceCallback
): string;

/**
 * Internal implementation of String.prototype.replace
 * @param searchValue - The string or regex to search for
 * @param replaceValue - The replacement string or callback function
 * @returns The string with replacements applied
 */
declare function replace(
  this: unknown,
  searchValue: string | RegExp,
  replaceValue: string | ReplaceCallback
): string;

/**
 * Native String.prototype.replace method wrapper
 * @param searchValue - The string or regex to search for
 * @param replaceValue - The replacement string or callback function
 * @returns The string with replacements applied
 */
declare function nativeReplace(
  this: string,
  searchValue: string | RegExp,
  replaceValue: string | ReplaceCallback
): string;

/**
 * RegExp execution result with groups support
 */
interface RegExpMatchResult {
  /** The matched string */
  0: string;
  /** Captured groups */
  [index: number]: string | undefined;
  /** Match index in the original string */
  index: number;
  /** The original input string */
  input: string;
  /** Named capture groups */
  groups?: Record<string, string>;
  /** Length of the result array */
  length: number;
}

/**
 * Options for the replace operation
 */
interface ReplaceOptions {
  /** Whether the operation completed successfully */
  done: boolean;
  /** The resulting value if done is true */
  value?: string;
}

/**
 * Performs regex-based string replacement with enhanced group support
 * @param regexp - The regular expression to match against
 * @param string - The string to search within
 * @param replaceValue - The replacement string or callback
 * @returns The string with all matches replaced
 */
declare function regexpReplace(
  regexp: RegExp,
  string: string,
  replaceValue: string | ReplaceCallback
): string;

/**
 * Symbol.replace method implementation for RegExp
 */
declare const REPLACE_SYMBOL: unique symbol;

declare global {
  interface RegExp {
    /** Symbol.replace implementation */
    [REPLACE_SYMBOL]?(
      string: string,
      replaceValue: string | ReplaceCallback
    ): string;
  }

  interface String {
    /**
     * Replace occurrences of a pattern in a string
     * @param searchValue - Pattern to search for
     * @param replaceValue - Replacement string or function
     * @returns New string with replacements
     */
    replace(
      searchValue: string | RegExp,
      replaceValue: string | ReplaceCallback
    ): string;
  }
}

export {};