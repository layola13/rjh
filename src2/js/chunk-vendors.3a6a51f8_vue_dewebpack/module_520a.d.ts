/**
 * RegExp.prototype.exec polyfill/fix
 * 
 * Fixes two issues with native RegExp.exec:
 * 1. lastIndex property not being reset properly in older browsers
 * 2. Capturing groups returning empty strings instead of undefined
 * 
 * @module RegExpExecPolyfill
 */

/**
 * Gets the flags string from a RegExp instance
 * @internal
 */
declare function getRegExpFlags(regexp: RegExp): string;

/**
 * Polyfilled RegExp.prototype.exec function
 * 
 * @param input - The string to match against
 * @returns The match result array or null if no match found
 * 
 * @remarks
 * This polyfill addresses:
 * - `lastIndex` not being updated correctly for global/sticky regexps
 * - Capturing groups incorrectly returning empty strings instead of undefined
 */
declare function polyfillExec(this: RegExp, input: string): RegExpExecArray | null;

/**
 * The exported exec function - either native or polyfilled
 * 
 * @param input - The string to search
 * @returns Array of matches with captured groups, or null
 * 
 * @example
 *