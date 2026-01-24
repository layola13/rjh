/**
 * Base64 encoding/decoding utilities for converting between strings and byte arrays.
 * Supports both standard Base64 and URL-safe Base64 (with - and _ characters).
 * @module Base64Codec
 */

/**
 * Lookup table for encoding: maps 6-bit values (0-63) to Base64 characters
 */
declare const encodeLookup: string[];

/**
 * Lookup table for decoding: maps Base64 character codes to 6-bit values (0-63)
 */
declare const decodeLookup: number[];

/**
 * Calculates the byte length of a Base64 encoded string after decoding.
 * 
 * @param base64String - The Base64 encoded string
 * @returns The number of bytes the decoded data will occupy
 * @throws {Error} If the string length is not a multiple of 4
 * 
 * @example
 *