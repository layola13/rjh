/**
 * ISO 10126 padding strategy for block cipher modes.
 * ISO 10126 padding fills the remaining bytes with random data and sets the last byte to the padding length.
 */

/**
 * Configuration for padding operations
 */
export interface PaddingConfig {
  /** Block size in 32-bit words */
  blockSize: number;
}

/**
 * Represents a word array used in cryptographic operations
 */
export interface WordArray {
  /** Array of 32-bit words */
  words: number[];
  /** Number of significant bytes in the word array */
  sigBytes: number;
  /**
   * Concatenates another word array to this one
   * @param wordArray - The word array to append
   * @returns The concatenated word array
   */
  concat(wordArray: WordArray): WordArray;
}

/**
 * Library utilities for word array operations
 */
export interface CryptoLib {
  WordArray: {
    /**
     * Creates a new word array
     * @param words - Array of 32-bit words
     * @param sigBytes - Number of significant bytes
     * @returns A new word array instance
     */
    create(words: number[], sigBytes: number): WordArray;
    /**
     * Generates a random word array
     * @param nBytes - Number of random bytes to generate
     * @returns A word array filled with random data
     */
    random(nBytes: number): WordArray;
  };
}

/**
 * Crypto instance with library utilities
 */
export interface CryptoJS {
  lib: CryptoLib;
  pad: {
    Iso10126: Iso10126Padding;
  };
}

/**
 * ISO 10126 padding strategy implementation
 */
export interface Iso10126Padding {
  /**
   * Pads the data using ISO 10126 padding scheme.
   * Fills remaining bytes with random data and the last byte with padding length.
   * @param data - The word array to pad
   * @param blockSize - The block size in 32-bit words
   */
  pad(data: WordArray, blockSize: number): void;

  /**
   * Removes ISO 10126 padding from the data.
   * Reads the padding length from the last byte and removes that many bytes.
   * @param data - The padded word array
   */
  unpad(data: WordArray): void;
}

declare module 'crypto-js/pad-iso10126' {
  const Iso10126: Iso10126Padding;
  export default Iso10126;
}