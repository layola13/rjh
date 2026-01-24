/**
 * RegExp flags to string converter
 * 
 * Converts a RegExp object's flags into a string representation.
 * This module extracts boolean flag properties from a RegExp instance
 * and concatenates them into a single flags string.
 * 
 * @module RegExpFlagsConverter
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags
 */

/**
 * RegExp flags interface
 * Represents the boolean flag properties available on RegExp objects
 */
interface RegExpFlags {
  /** Global flag - match all occurrences */
  global?: boolean;
  /** Case-insensitive flag - ignore case when matching */
  ignoreCase?: boolean;
  /** Multiline flag - ^ and $ match line boundaries */
  multiline?: boolean;
  /** Unicode flag - treat pattern as Unicode code points */
  unicode?: boolean;
  /** Sticky flag - matches only from lastIndex position */
  sticky?: boolean;
}

/**
 * Converts RegExp flags to their string representation
 * 
 * @param this - The RegExp instance to extract flags from
 * @returns A string containing flag characters (e.g., "gimuy")
 * 
 * @example
 *