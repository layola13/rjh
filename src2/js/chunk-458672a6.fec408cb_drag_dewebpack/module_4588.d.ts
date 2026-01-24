/**
 * Converts a number to an integer by truncating towards zero.
 * 
 * @remarks
 * This function converts any value to a number, then:
 * - Returns 0 if the value is NaN
 * - Floors positive numbers (rounds down)
 * - Ceils negative numbers (rounds up towards zero)
 * 
 * This effectively truncates the decimal part, moving towards zero.
 * 
 * @param value - The value to convert to an integer
 * @returns The integer result after truncation towards zero
 * 
 * @example
 *