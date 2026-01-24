/**
 * String repetition utility function
 * 
 * This module implements a polyfill for String.prototype.repeat() method.
 * It repeats the string a specified number of times and returns the concatenated result.
 * 
 * @module StringRepeat
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
 */

/**
 * Repeats a string a specified number of times using an efficient algorithm.
 * 
 * This function uses a binary exponentiation approach (also known as exponentiation by squaring)
 * to efficiently build the repeated string in O(log n) iterations instead of O(n).
 * 
 * Algorithm:
 * - Converts the context (`this`) to a string
 * - Validates that the count is a non-negative finite number
 * - Uses bitwise operations to check odd/even counts
 * - Doubles the source string and halves the count in each iteration
 * - Appends to result when count is odd
 * 
 * @param this - The string context to be repeated (implicit this binding)
 * @param count - The number of times to repeat the string
 * 
 * @returns The repeated string concatenated `count` times
 * 
 * @throws {RangeError} When count is negative or infinity
 * @throws {TypeError} When called on null or undefined (via RequireObjectCoercible)
 * 
 * @example
 *