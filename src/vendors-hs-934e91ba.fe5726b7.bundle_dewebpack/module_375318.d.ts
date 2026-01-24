/**
 * Creates a case conversion function that transforms the first character of a string
 * using the specified method (e.g., 'toUpperCase' or 'toLowerCase') while preserving
 * the rest of the string. Handles Unicode characters correctly.
 * 
 * @module StringCaseConverter
 */

/**
 * Type representing string case transformation methods
 */
type CaseMethod = 'toUpperCase' | 'toLowerCase';

/**
 * Function that extracts a slice of an array starting from a given index
 * @param array - The array to slice
 * @param start - The starting index
 * @returns Array containing elements from start index onwards
 */
type BaseSlice = <T>(array: T[], start: number) => T[];

/**
 * Function that checks if a string contains Unicode characters
 * @param value - The string to check
 * @returns True if string contains Unicode characters
 */
type HasUnicode = (value: string) => boolean;

/**
 * Function that splits a string into an array of Unicode characters
 * @param value - The string to split
 * @returns Array of individual Unicode characters
 */
type StringToArray = (value: string) => string[];

/**
 * Function that converts a value to a string
 * @param value - The value to convert
 * @returns String representation of the value
 */
type ToString = (value: unknown) => string;

/**
 * Creates a function that applies a case transformation to the first character of a string
 * 
 * @param caseMethod - The method name to apply ('toUpperCase' or 'toLowerCase')
 * @returns A function that transforms the first character of its input string
 * 
 * @example
 * const capitalize = createCaseConverter('toUpperCase');
 * capitalize('hello'); // returns 'Hello'
 * 
 * const uncapitalize = createCaseConverter('toLowerCase');
 * uncapitalize('HELLO'); // returns 'hELLO'
 */
declare function createCaseConverter(
  caseMethod: CaseMethod
): (value: unknown) => string;

export = createCaseConverter;