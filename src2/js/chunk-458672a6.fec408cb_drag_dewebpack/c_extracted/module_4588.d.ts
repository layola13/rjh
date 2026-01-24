/**
 * Converts a number to an integer by truncating towards zero.
 * 
 * @description
 * This function implements integer conversion by:
 * - Using Math.floor for positive numbers (rounds down)
 * - Using Math.ceil for negative numbers (rounds up towards zero)
 * - Returning 0 for NaN values
 * 
 * @param value - The numeric value to convert to an integer
 * @returns The integer representation of the input, or 0 if the input is NaN
 * 
 * @example
 *