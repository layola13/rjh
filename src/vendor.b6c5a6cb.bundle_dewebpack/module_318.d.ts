/**
 * SHA-512 (Secure Hash Algorithm 512-bit) Implementation
 * 
 * This module provides SHA-512 cryptographic hash functionality using 64-bit word operations.
 * SHA-512 is part of the SHA-2 family and produces a 512-bit (64-byte) hash value.
 * 
 * @module SHA512
 */

/**
 * Represents a 64-bit word with separate high and low 32-bit components
 */
export interface X64Word {
  /** High 32 bits of the 64-bit word */
  high: number;
  /** Low 32 bits of the 64-bit word */
  low: number;
}

/**
 * Array of 64-bit words
 */
export interface X64WordArray {
  /** Array of X64Word instances */
  words: X64Word[];
  /** Number of significant bytes */
  sigBytes: number;
  
  /**
   * Converts the word array to a 32-bit representation
   * @returns The converted 32-bit word array
   */
  toX32(): any;
  
  /**
   * Creates a deep clone of this word array
   * @returns A new cloned instance
   */
  clone(): X64WordArray;
}

/**
 * Base hasher interface for cryptographic hash functions
 */
export interface Hasher {
  /**
   * Resets the hasher to its initial state
   */
  _doReset(): void;
  
  /**
   * Processes a block of data
   * @param words - The data words to process
   * @param offset - The offset into the words array
   */
  _doProcessBlock(words: number[], offset: number): void;
  
  /**
   * Finalizes the hash computation
   * @returns The final hash value
   */
  _doFinalize(): any;
  
  /**
   * Creates a deep clone of this hasher
   * @returns A new cloned hasher instance
   */
  clone(): Hasher;
  
  /**
   * Block size in 32-bit words (1024 bits / 32 = 32 words for SHA-512)
   */
  blockSize: number;
  
  /** Internal hash state */
  _hash: X64WordArray;
  
  /** Input data buffer */
  _data: {
    words: number[];
    sigBytes: number;
  };
  
  /** Total number of bytes processed */
  _nDataBytes: number;
  
  /**
   * Processes buffered data
   */
  _process(): void;
}

/**
 * SHA-512 hasher implementation
 */
export interface SHA512Hasher extends Hasher {
  /**
   * Initializes the hash values to SHA-512 initial constants
   */
  _doReset(): void;
  
  /**
   * Processes a 1024-bit block of data
   * @param words - The message block as an array of 32-bit words
   * @param offset - Starting position in the words array
   */
  _doProcessBlock(words: number[], offset: number): void;
  
  /**
   * Finalizes the hash by padding and processing remaining data
   * @returns The final 512-bit hash value
   */
  _doFinalize(): any;
}

/**
 * SHA-512 round constants (first 64 bits of fractional parts of cube roots of first 80 primes)
 */
export type SHA512Constants = ReadonlyArray<X64Word>;

/**
 * Factory for creating X64Word instances
 */
export interface X64WordFactory {
  /**
   * Creates a new 64-bit word
   * @param high - High 32 bits
   * @param low - Low 32 bits
   * @returns A new X64Word instance
   */
  create(high: number, low: number): X64Word;
}

/**
 * Factory for creating X64WordArray instances
 */
export interface X64WordArrayFactory {
  /**
   * Initializes a new word array
   * @param words - Initial array of X64Word instances
   * @returns A new X64WordArray instance
   */
  init(words: X64Word[]): X64WordArray;
}

/**
 * Core cryptographic library interface
 */
export interface CryptoLib {
  /** Base hasher implementation */
  Hasher: {
    /**
     * Extends the base hasher with custom implementation
     * @param impl - Implementation object with hasher methods
     * @returns Extended hasher constructor
     */
    extend(impl: Partial<Hasher>): any;
  };
  
  /** 64-bit word operations */
  x64: {
    /** X64Word factory */
    Word: X64WordFactory;
    /** X64WordArray factory */
    WordArray: X64WordArrayFactory;
  };
  
  /** Algorithm implementations */
  algo: {
    /** SHA-512 hasher */
    SHA512?: SHA512Hasher;
  };
  
  /** Convenience method for creating SHA-512 hash */
  SHA512?: {
    /**
     * Computes SHA-512 hash of input data
     * @param message - Input message to hash
     * @returns Hash value
     */
    (message: any): any;
  };
  
  /** HMAC-SHA512 implementation */
  HmacSHA512?: {
    /**
     * Computes HMAC-SHA512
     * @param message - Input message
     * @param key - Secret key
     * @returns HMAC value
     */
    (message: any, key: any): any;
  };
}

/**
 * Main SHA-512 module export
 * 
 * @param cryptoLib - The core cryptographic library instance
 * @returns The SHA-512 implementation attached to the library
 * 
 * @example
 *