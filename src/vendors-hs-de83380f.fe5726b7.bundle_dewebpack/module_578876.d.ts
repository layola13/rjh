/**
 * Omits specified keys from an object, returning a new object without those properties.
 * This is a runtime implementation of TypeScript's Omit utility type.
 * 
 * @template T - The source object type
 * @template K - The keys to omit from the object
 * @param source - The source object to omit properties from
 * @param keysToOmit - Array of property keys to exclude from the result
 * @returns A new object with all properties except the omitted ones
 * 
 * @example
 *