/**
 * Finds the index of a key-value pair in an array by comparing keys for equality.
 * 
 * @remarks
 * This is typically used internally by data structures like Maps or Caches
 * to locate entries by key. Iterates backwards through the array for efficiency
 * when recently added items are more likely to be accessed.
 * 
 * @param entries - Array of key-value tuples to search through
 * @param key - The key to search for
 * @returns The index of the matching entry, or -1 if not found
 * 
 * @example
 *