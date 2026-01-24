/**
 * Module: module_0bfb
 * Original ID: 0bfb
 * Dependencies: cb7c (object validation utility)
 */

/**
 * RegExp flags interface representing the available flags in a regular expression
 */
export interface RegExpFlags {
  /** Global search flag */
  global?: boolean;
  /** Case-insensitive search flag */
  ignoreCase?: boolean;
  /** Multi-line search flag */
  multiline?: boolean;
  /** Unicode flag */
  unicode?: boolean;
  /** Sticky search flag */
  sticky?: boolean;
}

/**
 * Extracts and returns the flags string from a RegExp-like object.
 * 
 * This function reads the boolean flag properties from a RegExp object
 * and constructs the corresponding flags string.
 * 
 * @param this - The RegExp-like object to extract flags from
 * @returns A string containing the active flags (e.g., "gimu")
 * 
 * @example
 *