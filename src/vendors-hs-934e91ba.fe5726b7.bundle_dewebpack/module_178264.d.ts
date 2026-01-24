/**
 * Returns all own property names of an object, including non-enumerable properties.
 * 
 * This function handles two cases:
 * - If the input is array-like (has numeric indices and length), it uses a specialized
 *   function to extract property names with symbol support
 * - Otherwise, it uses a standard function to get all own property names
 * 
 * @param target - The object whose property names are to be retrieved
 * @returns An array of property names (strings and/or symbols)
 * 
 * @example
 *