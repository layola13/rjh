/**
 * Checks if a value is an array.
 * Falls back to a length-based check for environments without native Array.isArray support.
 * 
 * @param value - The value to check
 * @returns True if the value is an array, false otherwise
 */
export declare function isArray(value: unknown): value is unknown[];