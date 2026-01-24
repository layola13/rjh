/**
 * EvpKDF (EVP Key Derivation Function) implementation
 * Based on OpenSSL's EVP_BytesToKey function
 */

/**
 * Configuration options for the EvpKDF algorithm
 */
export interface EvpKDFConfig {
  /**
   * The size of the derived key in 32-bit words
   * @default 4 (128 bits)
   */
  keySize: number;

  /**
   * The hash algorithm to use for key derivation
   * @default MD5
   */
  hasher: HasherStatic;

  /**
   * Number of iterations to perform
   * @default 1
   */
  iterations: number;
}

/**
 * Base class interface for CryptoJS algorithms
 */
export interface Base {
  extend(overrides: Partial<any>): any;
  create(...args: any[]): any;
}

/**
 * Represents a word array (array of 32-bit words)
 */
export interface WordArray {
  /**
   * The array of 32-bit words
   */
  words: number[];

  /**
   * The number of significant bytes in the word array
   */
  sigBytes: number;

  /**
   * Concatenates a word array to this word array
   */
  concat(wordArray: WordArray): WordArray;
}

/**
 * Static interface for WordArray constructor
 */
export interface WordArrayStatic {
  create(words?: number[], sigBytes?: number): WordArray;
}

/**
 * Hasher interface for cryptographic hash functions
 */
export interface Hasher {
  /**
   * Updates the hash with data
   */
  update(messageUpdate: WordArray | string): Hasher;

  /**
   * Finalizes the hash computation
   */
  finalize(messageUpdate?: WordArray | string): WordArray;

  /**
   * Resets the hasher to its initial state
   */
  reset(): void;
}

/**
 * Static interface for Hasher constructor
 */
export interface HasherStatic {
  create(): Hasher;
}

/**
 * EvpKDF algorithm class
 * Derives a key from a password using a hash-based key derivation function
 */
export interface EvpKDF {
  /**
   * Configuration for this EvpKDF instance
   */
  cfg: EvpKDFConfig;

  /**
   * Initializes the EvpKDF with custom configuration
   * @param config - Custom configuration options
   */
  init(config?: Partial<EvpKDFConfig>): void;

  /**
   * Computes the derived key
   * @param password - The password to derive the key from
   * @param salt - The salt value
   * @returns The derived key as a WordArray
   */
  compute(password: WordArray | string, salt: WordArray | string): WordArray;
}

/**
 * Static interface for EvpKDF constructor
 */
export interface EvpKDFStatic extends Base {
  /**
   * Creates a new EvpKDF instance
   * @param config - Configuration options
   */
  create(config?: Partial<EvpKDFConfig>): EvpKDF;
}

/**
 * Creates a derived key using the EvpKDF algorithm
 * Shortcut function for creating an instance and computing the key
 * 
 * @param password - The password to derive the key from
 * @param salt - The salt value
 * @param config - Optional configuration options
 * @returns The derived key as a WordArray
 */
export declare function EvpKDF(
  password: WordArray | string,
  salt: WordArray | string,
  config?: Partial<EvpKDFConfig>
): WordArray;

/**
 * EvpKDF algorithm static class
 */
export declare const EvpKDFAlgorithm: EvpKDFStatic;

/**
 * CryptoJS library structure
 */
export interface CryptoJS {
  lib: {
    Base: Base;
    WordArray: WordArrayStatic;
  };
  algo: {
    MD5: HasherStatic;
    EvpKDF: EvpKDFStatic;
  };
  EvpKDF: typeof EvpKDF;
}

export default CryptoJS;