/**
 * Checks if a value is a regular expression.
 * 
 * This function determines whether the given value is a RegExp by:
 * 1. First checking if it's an object
 * 2. Then checking for the Symbol.match property if available
 * 3. Finally falling back to checking the internal class tag
 * 
 * @param value - The value to check
 * @returns True if the value is a RegExp, false otherwise
 * 
 * @example
 *