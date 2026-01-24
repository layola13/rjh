/**
 * SHA-1 hash algorithm implementation
 * Computes a 160-bit (20-byte) hash value from input data
 */

/**
 * SHA-1 logical function used in different rounds
 * @param round - The round number (0-3) determining which logical function to use
 * @param x - First 32-bit word
 * @param y - Second 32-bit word
 * @param z - Third 32-bit word
 * @returns The result of the logical function
 */
declare function sha1LogicalFunction(
  round: number,
  x: number,
  y: number,
  z: number
): number;

/**
 * Performs a circular left rotation on a 32-bit value
 * @param value - The 32-bit value to rotate
 * @param bits - Number of bits to rotate left
 * @returns The rotated value
 */
declare function rotateLeft(value: number, bits: number): number;

/**
 * Input type that can be passed to the SHA-1 hash function
 */
type SHA1Input = string | number[] | ArrayLike<number>;

/**
 * Output type representing the SHA-1 hash as an array of bytes
 */
type SHA1Output = number[];

/**
 * Computes the SHA-1 hash of the input data
 * 
 * @param input - The data to hash. Can be:
 *   - A UTF-8 string
 *   - An array of byte values (0-255)
 *   - Any array-like object containing byte values
 * 
 * @returns A 20-byte array representing the SHA-1 hash digest
 * 
 * @example
 *