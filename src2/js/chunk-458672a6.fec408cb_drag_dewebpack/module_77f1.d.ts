/**
 * Converts a value to an integer and clamps it within a valid range.
 * 
 * This utility function ensures that an index stays within bounds [0, length).
 * - If the index is negative, it calculates from the end of the array/string
 * - Returns the minimum of the adjusted index and the maximum allowed value
 * 
 * @param index - The index position to clamp (can be negative)
 * @param length - The maximum length boundary
 * @returns A clamped index value between 0 and length
 * 
 * @example
 *