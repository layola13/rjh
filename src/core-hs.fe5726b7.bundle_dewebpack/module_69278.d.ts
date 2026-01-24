/**
 * RegExp 'y' (sticky) flag compatibility detection module
 * 
 * This module tests for various bugs and missing features related to the 'y' (sticky) flag
 * in JavaScript RegExp implementations across different environments.
 */

/**
 * Detection result for whether the caret (^) anchor behaves incorrectly with sticky flag
 * 
 * Tests if a regex with both '^' and 'gy' flags incorrectly matches when lastIndex
 * is set to a position that isn't the start of the string.
 * 
 * Expected behavior: /^r/gy with lastIndex=2 should NOT match "str"
 * Bug: Some implementations incorrectly match
 */
export const BROKEN_CARET: boolean;

/**
 * Detection result for whether the sticky flag property is missing
 * 
 * Tests if the 'sticky' property is available on RegExp instances created
 * with the 'y' flag.
 * 
 * Expected behavior: regex.sticky should return true for /a/y
 * Bug: Some implementations don't expose the sticky property
 */
export const MISSED_STICKY: boolean;

/**
 * Detection result for whether the 'y' (sticky) flag is unsupported
 * 
 * Tests if the 'y' flag is completely unsupported by attempting to create
 * a regex with it and checking if matches respect the lastIndex position.
 * 
 * Expected behavior: /a/y with lastIndex=2 should NOT match "abcd" at position 0
 * Bug: Some implementations ignore the 'y' flag entirely
 */
export const UNSUPPORTED_Y: boolean;

/**
 * RegExp sticky flag compatibility flags
 */
export interface RegExpStickyCompatibility {
  /** Whether the caret anchor is broken with sticky flag */
  BROKEN_CARET: boolean;
  /** Whether the sticky property is missing */
  MISSED_STICKY: boolean;
  /** Whether the 'y' flag is unsupported */
  UNSUPPORTED_Y: boolean;
}

declare const regExpStickyFlags: RegExpStickyCompatibility;

export default regExpStickyFlags;