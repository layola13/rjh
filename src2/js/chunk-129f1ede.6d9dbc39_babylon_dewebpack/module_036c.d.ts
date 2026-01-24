/**
 * Number.prototype.toFixed polyfill module
 * Provides a standards-compliant implementation of toFixed() with proper rounding
 */

/**
 * Multiplies the internal decimal representation by a value and adds it
 * @param value - The value to multiply by
 * @param addend - The value to add after multiplication
 */
declare function multiplyAndAdd(value: number, addend: number): void;

/**
 * Divides the internal decimal representation by a divisor
 * @param divisor - The divisor to divide by
 */
declare function divideInternal(divisor: number): void;

/**
 * Converts the internal decimal representation to a string
 * @returns The string representation of the accumulated value
 */
declare function convertToString(): string;

/**
 * Computes exponentiation using binary exponentiation algorithm
 * @param base - The base number
 * @param exponent - The exponent (integer)
 * @param accumulator - The accumulated result
 * @returns base^exponent * accumulator
 */
declare function fastPower(base: number, exponent: number, accumulator: number): number;

/**
 * Internal array storing decimal digits in base 10^7 format
 * Used for high-precision fixed-point arithmetic
 */
declare const decimalDigits: [number, number, number, number, number, number];

/**
 * Error message for incorrect toFixed invocation
 */
declare const ERROR_MESSAGE: "Number.toFixed: incorrect invocation!";

/**
 * Zero character constant used for string padding
 */
declare const ZERO_CHAR: "0";

/**
 * Polyfilled Number.prototype.toFixed implementation
 */
declare module "Number" {
  interface NumberConstructor {
    prototype: {
      /**
       * Formats a number using fixed-point notation
       * @param fractionDigits - Number of digits after the decimal point (0-20)
       * @returns String representation with specified decimal places
       * @throws RangeError if fractionDigits is not between 0 and 20
       */
      toFixed(fractionDigits?: number): string;
    };
  }
}

export {};