/**
 * Module: module_d2c8
 * Validates that a value is not a regular expression and converts the input to a string.
 * 
 * @module StringValidationUtils
 */

import { isRegExp } from './aae3';
import { requireObjectCoercible } from './be13';

/**
 * Validates that the search parameter is not a regular expression and converts
 * the input value to a string. This is used by string methods that don't support
 * regex parameters (e.g., String.prototype.includes, startsWith, endsWith).
 * 
 * @param value - The value to be converted to a string
 * @param searchValue - The value to validate (must not be a RegExp)
 * @param methodName - The name of the string method being called (for error messages)
 * @returns The input value converted to a string
 * @throws {TypeError} If searchValue is a regular expression
 * 
 * @example
 *