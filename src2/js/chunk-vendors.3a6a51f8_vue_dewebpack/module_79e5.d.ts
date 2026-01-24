/**
 * Tests whether a function throws an error when executed.
 * 
 * @remarks
 * This utility executes a given function and returns `false` if it succeeds,
 * or `true` if it throws an exception. Commonly used to detect unsupported
 * features or missing APIs in different environments.
 * 
 * @param fn - The function to test for errors
 * @returns `true` if the function throws an error, `false` if it executes successfully
 * 
 * @example
 *