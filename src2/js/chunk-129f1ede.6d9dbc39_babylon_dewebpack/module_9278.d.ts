/**
 * Number.MIN_SAFE_INTEGER Polyfill
 * 
 * Defines the minimum safe integer in JavaScript.
 * This represents the smallest integer value that can be accurately represented
 * as a Number without losing precision (-(2^53 - 1)).
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER
 */

/**
 * The minimum safe integer in JavaScript (-(2^53 - 1))
 */
declare global {
  interface NumberConstructor {
    /**
     * The minimum safe integer in JavaScript.
     * Equal to -(2^53 - 1) or -9007199254740991.
     * 
     * Represents the smallest integer n such that n and n - 1 are both
     * exactly representable as a Number value.
     * 
     * @constant
     * @type {number}
     * @example
     * console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
     */
    readonly MIN_SAFE_INTEGER: -9007199254740991;
  }
}

export {};