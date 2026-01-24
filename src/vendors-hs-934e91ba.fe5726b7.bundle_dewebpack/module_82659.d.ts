/**
 * Converts a value to a number.
 * Handles various numeric formats including binary (0b), octal (0o), and hexadecimal (0x).
 * 
 * @param value - The value to convert to a number
 * @returns The numeric representation of the value, or NaN if conversion fails
 * 
 * @example
 * toNumber(3.2);        // => 3.2
 * toNumber('3.2');      // => 3.2
 * toNumber('0b1010');   // => 10
 * toNumber('0o17');     // => 15
 * toNumber('0x1F');     // => NaN (hex with +/- prefix)
 */
declare function toNumber(value: unknown): number;

export default toNumber;