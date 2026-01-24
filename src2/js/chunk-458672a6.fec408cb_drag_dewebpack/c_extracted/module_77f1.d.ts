/**
 * Clamps an index to valid array bounds.
 * Converts negative indices to positive (counting from end) and ensures the result
 * stays within [0, length).
 * 
 * @param index - The index to normalize (can be negative)
 * @param length - The length of the array or collection
 * @returns A valid index within bounds [0, length)
 * 
 * @example
 *