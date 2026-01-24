/**
 * Ensures that a value is not null or undefined before proceeding.
 * 
 * @remarks
 * This utility function is commonly used to validate that a value exists
 * before attempting to call methods or access properties on it.
 * It helps prevent runtime errors when working with potentially nullable values.
 * 
 * @param value - The value to check for null or undefined
 * @returns The original value if it is neither null nor undefined
 * @throws {TypeError} When the value is null or undefined
 * 
 * @example
 *