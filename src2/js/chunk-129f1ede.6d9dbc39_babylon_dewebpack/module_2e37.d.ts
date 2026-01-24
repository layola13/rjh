/**
 * Number.EPSILON polyfill
 * 
 * Represents the difference between 1 and the smallest floating point number
 * greater than 1 that is representable as a Number value.
 * 
 * The value is approximately 2.2204460492503130808472633361816E-16, or 2^-52
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON
 */
declare global {
  interface NumberConstructor {
    /**
     * The smallest interval between two representable numbers.
     * Equals to 2^-52 (approximately 2.220446049250313e-16)
     * 
     * Useful for comparing floating-point numbers with a tolerance:
     * @example
     * function areEqual(a: number, b: number): boolean {
     *   return Math.abs(a - b) < Number.EPSILON;
     * }
     */
    readonly EPSILON: number;
  }
}

export {};