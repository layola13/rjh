/**
 * Checks if a value is NaN by leveraging the unique property that NaN is not equal to itself.
 * This is a reliable way to detect NaN values, as NaN is the only value in JavaScript
 * that returns false when compared to itself.
 * 
 * @param value - The value to check for NaN
 * @returns True if the value is NaN, false otherwise
 * 
 * @example
 *