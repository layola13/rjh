/**
 * RegExp.prototype.toString polyfill module
 * 
 * Ensures RegExp.prototype.toString returns the correct format "/source/flags"
 * across different JavaScript environments.
 */

/**
 * Configuration for the function name property
 */
interface FunctionNameConfig {
  /** Whether the PROPER flag is enabled */
  PROPER: boolean;
}

/**
 * Options for redefining properties
 */
interface RedefineOptions {
  /** Whether the operation is unsafe (bypasses certain checks) */
  unsafe: boolean;
}

/**
 * Structure representing a RegExp-like object
 */
interface RegExpLike {
  /** The pattern source string */
  source: string;
  /** The flags string */
  flags: string;
}

/**
 * Checks if the function name property is properly supported
 */
declare const isFunctionNameProper: boolean;

/**
 * Redefines a method on an object prototype
 * @param prototype - The prototype object to modify
 * @param methodName - The name of the method to redefine
 * @param implementation - The new implementation function
 * @param options - Configuration options for the redefinition
 */
declare function redefineMethod(
  prototype: object,
  methodName: string,
  implementation: () => string,
  options: RedefineOptions
): void;

/**
 * Validates and converts a value to an object
 * @param value - The value to convert to an object
 * @returns The converted object
 */
declare function requireObjectCoercible(value: unknown): object;

/**
 * Converts a value to a string
 * @param value - The value to convert
 * @returns The string representation
 */
declare function toString(value: unknown): string;

/**
 * Gets the RegExp flags from a RegExp instance
 * @param regexp - The RegExp instance
 * @returns The flags string
 */
declare function getRegExpFlags(regexp: RegExp): string;

/**
 * Tests if a function throws an error
 * @param fn - The function to test
 * @returns True if the function throws an error
 */
declare function fails(fn: () => void): boolean;

/** The method name being polyfilled */
declare const METHOD_NAME: 'toString';

/** Reference to the native RegExp.prototype.toString */
declare const nativeRegExpToString: () => string;

/**
 * Checks if the native toString implementation is broken
 * Returns true if calling toString on a plain object with source/flags
 * does not produce the expected "/source/flags" format
 */
declare const hasToStringBug: boolean;

/**
 * Checks if the toString method has an incorrect name property
 */
declare const hasIncorrectName: boolean;

/**
 * Polyfills RegExp.prototype.toString to ensure correct behavior
 * 
 * The polyfill is applied if either:
 * 1. The native implementation has a bug (hasToStringBug is true)
 * 2. The function name property is incorrect (hasIncorrectName is true)
 * 
 * @this RegExp - The RegExp instance
 * @returns A string in the format "/source/flags"
 */
declare function polyfillRegExpToString(this: RegExp): string;

export {
  isFunctionNameProper,
  redefineMethod,
  requireObjectCoercible,
  toString,
  getRegExpFlags,
  fails,
  METHOD_NAME,
  nativeRegExpToString,
  hasToStringBug,
  hasIncorrectName,
  polyfillRegExpToString
};