/**
 * Converts an object to a primitive value.
 * 
 * Implements the ToPrimitive abstract operation from ECMAScript specification.
 * Attempts to convert an object to a primitive value using the [Symbol.toPrimitive] method
 * if available, otherwise falls back to OrdinaryToPrimitive.
 * 
 * @param input - The value to convert to a primitive
 * @param preferredType - The preferred primitive type hint: "string", "number", or "default"
 * @returns The primitive value
 * @throws {TypeError} When the object cannot be converted to a primitive value
 */
declare function toPrimitive(
  input: unknown,
  preferredType?: "string" | "number" | "default"
): string | number | boolean | symbol | bigint | null | undefined;

export = toPrimitive;