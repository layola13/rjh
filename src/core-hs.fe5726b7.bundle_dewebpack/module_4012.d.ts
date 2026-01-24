/**
 * Safely executes a function and wraps the result in a Result type.
 * 
 * @template T - The expected return type of the successful function execution
 * @template E - The error type (defaults to unknown)
 * 
 * @param fn - The function to execute safely
 * @returns A Result object containing either the successful value or the caught error
 * 
 * @example
 *