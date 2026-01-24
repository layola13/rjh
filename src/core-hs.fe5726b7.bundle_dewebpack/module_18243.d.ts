/**
 * RegExp execution wrapper that ensures compatible behavior across different environments.
 * 
 * This module provides a safe wrapper around RegExp.prototype.exec that:
 * - Checks if the exec method is callable
 * - Validates the return value
 * - Ensures the receiver is a RegExp instance
 * 
 * @module RegExpExecWrapper
 */

/**
 * Executes a regular expression match on a string with type safety and validation.
 * 
 * @param regexp - The regular expression object to execute
 * @param str - The string to match against
 * @returns The match result array or null if no match found
 * @throws {TypeError} If the receiver is not a compatible RegExp object
 * 
 * @example
 *