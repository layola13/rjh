/**
 * Get the type tag of a value as a string.
 * Returns standardized type names like "String", "Number", "Array", "Object", etc.
 * Handles special cases for Arguments objects and values with custom [Symbol.toStringTag].
 * 
 * @param value - The value to get the type tag for
 * @returns The type tag string (e.g., "Undefined", "Null", "String", "Array", "Arguments")
 * 
 * @example
 *