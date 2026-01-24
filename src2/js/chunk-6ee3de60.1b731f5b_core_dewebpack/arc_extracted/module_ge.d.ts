/**
 * Compares two numbers with a tolerance threshold.
 * Checks if the difference between the first and second number is greater than negative tolerance.
 * 
 * @param e - The first number (minuend)
 * @param t - The second number (subtrahend)
 * @returns True if (e - t) is greater than the negative tolerance threshold, false otherwise
 * 
 * @example
 * // Assuming tolerance threshold u = 0.001
 * compareWithTolerance(5, 4.999) // returns true if difference > -0.001
 */
declare function compareWithTolerance(e: number, t: number): boolean;

export default compareWithTolerance;