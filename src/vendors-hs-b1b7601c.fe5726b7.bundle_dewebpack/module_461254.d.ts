/**
 * Creates a custom error class with proper prototype chain and stack trace support.
 * 
 * This utility function facilitates the creation of custom error types that properly
 * extend the built-in Error class, ensuring correct instanceof checks and stack traces.
 * 
 * @param factory - A factory function that receives a constructor function to initialize the error instance
 * @returns A constructor function for the custom error class
 * 
 * @example
 *