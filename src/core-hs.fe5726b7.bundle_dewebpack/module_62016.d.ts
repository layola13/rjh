/**
 * Validates that an index value does not exceed JavaScript's maximum safe integer.
 * 
 * This function ensures array/string indices stay within the safe range for precise
 * integer representation in JavaScript (Number.MAX_SAFE_INTEGER = 2^53 - 1).
 * 
 * @param index - The index value to validate
 * @returns The validated index if it's within safe bounds
 * @throws {TypeError} When the index exceeds the maximum safe integer (9007199254740991)
 * 
 * @example
 *