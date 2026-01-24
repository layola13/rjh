/**
 * Validates that a value is not a regular expression and converts input to string.
 * 
 * @module StringValidation
 * @throws {TypeError} If the value is a regular expression
 */

import { isRegExp } from './aae3';
import { requireObjectCoercible } from './be13';

/**
 * Ensures that the provided value is not a RegExp and returns a string representation
 * of the input after validating it's coercible to an object.
 * 
 * @param target - The value to be converted to a string
 * @param searchValue - The value to validate (must not be a RegExp)
 * @param methodName - The name of the String method being called (for error messaging)
 * @returns The target value converted to a string
 * @throws {TypeError} When searchValue is a regular expression, with message "String#{methodName} doesn't accept regex!"
 * 
 * @example
 *