/**
 * String validation utility module
 * Validates that a value is not a regex before converting input to string
 */

/**
 * Validates that the search value is not a regular expression and converts the input to a string.
 * Used internally by string methods that should not accept regex patterns.
 * 
 * @param target - The value to be converted to a string
 * @param searchValue - The value to validate (must not be a regex)
 * @param methodName - The name of the string method being called (for error messages)
 * @returns The target value converted to a string
 * @throws {TypeError} If searchValue is a regular expression
 * 
 * @example
 *