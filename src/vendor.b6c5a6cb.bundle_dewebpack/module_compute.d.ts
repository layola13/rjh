/**
 * PBKDF2 key derivation function implementation
 * Derives a cryptographic key from a password using iterative hashing
 */

/**
 * Word array structure used in cryptographic operations
 */
interface WordArray {
  /** Array of 32-bit words containing the data */
  words: number[];
  /** Number of significant bytes in the word array */
  sigBytes: number;
  /** Concatenates another word array to this one */
  concat(wordArray: WordArray): WordArray;
}

/**
 * Hasher interface for cryptographic hash functions
 */
interface Hasher {
  /** Updates the hash with new data */
  update(data: WordArray | string): Hasher;
  /** Finalizes the hash computation and returns the result */
  finalize(data?: WordArray | string): WordArray;
  /** Resets the hasher to its initial state */
  reset(): void;
}

/**
 * Factory interface for creating hashers
 */
interface HasherFactory {
  /** Creates a new hasher instance */
  create(): Hasher;
}

/**
 * Configuration object for PBKDF2 algorithm
 */
interface PBKDF2Config {
  /** The hash function to use for key derivation */
  hasher: HasherFactory;
  /** Desired key size in 32-bit words */
  keySize: number;
  /** Number of iterations for the derivation process */
  iterations: number;
}

/**
 * Context interface containing algorithm configuration
 */
interface ComputeContext {
  /** PBKDF2 configuration */
  cfg: PBKDF2Config;
}

/**
 * WordArray factory interface
 */
interface WordArrayFactory {
  /** Creates a new empty word array */
  create(): WordArray;
}

/**
 * Computes a derived key from password and salt using PBKDF2
 * 
 * @param password - The password to derive the key from
 * @param salt - The cryptographic salt
 * @returns The derived key as a WordArray
 */
declare function compute(
  this: ComputeContext,
  password: WordArray | string,
  salt: WordArray | string
): WordArray;

export {
  WordArray,
  Hasher,
  HasherFactory,
  PBKDF2Config,
  ComputeContext,
  WordArrayFactory,
  compute
};