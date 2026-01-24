/**
 * Module: module_f64_rem
 * Original ID: f64-rem
 * 
 * Calculates the remainder of the division of two 64-bit floating point numbers.
 * This operation is equivalent to the modulo operator in JavaScript.
 * 
 * @remarks
 * The result has the same sign as the dividend (first operand).
 * Special cases:
 * - If either operand is NaN, the result is NaN
 * - If the dividend is ±Infinity, the result is NaN
 * - If the dividend is ±0 and divisor is not zero, the result is ±0
 * - If the divisor is ±Infinity and dividend is finite, the result is the dividend
 */

/**
 * Computes the floating-point remainder of dividing two numbers.
 * 
 * @param dividend - The number to be divided (numerator)
 * @param divisor - The number to divide by (denominator)
 * @returns The remainder of dividend divided by divisor
 * 
 * @example
 *