/**
 * Retrieves a global built-in object or its property.
 * 
 * @template T - The type of the built-in object or property
 * @param objectName - The name of the global built-in object (e.g., 'Array', 'Object', 'Promise')
 * @param propertyName - Optional property name on the built-in object
 * @returns The built-in object if it's a function, or the specified property value, or undefined
 * 
 * @example
 *