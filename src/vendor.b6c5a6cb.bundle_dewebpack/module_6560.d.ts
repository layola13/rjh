/**
 * Base conversion utility module
 * Provides functionality to convert numbers between different bases (binary, octal, decimal, hexadecimal)
 */

/**
 * Character sets for different number bases
 */
export const BIN = "01";
export const OCT = "01234567";
export const DEC = "0123456789";
export const HEX = "0123456789abcdef";

/**
 * Converter class that handles base conversion operations
 * (Assumed from the imported module at 1693)
 */
declare class BaseConverter {
  /**
   * Creates a new base converter instance
   * @param sourceBase - The base to convert from
   * @param targetBase - The base to convert to
   */
  constructor(sourceBase: string, targetBase: string);
  
  /**
   * Converts a value from the source base to the target base
   * @param value - The value to convert
   * @returns The converted value
   */
  convert(value: string | number): string;
}

/**
 * Creates a converter function for transforming values between specified bases
 * 
 * @param sourceBase - The character set representing the source base (e.g., BIN, OCT, DEC, HEX)
 * @param targetBase - The character set representing the target base
 * @returns A function that converts values from the source base to the target base
 * 
 * @example
 *