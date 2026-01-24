/**
 * Executes a function and returns true if it throws an error, false if it succeeds.
 * 
 * This utility is commonly used to detect whether a feature or operation is supported
 * by attempting to execute it and catching any errors that occur.
 * 
 * @param fn - The function to test for errors
 * @returns `false` if the function executes without throwing, `true` if it throws an error
 * 
 * @example
 *