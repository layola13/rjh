/**
 * Converts a value to a valid array length (non-negative integer).
 * 
 * @param value - The value to convert to a length
 * @returns A valid non-negative integer representing the length
 * @throws {RangeError} When the converted value is not a valid length (negative or non-integer)
 * 
 * @remarks
 * This function ensures that a value can be safely used as an array length by:
 * 1. Returning 0 for undefined values
 * 2. Converting the value to an integer
 * 3. Validating that the integer conversion matches (no fractional parts)
 * 4. Ensuring the result is non-negative
 * 
 * @example
 *