/**
 * Converts a number to an integer by truncating towards zero.
 * 
 * This function implements the ToInteger abstract operation from ECMAScript specification.
 * - For positive numbers: rounds down (floor)
 * - For negative numbers: rounds up (ceil)
 * - For NaN: returns 0
 * 
 * @param value - The numeric value to convert to integer
 * @returns The integer representation of the input value
 * 
 * @example
 *