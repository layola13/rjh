/**
 * Clamps an index to a valid range within a collection.
 * 
 * Ensures the given index is within bounds [0, length).
 * - If index is negative, it's treated as an offset from the end and adjusted to be at least 0
 * - If index is positive, it's capped at the collection length
 * 
 * @param index - The index to clamp (can be negative for reverse indexing)
 * @param length - The length of the collection
 * @returns The clamped index within the valid range [0, length)
 * 
 * @example
 * clampIndex(-5, 3)  // returns 0 (clamped from -2)
 * clampIndex(10, 3)  // returns 3 (clamped to length)
 * clampIndex(1, 3)   // returns 1 (within bounds)
 */
declare function clampIndex(index: number, length: number): number;

export = clampIndex;