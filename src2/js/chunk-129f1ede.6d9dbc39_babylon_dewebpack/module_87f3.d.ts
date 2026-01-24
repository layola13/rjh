/**
 * Number.MAX_SAFE_INTEGER Polyfill
 * 
 * Adds the MAX_SAFE_INTEGER constant to the Number constructor.
 * Represents the maximum safe integer in JavaScript (2^53 - 1).
 * 
 * @module NumberMaxSafeInteger
 */

/**
 * The maximum safe integer constant (2^53 - 1)
 * @constant
 */
declare const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Extends the Number interface with MAX_SAFE_INTEGER property
 */
declare global {
  interface NumberConstructor {
    /**
     * The maximum safe integer in JavaScript.
     * Equal to 2^53 - 1 (9,007,199,254,740,991).
     * 
     * Any integer value between -MAX_SAFE_INTEGER and MAX_SAFE_INTEGER
     * can be represented exactly in JavaScript without loss of precision.
     * 
     * @example
     * console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
     * console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // true (unsafe!)
     */
    readonly MAX_SAFE_INTEGER: number;
  }
}

export {};