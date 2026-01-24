/**
 * Safely retrieves a property value from an object, excluding dangerous properties.
 * 
 * @remarks
 * This utility prevents access to:
 * - The "constructor" property (to avoid prototype pollution)
 * - The "__proto__" property (to avoid prototype chain manipulation)
 * 
 * @param obj - The source object to read the property from
 * @param key - The property key to retrieve
 * @returns The property value if safe to access, otherwise undefined
 * 
 * @example
 *