/**
 * Checks if a string method can be safely called with a regex argument.
 * 
 * Some string methods (like split, match, search, replace) may throw errors
 * when called with regex arguments in certain environments. This utility
 * tests if a method works correctly by:
 * 1. Attempting to call the method with a regex
 * 2. If it fails, disabling the regex's Symbol.match property and retrying
 * 
 * @param methodName - The name of the string method to test (e.g., 'split', 'match')
 * @returns `true` if the method works with regex arguments, `false` otherwise
 * 
 * @example
 *