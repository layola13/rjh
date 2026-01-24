/**
 * Converts a value to a numeric representation.
 * Maps input values to specific numeric outputs:
 * - 0 maps to 0
 * - 1 maps to 1
 * - Any other value maps to 2
 * 
 * @param value - The input value to be converted
 * @returns A number (0, 1, or 2) based on the input value
 */
declare function convertToNumericCode(value: unknown): number;

export default convertToNumericCode;