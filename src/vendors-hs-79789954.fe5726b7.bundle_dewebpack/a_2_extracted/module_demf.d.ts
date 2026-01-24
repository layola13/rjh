/**
 * Base64 encoding and decoding utilities
 * Provides functions to convert between Base64 strings and byte arrays
 */

/**
 * Lookup table for encoding bytes to Base64 characters
 */
declare const encodeLookup: string[];

/**
 * Lookup table for decoding Base64 characters to byte values
 */
declare const decodeLookup: number[];

/**
 * Calculate the byte length of a Base64 encoded string
 * @param base64String - The Base64 encoded string
 * @returns The number of bytes the decoded data will occupy
 * @throws {Error} If the string length is not a multiple of 4
 */
export declare function byteLength(base64String: string): number;

/**
 * Decode a Base64 encoded string to a byte array
 * @param base64String - The Base64 encoded string to decode
 * @returns A Uint8Array (or Array in legacy environments) containing the decoded bytes
 * @throws {Error} If the string length is not a multiple of 4
 */
export declare function toByteArray(base64String: string): Uint8Array | number[];

/**
 * Encode a byte array to a Base64 string
 * @param byteArray - The byte array to encode
 * @returns A Base64 encoded string representation of the input bytes
 */
export declare function fromByteArray(byteArray: Uint8Array | number[]): string;

/**
 * Parse a Base64 string to determine valid data length and padding
 * @param base64String - The Base64 string to parse
 * @returns A tuple containing [validLength, paddingLength]
 *   - validLength: Index of first padding character or string length
 *   - paddingLength: Number of padding bytes (0, 1, or 2)
 * @throws {Error} If the string length is not a multiple of 4
 */
declare function getLengthInfo(base64String: string): [number, number];

/**
 * Encode a single 24-bit triplet to Base64
 * @param triplet - A 24-bit number representing 3 bytes
 * @returns A 4-character Base64 encoded string
 */
declare function encodeTriplet(triplet: number): string;

/**
 * Encode a chunk of byte array to Base64
 * @param byteArray - The source byte array
 * @param startIndex - Start position in the array
 * @param endIndex - End position in the array
 * @returns Base64 encoded string for the chunk
 */
declare function encodeChunk(
  byteArray: Uint8Array | number[],
  startIndex: number,
  endIndex: number
): string;