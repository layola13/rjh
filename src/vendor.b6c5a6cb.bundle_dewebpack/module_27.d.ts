/**
 * SHA-384 cryptographic hash algorithm implementation
 * Based on SHA-512 with different initial hash values and truncated output
 */

import type { X64Word, X64WordArray } from './x64-core';
import type { SHA512Hasher } from './sha512';
import type { CryptoJS } from './core';

/**
 * SHA-384 hasher class
 * Extends SHA-512 with modified initialization and finalization
 */
export interface SHA384Hasher extends SHA512Hasher {
  /**
   * Resets the hasher to its initial state with SHA-384 specific initial hash values
   */
  _doReset(): void;

  /**
   * Finalizes the hash computation and returns the truncated hash
   * @returns The computed SHA-384 hash (truncated to 384 bits / 48 bytes)
   */
  _doFinalize(): X64WordArray;
}

/**
 * SHA-384 hasher constructor configuration
 */
export interface SHA384HasherConstructor {
  /**
   * Creates a new SHA-384 hasher instance
   */
  new (): SHA384Hasher;

  /**
   * Creates a SHA-384 hash of the given message
   * @param message - The message to hash (string or WordArray)
   * @returns The computed SHA-384 hash
   */
  (message: string | X64WordArray): X64WordArray;
}

/**
 * HMAC-SHA384 configuration and methods
 */
export interface HmacSHA384 {
  /**
   * Computes HMAC using SHA-384
   * @param message - The message to authenticate
   * @param key - The secret key
   * @returns The computed HMAC-SHA384
   */
  (message: string | X64WordArray, key: string | X64WordArray): X64WordArray;
}

/**
 * SHA-384 module augmentation for CryptoJS namespace
 */
declare module './core' {
  interface CryptoJS {
    /**
     * SHA-384 hasher
     */
    SHA384: SHA384HasherConstructor;

    /**
     * HMAC-SHA384 helper
     */
    HmacSHA384: HmacSHA384;
  }

  namespace algo {
    /**
     * SHA-384 algorithm class
     */
    const SHA384: SHA384HasherConstructor;
  }
}

/**
 * Computes SHA-384 hash of a message
 * @param message - The message to hash
 * @returns The SHA-384 hash as a 384-bit (48-byte) WordArray
 *
 * @example
 *