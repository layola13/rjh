/**
 * Validates that an object is an instance of a specific constructor.
 * This utility ensures type safety by checking the prototype chain.
 * 
 * @template T - The expected type of the instance
 * @param instance - The value to validate
 * @param constructor - The constructor function to validate against
 * @returns The validated instance
 * @throws {TypeError} When the instance is not of the expected constructor type
 * 
 * @example
 *