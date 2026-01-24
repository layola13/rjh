/**
 * IEEE 754 floating point number read/write utilities
 * Provides low-level binary operations for reading and writing floating point numbers
 * in various formats (float32, float64, etc.) from/to byte arrays.
 */

/**
 * Reads an IEEE 754 floating point number from a byte array
 * 
 * @param buffer - The byte array containing the floating point data
 * @param offset - The starting position in the buffer to read from
 * @param isLittleEndian - Whether to read in little-endian byte order (true) or big-endian (false)
 * @param mantissaBits - Number of bits in the mantissa (23 for float32, 52 for float64)
 * @param totalBytes - Total number of bytes to read (4 for float32, 8 for float64)
 * @returns The decoded floating point number
 */
export function read(
  buffer: Uint8Array | number[],
  offset: number,
  isLittleEndian: boolean,
  mantissaBits: number,
  totalBytes: number
): number;

/**
 * Writes an IEEE 754 floating point number to a byte array
 * 
 * @param buffer - The byte array to write the floating point data into
 * @param value - The floating point number to encode
 * @param offset - The starting position in the buffer to write to
 * @param isLittleEndian - Whether to write in little-endian byte order (true) or big-endian (false)
 * @param mantissaBits - Number of bits in the mantissa (23 for float32, 52 for float64)
 * @param totalBytes - Total number of bytes to write (4 for float32, 8 for float64)
 */
export function write(
  buffer: Uint8Array | number[],
  value: number,
  offset: number,
  isLittleEndian: boolean,
  mantissaBits: number,
  totalBytes: number
): void;