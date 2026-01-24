/**
 * Polyfill for Object.is() method
 * Determines whether two values are the same value according to the SameValue algorithm
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */

/**
 * Checks if two values are the same value using the SameValue algorithm.
 * This differs from === in two cases:
 * - Object.is(NaN, NaN) returns true (=== returns false)
 * - Object.is(+0, -0) returns false (=== returns true)
 * 
 * @param value1 - The first value to compare
 * @param value2 - The second value to compare
 * @returns true if the values are the same, false otherwise
 */
export declare function objectIs(value1: unknown, value2: unknown): boolean;

/**
 * Type guard to check if the module exports Object.is or a polyfill
 */
export declare const is: typeof Object.is;

export default is;