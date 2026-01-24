/**
 * Module: module_GE
 * Original ID: GE
 * 
 * Compares two numbers with a threshold tolerance.
 * Returns true if the difference between the first and second number
 * is greater than the negative threshold.
 */

/**
 * Threshold constant used for numeric comparison tolerance
 */
declare const COMPARISON_THRESHOLD: number;

/**
 * Compares two numbers with a tolerance threshold
 * @param first - The first number to compare
 * @param second - The second number to compare
 * @returns True if (first - second) > -COMPARISON_THRESHOLD
 */
declare function isGreaterWithinThreshold(first: number, second: number): boolean;

export { COMPARISON_THRESHOLD, isGreaterWithinThreshold };