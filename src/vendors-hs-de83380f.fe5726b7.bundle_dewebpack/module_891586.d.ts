/**
 * Validates that a private field belongs to the given instance.
 * This is a TypeScript/Babel helper for private class fields (#privateField).
 * 
 * @param instance - The object instance to check
 * @param privateFieldKey - The private field identifier to validate
 * @returns The validated instance
 * @throws {TypeError} If the private field does not belong to the instance
 * 
 * @example
 *