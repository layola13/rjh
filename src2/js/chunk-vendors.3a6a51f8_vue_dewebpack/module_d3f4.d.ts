/**
 * Type guard utility to check if a value is an object or function.
 * 
 * @remarks
 * This utility considers both non-null objects and functions as "objects" in the broad sense.
 * It filters out primitive types and null values.
 * 
 * @param value - The value to check
 * @returns `true` if the value is a non-null object or a function, `false` otherwise
 * 
 * @example
 *