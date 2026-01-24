/**
 * Executes a function and captures either its return value or any thrown error.
 * 
 * This utility provides a safe way to call functions that might throw exceptions,
 * returning a discriminated union that indicates success or failure.
 * 
 * @template T - The return type of the function being executed
 * @param fn - The function to execute safely
 * @returns An object with either `{ e: false, v: T }` on success or `{ e: true, v: Error }` on failure
 * 
 * @example
 *