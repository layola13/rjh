/**
 * PBKDF2 (Password-Based Key Derivation Function 2) implementation
 * A key derivation function that applies a pseudorandom function to derive keys
 */

/**
 * Configuration options for PBKDF2
 */
export interface PBKDF2Config {
  /**
   * Size of the generated key in words (32-bit)
   * @default 4 (128 bits)
   */
  keySize?: number;

  /**
   * Hash algorithm to use for HMAC
   * @default SHA1
   */
  hasher?: Hasher;

  /**
   * Number of iterations to perform
   * Higher values increase security but reduce performance
   * @default 1
   */
  iterations?: number;
}

/**
 * Base class interface for CryptoJS algorithms
 */
export interface Base {
  extend(overrides: Record<string, unknown>): Base;
}

/**
 * Represents a word array (byte array stored as 32-bit words)
 */
export interface WordArray {
  /** Array of 32-bit words */
  words: number[];
  
  /** Number of significant bytes */
  sigBytes: number;
  
  /** Concatenate another WordArray to this one */
  concat(wordArray: WordArray): WordArray;
}

/**
 * Hash algorithm interface
 */
export interface Hasher {
  create(): Hasher;
  update(data: WordArray | string): Hasher;
  finalize(data?: WordArray | string): WordArray;
  reset(): void;
}

/**
 * HMAC (Hash-based Message Authentication Code) interface
 */
export interface HMAC {
  create(hasher: Hasher, key: WordArray | string): HMAC;
  update(data: WordArray | string): HMAC;
  finalize(data?: WordArray | string): WordArray;
  reset(): void;
}

/**
 * CryptoJS library structure
 */
export interface CryptoJSLib {
  Base: Base;
  WordArray: {
    create(words?: number[], sigBytes?: number): WordArray;
  };
}

/**
 * CryptoJS algorithm namespace
 */
export interface CryptoJSAlgo {
  SHA1: Hasher;
  HMAC: HMAC;
  PBKDF2: PBKDF2Algorithm;
}

/**
 * Root CryptoJS namespace
 */
export interface CryptoJS {
  lib: CryptoJSLib;
  algo: CryptoJSAlgo;
  
  /**
   * Convenience method for PBKDF2 key derivation
   * @param password - The password to derive the key from
   * @param salt - The salt value
   * @param config - Configuration options
   * @returns Derived key as WordArray
   */
  PBKDF2(password: WordArray | string, salt: WordArray | string, config?: PBKDF2Config): WordArray;
}

/**
 * PBKDF2 algorithm class
 */
export interface PBKDF2Algorithm extends Base {
  /** Configuration with defaults */
  cfg: Required<PBKDF2Config>;

  /**
   * Initialize the algorithm with configuration
   * @param config - Configuration options
   */
  init(config?: PBKDF2Config): void;

  /**
   * Compute the derived key
   * @param password - The password to derive the key from
   * @param salt - The salt value
   * @returns Derived key as WordArray
   */
  compute(password: WordArray | string, salt: WordArray | string): WordArray;

  /**
   * Create a new PBKDF2 instance
   * @param config - Configuration options
   * @returns New PBKDF2 instance
   */
  create(config?: PBKDF2Config): PBKDF2Algorithm;
}

/**
 * Module export - extends CryptoJS with PBKDF2 functionality
 * @param cryptoJS - CryptoJS instance to extend
 * @returns Extended CryptoJS with PBKDF2
 */
declare function initPBKDF2(cryptoJS: CryptoJS): typeof cryptoJS.PBKDF2;

export default initPBKDF2;