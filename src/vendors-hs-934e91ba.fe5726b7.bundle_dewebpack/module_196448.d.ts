/**
 * Gets the enumerable property names of an object.
 * 
 * Returns an array of property names for a given object, excluding:
 * - The 'constructor' property if the object appears to be a prototype
 * - Properties that don't exist directly on the object (inherited properties)
 * 
 * This is typically used as a helper for creating shallow copies or iterating
 * over an object's own enumerable properties.
 * 
 * @param value - The object to query for property names
 * @returns An array of property name strings
 * 
 * @example
 *