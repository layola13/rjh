/**
 * Executes a function and captures its result or error in a discriminated union.
 * 
 * This utility provides a safe way to execute potentially throwing functions
 * by wrapping the result in an object that indicates success or failure.
 * 
 * @template T - The return type of the executed function
 * @param fn - The function to execute
 * @returns An object containing either the successful value or the caught error
 * 
 * @example
 *