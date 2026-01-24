/**
 * Validates that an object is an instance of a specific constructor.
 * Throws a TypeError if the validation fails.
 * 
 * @template T - The type of the constructor
 * @param instance - The object to validate
 * @param constructor - The constructor function to check against
 * @param errorMessage - Error message prefix to use in the TypeError
 * @param forbiddenProperty - Optional property name that must not exist on the instance
 * @throws {TypeError} When instance is not of the expected type or when forbiddenProperty exists on instance
 * @returns The validated instance
 * 
 * @example
 *