/**
 * Validates whether a value is a finite number.
 * 
 * @param value - The value to validate. Can be of any type.
 * @returns `true` if the value is a valid finite number, `false` otherwise.
 * 
 * @remarks
 * This function checks if the input can be parsed as a float and is a finite number.
 * It will return `false` for:
 * - Non-numeric strings
 * - `NaN`
 * - `Infinity` or `-Infinity`
 * - `null` or `undefined`
 * 
 * @example
 *