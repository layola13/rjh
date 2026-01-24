/**
 * Retrieves a single item or resource.
 * 
 * This function is a convenience wrapper that calls the core retrieval function
 * with a parameter of 1, typically used to fetch a single entity.
 * 
 * @returns The result from the underlying retrieval operation with count set to 1
 * @see module_64 for the underlying implementation
 */
export declare function a<T = unknown>(): T;