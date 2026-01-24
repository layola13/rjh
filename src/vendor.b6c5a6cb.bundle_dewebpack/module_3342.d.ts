/**
 * SHA-224 cryptographic hash algorithm implementation
 * SHA-224 is a truncated version of SHA-256, producing a 224-bit hash
 */

import type { WordArray } from './word-array';
import type { SHA256 } from './sha-256';
import type { Hasher } from './hasher';

/**
 * Initial hash values for SHA-224
 * These are the second 32 bits of the fractional parts of the square roots of the 9th through 16th primes
 */
declare const SHA224_INITIAL_HASH: readonly [
  3238371032,
  914150663,
  812702999,
  4144912697,
  4290775857,
  1750603025,
  1694076839,
  3204075428
];

/**
 * SHA-224 hasher configuration options
 */
export interface SHA224Options {
  /** Optional configuration parameters */
  [key: string]: unknown;
}

/**
 * SHA-224 hasher instance
 * Extends SHA-256 with different initial hash values and truncated output
 */
export interface SHA224Hasher extends Hasher {
  /**
   * Internal hash state (WordArray)
   */
  _hash: WordArray;

  /**
   * Resets the hasher to its initial state
   * Initializes the hash with SHA-224 specific initial values
   */
  _doReset(): void;

  /**
   * Finalizes the hash computation
   * @returns The computed hash with last 32 bits (4 bytes) truncated
   */
  _doFinalize(): WordArray;
}

/**
 * SHA-224 algorithm class
 * Static factory methods for creating hashers and HMAC instances
 */
export interface SHA224Static {
  /**
   * Creates a new SHA-224 hasher instance
   * @param options - Optional configuration
   * @returns A new SHA-224 hasher
   */
  create(options?: SHA224Options): SHA224Hasher;

  /**
   * Extends the SHA-256 implementation with SHA-224 specifics
   */
  extend(overrides: Partial<SHA224Hasher>): SHA224Static;

  /**
   * Creates a helper function for one-shot hashing
   * @internal
   */
  _createHelper(hasher: SHA224Static): (message: WordArray | string) => WordArray;

  /**
   * Creates a helper function for HMAC-SHA-224
   * @internal
   */
  _createHmacHelper(hasher: SHA224Static): (message: WordArray | string, key: WordArray | string) => WordArray;

  /**
   * Finalizes the hash computation (inherited from SHA-256)
   * @internal
   */
  _doFinalize(this: SHA224Hasher): WordArray;
}

/**
 * CryptoJS library interface with SHA-224 support
 */
export interface CryptoJSWithSHA224 {
  /** Word array utilities */
  lib: {
    WordArray: typeof WordArray;
  };

  /** Algorithm implementations */
  algo: {
    SHA256: SHA256Static;
    SHA224: SHA224Static;
  };

  /**
   * Convenience method: Computes SHA-224 hash of a message
   * @param message - The message to hash (WordArray or UTF-8 string)
   * @returns The 224-bit hash as a WordArray
   */
  SHA224(message: WordArray | string): WordArray;

  /**
   * HMAC-SHA-224 message authentication code
   * @param message - The message to authenticate
   * @param key - The secret key
   * @returns The HMAC-SHA-224 output as a WordArray
   */
  HmacSHA224(message: WordArray | string, key: WordArray | string): WordArray;
}

/**
 * SHA-224 module export
 */
export declare const SHA224: CryptoJSWithSHA224['SHA224'];

export default SHA224;