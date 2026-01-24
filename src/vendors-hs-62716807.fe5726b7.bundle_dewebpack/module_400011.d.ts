/**
 * Converts a relative index to an absolute array index.
 * Handles negative indices (from end) and clamps to valid range [0, length].
 * 
 * @param index - The index to convert (can be negative for reverse indexing)
 * @param length - The length of the array/collection
 * @returns The clamped absolute index within bounds [0, length]
 * 
 * @example
 *