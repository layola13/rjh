/**
 * Base64 encoding/decoding utilities
 * Provides methods to convert between base64 strings and byte arrays
 */

/**
 * Lookup table for base64 encoding: maps 6-bit values (0-63) to base64 characters
 */
export const encodeLookup: string[];

/**
 * Lookup table for base64 decoding: maps character codes to 6-bit values (0-63)
 */
export const decodeLookup: number[];

/**
 * Calculate the byte length of a base64 encoded string
 * @param base64String - The base64 encoded string
 * @returns The number of bytes the decoded string will contain
 * @example
 * byteLength("SGVsbG8=") // returns 5
 */
export function byteLength(base64String: string): number;

/**
 * Decode a base64 string to a byte array
 * @param base64String - The base64 encoded string to decode
 * @returns A Uint8Array containing the decoded bytes
 * @throws {Error} If the string length is not a multiple of 4
 * @example
 * toByteArray("SGVsbG8=") // returns Uint8Array [72, 101, 108, 108, 111]
 */
export function toByteArray(base64String: string): Uint8Array;

/**
 * Encode a byte array to a base64 string
 * @param byteArray - The byte array to encode
 * @returns The base64 encoded string
 * @example
 * fromByteArray(new Uint8Array([72, 101, 108, 108, 111])) // returns "SGVsbG8="
 */
export function fromByteArray(byteArray: Uint8Array | number[]): string;

/**
 * Parse base64 string and extract valid length and padding information
 * @internal
 * @param base64String - The base64 string to parse
 * @returns A tuple containing [validLength, paddingLength]
 * @throws {Error} If the string length is not a multiple of 4
 */
declare function getLengths(base64String: string): [number, number];

/**
 * Encode a chunk of bytes to base64
 * @internal
 * @param byteArray - The source byte array
 * @param startIndex - Start index in the array
 * @param endIndex - End index in the array
 * @returns The base64 encoded string for the chunk
 */
declare function encodeChunk(
  byteArray: Uint8Array | number[],
  startIndex: number,
  endIndex: number
): string;

/**
 * Type alias for byte array (supports both typed and regular arrays)
 */
export type ByteArray = Uint8Array | number[];

/**
 * Base64 alphabet constant
 */
export const BASE64_ALPHABET: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * Maximum chunk size for encoding operations
 */
export const MAX_CHUNK_SIZE: 16383;