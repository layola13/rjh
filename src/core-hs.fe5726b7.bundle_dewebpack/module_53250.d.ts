/**
 * Converts a value to an integer by removing the fractional part.
 * 
 * @param value - The value to convert to an integer
 * @returns The integer representation of the value, or 0 if the value is NaN or 0
 * 
 * @remarks
 * - Returns 0 if the value is NaN (not a number)
 * - Returns 0 if the value equals 0
 * - Otherwise applies a sign-preserving truncation function
 * 
 * @example
 *