/**
 * Type guard to determine if a value is a Promise-like object.
 * 
 * Checks if the given value is truthy, does not have a 'subscribe' method (to exclude Observables),
 * and has a 'then' method (characteristic of Promises/Thenables).
 * 
 * @param value - The value to check
 * @returns True if the value is a Promise-like object, false otherwise
 * 
 * @example
 *