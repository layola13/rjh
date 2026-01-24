/**
 * MD5 Hash Algorithm Implementation
 * 
 * This module provides MD5 hashing functionality with support for both
 * standard MD5 and HMAC-MD5 modes.
 */

/**
 * Safely adds two 32-bit integers, handling overflow correctly.
 * 
 * @param x - First 32-bit integer
 * @param y - Second 32-bit integer
 * @returns The sum of x and y as a 32-bit integer
 */
export declare function safeAdd(x: number, y: number): number;

/**
 * Bitwise rotate left operation.
 * 
 * @param value - The value to rotate
 * @param base - The base value for the operation
 * @param shift - Number of bits to shift
 * @param constant - Constant value to add
 * @param shiftAmount - Amount to rotate left
 * @param addition - Additional value to add
 * @returns Rotated and combined result
 */
export declare function rotateLeft(
  value: number,
  base: number,
  shift: number,
  constant: number,
  shiftAmount: number,
  addition: number
): number;

/**
 * MD5 basic operation: F(x, y, z) = (x & y) | (~x & z)
 * 
 * @param a - First state variable
 * @param b - Second state variable
 * @param c - Third state variable
 * @param d - Fourth state variable
 * @param blockValue - Current block value from input
 * @param shiftAmount - Rotation amount
 * @param constant - MD5 constant for this round
 * @returns Transformed value
 */
export declare function md5FF(
  a: number,
  b: number,
  c: number,
  d: number,
  blockValue: number,
  shiftAmount: number,
  constant: number
): number;

/**
 * MD5 basic operation: G(x, y, z) = (x & z) | (y & ~z)
 * 
 * @param a - First state variable
 * @param b - Second state variable
 * @param c - Third state variable
 * @param d - Fourth state variable
 * @param blockValue - Current block value from input
 * @param shiftAmount - Rotation amount
 * @param constant - MD5 constant for this round
 * @returns Transformed value
 */
export declare function md5GG(
  a: number,
  b: number,
  c: number,
  d: number,
  blockValue: number,
  shiftAmount: number,
  constant: number
): number;

/**
 * MD5 basic operation: H(x, y, z) = x ^ y ^ z
 * 
 * @param a - First state variable
 * @param b - Second state variable
 * @param c - Third state variable
 * @param d - Fourth state variable
 * @param blockValue - Current block value from input
 * @param shiftAmount - Rotation amount
 * @param constant - MD5 constant for this round
 * @returns Transformed value
 */
export declare function md5HH(
  a: number,
  b: number,
  c: number,
  d: number,
  blockValue: number,
  shiftAmount: number,
  constant: number
): number;

/**
 * MD5 basic operation: I(x, y, z) = y ^ (x | ~z)
 * 
 * @param a - First state variable
 * @param b - Second state variable
 * @param c - Third state variable
 * @param d - Fourth state variable
 * @param blockValue - Current block value from input
 * @param shiftAmount - Rotation amount
 * @param constant - MD5 constant for this round
 * @returns Transformed value
 */
export declare function md5II(
  a: number,
  b: number,
  c: number,
  d: number,
  blockValue: number,
  shiftAmount: number,
  constant: number
): number;

/**
 * Core MD5 transformation function.
 * Processes the input data in 512-bit (16-word) blocks.
 * 
 * @param blocks - Array of 32-bit words representing the padded input
 * @param inputBitLength - Original length of input in bits
 * @returns Array of four 32-bit words representing the MD5 hash
 */
export declare function coreMD5(blocks: number[], inputBitLength: number): [number, number, number, number];

/**
 * Converts an array of 32-bit words to a binary string.
 * 
 * @param wordArray - Array of 32-bit words
 * @returns Binary string representation
 */
export declare function wordArrayToBinaryString(wordArray: number[]): string;

/**
 * Converts a string to an array of 32-bit words.
 * 
 * @param input - Input string to convert
 * @returns Array of 32-bit words
 */
export declare function stringToWordArray(input: string): number[];

/**
 * Converts a binary string to hexadecimal representation.
 * 
 * @param binaryString - Binary string to convert
 * @returns Hexadecimal string (lowercase)
 */
export declare function binaryStringToHex(binaryString: string): string;

/**
 * Encodes a string to UTF-8.
 * 
 * @param input - String to encode
 * @returns UTF-8 encoded string
 */
export declare function utf8Encode(input: string): string;

/**
 * Computes raw MD5 hash (binary string output).
 * 
 * @param input - Input string to hash
 * @returns MD5 hash as binary string
 */
export declare function rawMD5(input: string): string;

/**
 * Computes HMAC-MD5.
 * 
 * @param key - Secret key for HMAC
 * @param message - Message to authenticate
 * @returns HMAC-MD5 result as binary string
 */
export declare function hmacMD5(key: string, message: string): string;

/**
 * Main MD5 hashing function with multiple output formats.
 * 
 * @param input - String to hash
 * @param key - Optional HMAC key (enables HMAC-MD5 mode)
 * @param raw - If true, returns raw binary string; if false, returns hex string
 * @returns MD5 hash in the specified format
 * 
 * @example
 *