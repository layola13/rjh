/**
 * Converts an object to a primitive value by attempting various conversion methods.
 * 
 * This utility tries to convert an object to a primitive by calling:
 * 1. toString() method (if preferString is true)
 * 2. valueOf() method
 * 3. toString() method (if preferString is false)
 * 
 * @param value - The value to convert to a primitive
 * @param preferString - Whether to prefer string conversion (toString before valueOf)
 * @returns The primitive value extracted from the object
 * @throws {TypeError} If the object cannot be converted to a primitive value
 * 
 * @example
 *