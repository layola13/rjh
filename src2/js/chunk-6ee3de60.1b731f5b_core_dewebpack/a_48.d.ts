/**
 * Type guard to check if a value is array-like.
 * 
 * An array-like object has a numeric `length` property but is not a function.
 * Examples include arrays, strings, NodeList, arguments objects, etc.
 * 
 * @param value - The value to check
 * @returns `true` if the value is array-like, `false` otherwise
 * 
 * @example
 *