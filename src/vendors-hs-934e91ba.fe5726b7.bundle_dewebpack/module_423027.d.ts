/**
 * Gets the enumerable property names of an object.
 * 
 * This function returns an array of enumerable string keys from the given object,
 * excluding the 'constructor' property for prototype objects.
 * 
 * @param value - The object to query for enumerable properties
 * @returns An array of property names
 * 
 * @remarks
 * - For prototype objects, uses a custom enumeration that excludes 'constructor'
 * - For non-prototype objects, delegates to a base implementation (likely Object.keys)
 * 
 * @example
 *