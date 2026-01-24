/**
 * Type guard to check if a value is an Arguments object.
 * 
 * Determines whether the provided value is an arguments object by checking
 * if it's array-like and has the internal [[Class]] tag of "Arguments".
 * 
 * @param value - The value to check
 * @returns True if the value is an Arguments object, false otherwise
 * 
 * @example
 *