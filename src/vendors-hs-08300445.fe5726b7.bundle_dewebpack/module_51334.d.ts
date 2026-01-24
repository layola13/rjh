/**
 * Safely accesses nested properties in an object using a path array.
 * Returns undefined if any intermediate property is null or undefined.
 * 
 * @template T - The type of the root object
 * @template P - The type of the property path array
 * @param obj - The root object to traverse
 * @param path - Array of property keys representing the path to the target value
 * @returns The value at the specified path, or undefined if any intermediate value is null/undefined
 * 
 * @example
 *