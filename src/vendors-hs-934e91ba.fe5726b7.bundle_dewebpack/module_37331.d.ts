/**
 * Trims whitespace from both ends of a string.
 * 
 * This function removes leading and trailing whitespace characters from the input string.
 * It uses a helper function to find the last non-whitespace character index and removes
 * leading whitespace using a regular expression.
 * 
 * @param input - The string to trim. If null or undefined, returns the input as-is.
 * @returns The trimmed string with leading and trailing whitespace removed, or the original
 *          input if it's not a valid string.
 * 
 * @example
 *