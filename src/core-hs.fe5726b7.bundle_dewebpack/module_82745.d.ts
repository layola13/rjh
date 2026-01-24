/**
 * Converts a relative index to an absolute index within a given length.
 * Handles negative indices by converting them to positive offsets from the end.
 * 
 * @param index - The index to normalize (can be negative)
 * @param length - The total length/size of the collection
 * @returns The normalized index clamped between 0 and length
 * 
 * @example
 *