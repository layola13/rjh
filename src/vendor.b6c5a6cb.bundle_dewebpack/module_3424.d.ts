/**
 * SHA-256 cryptographic hash algorithm implementation
 * Based on FIPS PUB 180-4 specification
 */

/**
 * Word array type representing a sequence of 32-bit words
 */
export interface WordArray {
  /** Array of 32-bit words */
  words: number[];
  /** Number of significant bytes */
  sigBytes: number;
  /** Initialize a new WordArray */
  init(words: number[]): WordArray;
}

/**
 * Base hasher interface for cryptographic hash functions
 */
export interface Hasher {
  /** Internal hash state */
  _hash: WordArray;
  /** Input data buffer */
  _data: {
    words: number[];
    sigBytes: number;
  };
  /** Number of bytes processed */
  _nDataBytes: number;
  
  /** Reset the hasher to initial state */
  _doReset(): void;
  /** Process a single block of data */
  _doProcessBlock(words: number[], offset: number): void;
  /** Finalize the hash computation */
  _doFinalize(): WordArray;
  /** Clone the hasher instance */
  clone(): Hasher;
  /** Process accumulated data */
  _process(): WordArray;
}

/**
 * Library namespace containing core cryptographic primitives
 */
export interface CryptoLib {
  /** Word array utilities */
  WordArray: {
    init(words: number[]): WordArray;
  };
  /** Base hasher class */
  Hasher: {
    extend(overrides: Partial<SHA256Hasher>): typeof SHA256Hasher;
    _createHelper(hasher: typeof SHA256Hasher): (message: WordArray | string) => WordArray;
    _createHmacHelper(hasher: typeof SHA256Hasher): (message: WordArray | string, key: WordArray | string) => WordArray;
    clone(): Hasher;
  };
}

/**
 * Main cryptographic algorithm namespace
 */
export interface CryptoAlgorithm {
  /** SHA-256 hasher class */
  SHA256: typeof SHA256Hasher;
  /** HMAC-SHA256 helper function */
  HmacSHA256: (message: WordArray | string, key: WordArray | string) => WordArray;
}

/**
 * Root CryptoJS-like library interface
 */
export interface CryptoJS {
  /** Core library primitives */
  lib: CryptoLib;
  /** Algorithm implementations */
  algo: CryptoAlgorithm;
  /** SHA-256 hash helper function */
  SHA256: (message: WordArray | string) => WordArray;
  /** HMAC-SHA256 helper function */
  HmacSHA256: (message: WordArray | string, key: WordArray | string) => WordArray;
}

/**
 * SHA-256 hasher implementation
 * Extends base Hasher with SHA-256 specific logic
 */
export declare class SHA256Hasher implements Hasher {
  _hash: WordArray;
  _data: { words: number[]; sigBytes: number };
  _nDataBytes: number;

  /**
   * Reset hash state to initial values (first 32 bits of fractional parts of square roots of first 8 primes)
   */
  _doReset(): void;

  /**
   * Process a 512-bit (16-word) block of data
   * @param words - Input data words
   * @param offset - Starting offset in the words array
   */
  _doProcessBlock(words: number[], offset: number): void;

  /**
   * Finalize the hash computation with padding and length encoding
   * @returns The computed hash as a WordArray
   */
  _doFinalize(): WordArray;

  /**
   * Create a deep copy of this hasher instance
   * @returns Cloned hasher with independent state
   */
  clone(): SHA256Hasher;

  /**
   * Process accumulated data blocks
   * @returns Processed hash state
   */
  _process(): WordArray;
}

/**
 * Compute SHA-256 hash of a message
 * @param message - Input message as WordArray or string
 * @returns 256-bit hash value as WordArray
 */
export declare function SHA256(message: WordArray | string): WordArray;

/**
 * Compute HMAC-SHA256 authentication code
 * @param message - Message to authenticate
 * @param key - Secret key for HMAC
 * @returns HMAC-SHA256 output as WordArray
 */
export declare function HmacSHA256(message: WordArray | string, key: WordArray | string): WordArray;

/**
 * Module export - exposes SHA256 function as default
 */
declare const _default: typeof SHA256;
export default _default;