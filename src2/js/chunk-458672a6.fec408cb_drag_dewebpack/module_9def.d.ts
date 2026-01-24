/**
 * Converts a value to a valid array length within JavaScript's safe integer range.
 * 
 * This utility ensures that a numeric value is:
 * 1. Non-negative (returns 0 for negative numbers)
 * 2. Capped at MAX_SAFE_INTEGER (9007199254740991)
 * 
 * Commonly used for normalizing array lengths, indices, or iteration counts.
 * 
 * @param value - The value to convert to a valid length
 * @returns A safe integer between 0 and MAX_SAFE_INTEGER
 * 
 * @example
 *