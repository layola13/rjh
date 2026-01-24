/**
 * Regular Expression Flags Converter
 * 
 * Converts a RegExp object's flag properties into a string representation.
 * This module provides functionality to serialize RegExp flags (global, ignoreCase, 
 * multiline, unicode, sticky) into their corresponding character codes.
 * 
 * @module RegExpFlagsConverter
 */

/**
 * Properties that define RegExp flags
 */
interface RegExpFlagsObject {
  /** Global flag - matches all occurrences */
  global?: boolean;
  /** Case-insensitive flag */
  ignoreCase?: boolean;
  /** Multi-line flag - ^ and $ match line boundaries */
  multiline?: boolean;
  /** Unicode flag - treat pattern as Unicode code points */
  unicode?: boolean;
  /** Sticky flag - matches only from lastIndex position */
  sticky?: boolean;
}

/**
 * Converts RegExp flag properties to their string representation.
 * 
 * Takes a RegExp-like object and builds a string of flag characters based on 
 * which flags are enabled. The order follows the standard: gimuy
 * 
 * @param this - The RegExp object whose flags should be converted
 * @returns A string containing the enabled flags (e.g., "gi", "gim", "giuy")
 * 
 * @example
 * const regex = /test/gi;
 * const flags = getRegExpFlags.call(regex); // Returns "gi"
 * 
 * @example
 * const regex = /pattern/musy;
 * const flags = getRegExpFlags.call(regex); // Returns "musy"
 */
export default function getRegExpFlags(this: RegExpFlagsObject): string {
  const regExpObject: RegExpFlagsObject = this;
  let flagsString = "";

  if (regExpObject.global) {
    flagsString += "g";
  }
  if (regExpObject.ignoreCase) {
    flagsString += "i";
  }
  if (regExpObject.multiline) {
    flagsString += "m";
  }
  if (regExpObject.unicode) {
    flagsString += "u";
  }
  if (regExpObject.sticky) {
    flagsString += "y";
  }

  return flagsString;
}