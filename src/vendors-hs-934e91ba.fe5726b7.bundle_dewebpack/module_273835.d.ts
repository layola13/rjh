/**
 * Safe property accessor that retrieves a value from an object by key.
 * Returns undefined if the object is null or undefined.
 * 
 * @template T - The type of the object
 * @template K - The key type that extends the keys of T
 * @param obj - The object to access the property from
 * @param key - The property key to retrieve
 * @returns The value at the specified key, or undefined if obj is null/undefined
 * 
 * @example
 *