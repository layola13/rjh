/**
 * Converts an object to a primitive value using standard conversion methods.
 * 
 * Attempts to convert an object to a primitive value by trying the following methods in order:
 * - When preferString is true: toString() → valueOf() → toString() (if not already tried)
 * - When preferString is false: valueOf() → toString()
 * 
 * @param input - The value to convert to a primitive
 * @param preferString - Whether to prefer string conversion (try toString first)
 * @returns The primitive value obtained from the conversion
 * @throws {TypeError} When the object cannot be converted to a primitive value
 * 
 * @module ToPrimitive
 * @dependencies isObject (d3f4)
 */
declare function toPrimitive(input: unknown, preferString: boolean): string | number | boolean | symbol | null | undefined;

export = toPrimitive;