/**
 * HMAC (Hash-based Message Authentication Code) algorithm implementation.
 * Provides message authentication using a cryptographic hash function combined with a secret key.
 * 
 * @module CryptoJS.algo.HMAC
 */

import { lib, enc, algo } from 'crypto-js';

/**
 * Word array type representing encrypted/hashed data
 */
interface WordArray {
  /** Array of 32-bit words */
  words: number[];
  /** Number of significant bytes */
  sigBytes: number;
  /** Creates a deep copy of the word array */
  clone(): WordArray;
  /** Concatenates another word array to this one */
  concat(wordArray: WordArray): WordArray;
  /** Clamps the word array to its significant bytes */
  clamp(): void;
}

/**
 * Base hasher interface for cryptographic hash functions
 */
interface Hasher {
  /** Block size in 32-bit words */
  blockSize: number;
  /** Initializes the hasher */
  init(): Hasher;
  /** Resets the hasher to initial state */
  reset(): void;
  /** Updates the hash with additional data */
  update(data: WordArray | string): Hasher;
  /** Finalizes the hash computation */
  finalize(data?: WordArray | string): WordArray;
}

/**
 * Constructor interface for hasher classes
 */
interface HasherConstructor {
  /** Creates a new hasher instance */
  new (): Hasher;
  /** Initializes a new hasher instance */
  init(): Hasher;
}

/**
 * HMAC algorithm class for computing keyed-hash message authentication codes
 */
declare class HMAC {
  /**
   * The underlying hash function instance
   * @private
   */
  private _hasher: Hasher;

  /**
   * Outer key used in HMAC computation (key XOR opad)
   * @private
   */
  private _oKey: WordArray;

  /**
   * Inner key used in HMAC computation (key XOR ipad)
   * @private
   */
  private _iKey: WordArray;

  /**
   * Initializes the HMAC with a hasher and secret key.
   * 
   * @param hasher - The hash function constructor to use (e.g., SHA256, SHA1)
   * @param key - The secret key as WordArray or UTF-8 string
   * 
   * @remarks
   * - Converts string keys to WordArray using UTF-8 encoding
   * - Keys longer than block size are hashed to fit
   * - Uses standard HMAC padding constants: 0x5c5c5c5c (opad) and 0x36363636 (ipad)
   */
  init(hasher: HasherConstructor, key: WordArray | string): void;

  /**
   * Resets the HMAC to initial state for computing a new MAC.
   * Reuses the same key without re-initialization.
   */
  reset(): void;

  /**
   * Updates the HMAC computation with additional message data.
   * 
   * @param messageUpdate - Message data as WordArray or string
   * @returns This HMAC instance for method chaining
   */
  update(messageUpdate: WordArray | string): this;

  /**
   * Finalizes the HMAC computation and returns the authentication code.
   * 
   * @param messageUpdate - Optional final message data to include
   * @returns The computed HMAC as a WordArray
   * 
   * @remarks
   * Implements the standard HMAC formula:
   * HMAC(K, m) = H((K ⊕ opad) || H((K ⊕ ipad) || m))
   */
  finalize(messageUpdate?: WordArray | string): WordArray;
}

declare module 'crypto-js' {
  namespace algo {
    /**
     * HMAC algorithm for message authentication
     */
    export const HMAC: {
      /**
       * Creates a new HMAC instance
       */
      extend(proto: Record<string, unknown>): typeof HMAC;
    };
  }
}

export = HMAC;