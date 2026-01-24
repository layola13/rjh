/**
 * Checks if the provided value is a valid array-like index.
 * 
 * @description
 * Validates whether a value can be used as an index for array-like objects.
 * A valid index must be:
 * - A non-negative integer
 * - Less than the specified maximum length
 * - Within safe integer range
 * 
 * @param value - The value to check as a potential index
 * @param maxLength - The maximum allowed length (defaults to Number.MAX_SAFE_INTEGER: 9007199254740991)
 * @returns True if the value is a valid index within the specified range, false otherwise
 * 
 * @example
 *