/**
 * RegExp.prototype.exec polyfill/patch
 * 
 * Provides a patched version of RegExp.prototype.exec that fixes various
 * browser inconsistencies and bugs related to:
 * - lastIndex behavior in non-global regexes
 * - Empty capture groups returning undefined vs empty string
 * - Sticky flag (y) implementation issues
 * - Caret (^) behavior in multiline mode
 * 
 * @module RegExpExecPolyfill
 */

/**
 * Configuration for a RegExp instance, including raw regex and capture groups
 */
interface RegExpInternalData {
  /** The raw/unwrapped RegExp instance */
  raw?: RegExp;
  /** Named capture groups metadata */
  groups?: Array<[string, number]>;
}

/**
 * Extended RegExpExecArray with named capture groups
 */
interface ExtendedRegExpExecArray extends RegExpExecArray {
  /** Named capture groups as key-value pairs */
  groups?: Record<string, string | undefined>;
}

/**
 * Patched RegExp.prototype.exec implementation
 * 
 * Fixes cross-browser inconsistencies in regex execution, including:
 * - Proper lastIndex handling for both global and non-global regexes
 * - Correct handling of empty/undefined capture groups
 * - Sticky flag emulation for browsers without native support
 * - Fixed caret behavior in multiline mode
 * 
 * @param this - The RegExp instance
 * @param str - The string to search
 * @returns Match result array with index, input, and groups, or null if no match
 */
type RegExpExecFunction = (this: RegExp, str: string) => ExtendedRegExpExecArray | null;

/**
 * Internal state getter for RegExp instances
 */
type GetRegExpInternalData = (regexp: RegExp) => RegExpInternalData;

/**
 * Converts input to string
 */
type ToString = (value: unknown) => string;

/**
 * Native function call utility
 */
type FunctionCall = <T, A extends unknown[], R>(
  fn: (this: T, ...args: A) => R,
  thisArg: T,
  ...args: A
) => R;

/**
 * Gets RegExp flags as string
 */
type GetRegExpFlags = (regexp: RegExp) => string;

/**
 * Creates an object with null prototype
 */
type CreateNullPrototypeObject = <T = Record<string, unknown>>(proto: null) => T;

/**
 * Feature detection flags
 */
interface RegExpBugs {
  /** Whether lastIndex is incorrectly updated on failed matches */
  readonly BROKEN_LASTINDEX: boolean;
  /** Whether caret (^) behavior is broken in multiline mode */
  readonly BROKEN_CARET: boolean;
  /** Whether empty capture groups return undefined instead of empty string */
  readonly UNDEFINED_EMPTY_GROUPS: boolean;
}

declare const call: FunctionCall;
declare const toString: ToString;
declare const getRegExpFlags: GetRegExpFlags;
declare const getInternalState: GetRegExpInternalData;
declare const createNullPrototypeObject: CreateNullPrototypeObject;
declare const regExpBugs: RegExpBugs;

declare const nativeExec: RegExp['exec'];
declare const nativeStringReplace: string['replace'];
declare const stringCharAt: (str: string, index: number) => string;
declare const stringIndexOf: (str: string, searchString: string) => number;
declare const stringReplace: (str: string, searchValue: string | RegExp, replaceValue: string) => string;
declare const stringSlice: (str: string, start: number, end?: number) => string;

export const patchedExec: RegExpExecFunction;