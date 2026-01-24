/**
 * Invariant function for assertion checks in production environments.
 * Throws an error if the condition is false.
 * 
 * @module Invariant
 */

/**
 * Asserts that a condition is truthy, otherwise throws an error.
 * In production builds, provides a generic minified error message.
 * In development builds, formats the error message with provided arguments.
 * 
 * @param condition - The condition to check. If falsy, an error is thrown.
 * @param message - Optional error message template. Use %s for string substitution placeholders.
 * @param arg1 - First substitution argument for the error message.
 * @param arg2 - Second substitution argument for the error message.
 * @param arg3 - Third substitution argument for the error message.
 * @param arg4 - Fourth substitution argument for the error message.
 * @param arg5 - Fifth substitution argument for the error message.
 * @param arg6 - Sixth substitution argument for the error message.
 * 
 * @throws {InvariantViolation} Always throws when condition is falsy.
 * 
 * @example
 *