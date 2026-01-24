/**
 * Number.isSafeInteger polyfill module
 * 
 * Provides a safe integer check implementation that verifies if a value
 * is an integer within the safe integer range (-(2^53 - 1) to 2^53 - 1).
 */

/**
 * Maximum safe integer value in JavaScript (2^53 - 1)
 */
declare const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if a value is a safe integer.
 * 
 * A safe integer is an integer that:
 * - Can be exactly represented as an IEEE-754 double precision number
 * - Whose IEEE-754 representation cannot be the result of rounding any other integer
 * 
 * @param value - The value to check
 * @returns True if the value is a safe integer, false otherwise
 * 
 * @example
 *