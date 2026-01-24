/**
 * Omits specified properties from an object, including Symbol properties.
 * This is an extended version of object omit that handles both string keys and Symbol keys.
 * 
 * @template T - The source object type
 * @template K - The keys to omit from the object
 * @param source - The source object to omit properties from
 * @param keysToOmit - Array of property keys (strings or Symbols) to exclude
 * @returns A new object with the specified properties omitted
 * 
 * @example
 *