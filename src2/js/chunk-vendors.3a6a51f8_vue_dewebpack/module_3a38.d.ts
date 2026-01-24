/**
 * Converts a number to an integer by truncating towards zero.
 * 
 * @remarks
 * This function implements truncation behavior:
 * - For positive numbers: rounds down (floor)
 * - For negative numbers: rounds up (ceil)
 * - Returns 0 for NaN values
 * 
 * @param value - The numeric value to convert to integer
 * @returns The truncated integer value, or 0 if input is NaN
 * 
 * @example
 *