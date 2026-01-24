/**
 * String replace implementation with support for regular expressions and replacement functions.
 * This module provides advanced string replacement functionality similar to String.prototype.replace.
 * 
 * @module StringReplace
 */

/**
 * Represents a regular expression match result with index and groups information.
 */
interface RegExpMatchResult extends RegExpExecArray {
  /** The index at which the match was found in the original string */
  index: number;
  /** Named capture groups (if any) */
  groups?: Record<string, string>;
}

/**
 * Function signature for replacement callbacks.
 * 
 * @param match - The matched substring
 * @param captureGroups - Array of captured groups from the match
 * @param offset - The offset where the match occurred in the original string
 * @param originalString - The complete original string being searched
 * @param namedGroups - Object containing named capture groups (if any)
 * @returns The replacement string
 */
type ReplacerFunction = (
  match: string,
  ...args: Array<string | number | Record<string, string> | undefined>
) => string;

/**
 * Configuration for the replace operation.
 */
interface ReplaceConfig {
  /** Whether the search pattern is global */
  global: boolean;
  /** Whether the search pattern is unicode-aware */
  unicode?: boolean;
  /** Current position in the regex execution */
  lastIndex: number;
}

/**
 * Performs string replacement with support for regular expressions and custom replacer functions.
 * 
 * @param searchPattern - The regular expression pattern to search for
 * @param sourceString - The string to perform replacements on
 * @param replacer - Either a replacement string or a function that generates replacements
 * @returns The string with replacements applied
 * 
 * @example
 *