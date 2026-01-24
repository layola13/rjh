/**
 * Number.prototype.toFixed polyfill module
 * 
 * This module provides a polyfill for the Number.prototype.toFixed method
 * that fixes several edge cases and ensures consistent behavior across environments.
 */

/**
 * Calculates power using binary exponentiation algorithm
 * @param base - The base number
 * @param exponent - The exponent
 * @param accumulator - The accumulator for the result
 * @returns The calculated power result
 */
declare function calculatePower(base: number, exponent: number, accumulator: number): number;

/**
 * Multiplies an array representation of a number by a factor
 * @param digits - Array representing digits of the number (base 1e7)
 * @param factor - The multiplication factor
 * @param carry - Initial carry value
 */
declare function multiplyDigitArray(digits: number[], factor: number, carry: number): void;

/**
 * Divides an array representation of a number by a divisor
 * @param digits - Array representing digits of the number (base 1e7)
 * @param divisor - The division divisor
 */
declare function divideDigitArray(digits: number[], divisor: number): void;

/**
 * Converts digit array to string representation
 * @param digits - Array representing digits of the number (base 1e7)
 * @returns String representation of the number
 */
declare function digitArrayToString(digits: number[]): string;

/**
 * Enhanced toFixed method options
 */
interface ToFixedOptions {
  /**
   * Number of digits to appear after the decimal point
   * Must be between 0 and 20 (inclusive)
   */
  fractionDigits: number;
}

/**
 * Number prototype extensions
 */
interface Number {
  /**
   * Formats a number using fixed-point notation with enhanced precision handling
   * 
   * This polyfill fixes several issues with the native implementation:
   * - Correct handling of very small numbers (e.g., 8e-5)
   * - Proper rounding behavior (e.g., 0.9, 1.255)
   * - Accurate representation of large integers (e.g., 0xde0b6b3a7640080)
   * 
   * @param fractionDigits - The number of digits to appear after the decimal point (0-20)
   * @returns A string representation of the number in fixed-point notation
   * @throws {RangeError} If fractionDigits is not between 0 and 20
   * 
   * @example
   *