/**
 * Base64 encoding/decoding utilities for CryptoJS
 * Provides methods to convert between WordArray and Base64 string representations
 */

/**
 * Represents a word array structure used in cryptographic operations
 */
interface WordArray {
  /** Array of 32-bit words */
  words: number[];
  /** Number of significant bytes */
  sigBytes: number;
  /** Clamps the word array to the actual number of significant bytes */
  clamp(): void;
}

/**
 * Factory for creating WordArray instances
 */
interface WordArrayStatic {
  /**
   * Creates a new WordArray from an array of words and byte count
   * @param words - Array of 32-bit words
   * @param sigBytes - Number of significant bytes
   * @returns A new WordArray instance
   */
  create(words: number[], sigBytes: number): WordArray;
}

/**
 * CryptoJS library structure
 */
interface CryptoJS {
  /** Library components */
  lib: {
    /** WordArray constructor and utilities */
    WordArray: WordArrayStatic;
  };
  /** Encoding utilities */
  enc: {
    /** Base64 encoder/decoder */
    Base64: Base64Encoder;
  };
}

/**
 * Base64 encoding and decoding interface
 */
interface Base64Encoder {
  /**
   * Converts a WordArray to a Base64 encoded string
   * @param wordArray - The WordArray to encode
   * @returns Base64 encoded string
   */
  stringify(wordArray: WordArray): string;

  /**
   * Parses a Base64 encoded string into a WordArray
   * @param base64String - The Base64 string to decode
   * @returns Decoded WordArray
   */
  parse(base64String: string): WordArray;

  /**
   * Base64 character mapping (RFC 4648)
   * @internal
   */
  _map: string;

  /**
   * Reverse character mapping for decoding (lazy initialized)
   * @internal
   */
  _reverseMap?: number[];
}

/**
 * Module exports the Base64 encoder for CryptoJS
 * @param crypto - CryptoJS instance
 * @returns Base64 encoder instance
 */
declare function initializeBase64Encoder(crypto: CryptoJS): Base64Encoder;

export default initializeBase64Encoder;
export type { Base64Encoder, WordArray, WordArrayStatic, CryptoJS };