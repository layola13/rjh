/**
 * RegExp exec method polyfill/wrapper
 * 
 * Safely executes a regular expression's exec method with proper type checking.
 * Ensures that custom exec implementations return valid results and falls back
 * to the native RegExp.prototype.exec when needed.
 * 
 * @module RegExpExecShim
 */

/**
 * Type guard function that returns the internal [[Class]] of an object
 * Corresponds to the imported classof utility (23c6)
 */
type ClassOfFunction = (value: unknown) => string;

/**
 * Result of a RegExp exec operation
 */
type RegExpExecResult = RegExpExecArray | null;

/**
 * Executes a regular expression match against a string with proper validation
 * 
 * @param regexp - The regular expression object to execute
 * @param str - The string to match against
 * @returns The exec result array with match details, or null if no match
 * @throws {TypeError} If the exec method returns a non-object/non-null value
 * @throws {TypeError} If called on a non-RegExp object without a valid exec method
 */
declare function regExpExec(
  regexp: RegExp,
  str: string
): RegExpExecResult;

export default regExpExec;