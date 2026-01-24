/**
 * Converts a value to a valid length (safe integer between 0 and MAX_SAFE_INTEGER).
 * 
 * This utility ensures that a given value is constrained to a valid array/string length
 * by clamping it between 0 and JavaScript's maximum safe integer (2^53 - 1).
 * 
 * @param value - The value to convert to a length
 * @returns A safe integer length value, or 0 if the input is not positive
 * 
 * @example
 *