/**
 * MD5 hash algorithm implementation
 * Converts input string or Uint8Array to MD5 hash byte array
 */

/**
 * Calculate the required array length for MD5 padding
 * @param length - Original message length in bits
 * @returns Padded array length
 */
declare function calculatePaddedLength(length: number): number;

/**
 * Safe addition of two 32-bit integers
 * Handles overflow by treating numbers as 32-bit values
 * @param x - First 32-bit integer
 * @param y - Second 32-bit integer
 * @returns Sum as 32-bit integer
 */
declare function safeAdd(x: number, y: number): number;

/**
 * Bitwise rotate left operation
 * @param value - Value to rotate
 * @param shiftBits - Number of bits to shift
 * @param a - First operand
 * @param b - Second operand
 * @param x - Data block value
 * @param s - Shift amount
 * @param t - Additive constant
 * @returns Rotated and combined result
 */
declare function bitwiseRotateLeft(
  value: number,
  a: number,
  shiftBits: number,
  b: number,
  x: number,
  s: number,
  t: number
): number;

/**
 * MD5 F function: (B & C) | (~B & D)
 * @param a - Working variable A
 * @param b - Working variable B
 * @param c - Working variable C
 * @param d - Working variable D
 * @param x - Message block
 * @param s - Shift amount
 * @param t - Additive constant
 * @returns Transformed value
 */
declare function md5FFunction(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
): number;

/**
 * MD5 G function: (B & D) | (C & ~D)
 * @param a - Working variable A
 * @param b - Working variable B
 * @param c - Working variable C
 * @param d - Working variable D
 * @param x - Message block
 * @param s - Shift amount
 * @param t - Additive constant
 * @returns Transformed value
 */
declare function md5GFunction(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
): number;

/**
 * MD5 H function: B ^ C ^ D
 * @param a - Working variable A
 * @param b - Working variable B
 * @param c - Working variable C
 * @param d - Working variable D
 * @param x - Message block
 * @param s - Shift amount
 * @param t - Additive constant
 * @returns Transformed value
 */
declare function md5HFunction(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
): number;

/**
 * MD5 I function: C ^ (B | ~D)
 * @param a - Working variable A
 * @param b - Working variable B
 * @param c - Working variable C
 * @param d - Working variable D
 * @param x - Message block
 * @param s - Shift amount
 * @param t - Additive constant
 * @returns Transformed value
 */
declare function md5IFunction(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
): number;

/**
 * MD5 hash function
 * Computes MD5 hash of input data
 * @param input - Input string or Uint8Array to hash
 * @returns MD5 hash as byte array (number[])
 */
declare function md5(input: string | Uint8Array): number[];

export default md5;