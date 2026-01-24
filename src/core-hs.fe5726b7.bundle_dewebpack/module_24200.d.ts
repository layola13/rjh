/**
 * Converts a value to a string, with special handling for Symbol types.
 * 
 * @remarks
 * This utility function ensures that Symbol values are not accidentally
 * converted to strings, which would result in unexpected behavior.
 * For all other types, it performs a safe string conversion.
 * 
 * @param value - The value to convert to a string
 * @returns The string representation of the value
 * @throws {TypeError} When attempting to convert a Symbol to a string
 * 
 * @example
 *