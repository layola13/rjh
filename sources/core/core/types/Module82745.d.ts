/**
 * Index conversion utility module
 * Converts relative indices to absolute array indices
 */

/**
 * Converts a relative index to an absolute index
 * 
 * @param index - The index to convert (can be negative for reverse indexing)
 * @param length - The length of the array
 * @returns The absolute index clamped to valid array bounds
 * 
 * @example
 * ```typescript
 * // Positive index
 * toAbsoluteIndex(2, 10); // 2
 * 
 * // Negative index (from end)
 * toAbsoluteIndex(-1, 10); // 9
 * toAbsoluteIndex(-3, 10); // 7
 * 
 * // Out of bounds - clamped to 0
 * toAbsoluteIndex(-20, 10); // 0
 * 
 * // Zero index
 * toAbsoluteIndex(0, 10); // 0
 * ```
 */
declare function toAbsoluteIndex(index: number, length: number): number;

export { toAbsoluteIndex };