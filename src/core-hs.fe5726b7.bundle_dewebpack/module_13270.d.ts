/**
 * Gets a global built-in object or its property.
 * 
 * @template T - The type of the global object or property
 * @param {string} namespace - The name of the global built-in object (e.g., 'Array', 'Object', 'Promise')
 * @param {string} [property] - Optional property name to retrieve from the global object
 * @returns {T | undefined} The global object, its property, or undefined if not callable/exists
 * 
 * @example
 * // Get the Array constructor
 * const ArrayConstructor = getBuiltin('Array');
 * 
 * @example
 * // Get a specific method from Array
 * const arrayIsArray = getBuiltin('Array', 'isArray');
 */
export declare function getBuiltin<T = unknown>(namespace: string): T | undefined;
export declare function getBuiltin<T = unknown>(namespace: string, property: string): T | undefined;