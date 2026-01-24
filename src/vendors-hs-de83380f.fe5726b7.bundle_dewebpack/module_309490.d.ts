/**
 * Converts a value to a primitive type using Symbol.toPrimitive if available.
 * 
 * @param input - The value to convert to a primitive
 * @param hint - The type hint for conversion: "string", "number", or "default"
 * @returns The primitive value
 * @throws {TypeError} If Symbol.toPrimitive returns a non-primitive value
 */
export default function toPrimitive(
  input: unknown,
  hint?: "string" | "number" | "default"
): string | number | boolean | symbol | bigint | null | undefined;

/**
 * Converts a value to a primitive type using Symbol.toPrimitive if available.
 * 
 * This function attempts to convert an object to a primitive value by:
 * 1. Checking if the input is already a primitive (non-object or null) and returning it
 * 2. Looking for a Symbol.toPrimitive method on the object
 * 3. Calling Symbol.toPrimitive with the provided hint
 * 4. Falling back to String() or Number() based on the hint
 * 
 * @param input - The value to convert to a primitive
 * @param hint - The type hint for conversion: "string", "number", or "default"
 * @returns The primitive value
 * @throws {TypeError} If Symbol.toPrimitive returns a non-primitive value
 * 
 * @example
 *