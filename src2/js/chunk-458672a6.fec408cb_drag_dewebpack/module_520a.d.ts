/**
 * Enhanced RegExp.prototype.exec polyfill
 * 
 * Provides a consistent implementation of RegExp.prototype.exec that fixes:
 * 1. Incorrect lastIndex behavior in some browsers (c flag)
 * 2. Missing undefined values for optional capturing groups (u flag)
 * 
 * @module RegExpExecPolyfill
 */

/**
 * Extracts RegExp flags from a RegExp instance
 * @param regexp - The regular expression to extract flags from
 * @returns String containing the regexp flags (e.g., "gi", "m")
 */
type GetRegExpFlags = (regexp: RegExp) => string;

/**
 * Type for the original RegExp.prototype.exec method
 */
type NativeExecFunction = (this: RegExp, str: string) => RegExpExecArray | null;

/**
 * Polyfilled exec function with fixes for legacy browser issues
 * 
 * @param str - The string to search within
 * @returns Match array with index and input properties, or null if no match
 * 
 * @remarks
 * This function addresses two legacy issues:
 * - `hasLastIndexBug`: Some engines incorrectly update lastIndex on non-global regexes
 * - `hasUndefinedGroupBug`: Some engines don't set undefined for optional unmatched groups
 */
type PolyfillExecFunction = (this: RegExp, str: string) => RegExpExecArray | null;

/**
 * Enhanced RegExp exec implementation
 * Fixes browser inconsistencies with lastIndex and undefined capturing groups
 */
declare const polyfillExec: PolyfillExecFunction;

export default polyfillExec;

/**
 * Implementation details (not exported):
 * 
 * @internal
 * @constant {NativeExecFunction} nativeExec - Original RegExp.prototype.exec
 * @constant {Function} nativeReplace - Original String.prototype.replace
 * @constant {GetRegExpFlags} getFlags - Function to get regexp flags (imported dependency)
 * @constant {string} LAST_INDEX - Property name constant
 * @constant {boolean} hasLastIndexBug - Whether lastIndex is incorrectly updated
 * @constant {boolean} hasUndefinedGroupBug - Whether optional groups missing undefined
 */

/**
 * Bug detection tests:
 * - hasLastIndexBug: Tests if non-global regexes incorrectly update lastIndex
 * - hasUndefinedGroupBug: Tests if optional non-participating groups return undefined
 * 
 * Polyfill logic:
 * 1. Store original lastIndex if hasLastIndexBug
 * 2. Create validation regex if hasUndefinedGroupBug
 * 3. Execute native exec
 * 4. Restore correct lastIndex for non-global regexes
 * 5. Fix undefined values in capturing groups for optional matches
 */