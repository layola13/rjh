/**
 * RC4 stream cipher implementation for CryptoJS
 * 
 * RC4 is a stream cipher designed by Ron Rivest in 1987.
 * This module provides both standard RC4 and RC4Drop variants.
 */

import type { WordArray } from 'crypto-js';
import type { StreamCipher } from 'crypto-js';
import type { Cipher } from 'crypto-js';

/**
 * Configuration options for RC4Drop cipher
 */
interface RC4DropConfig {
  /** Number of initial keystream bytes to drop (default: 192) */
  drop: number;
}

/**
 * Internal state for RC4 cipher
 */
interface RC4State {
  /** The key used for encryption/decryption */
  _key: WordArray;
  /** S-box permutation array (256 bytes) */
  _S: number[];
  /** Index i for keystream generation */
  _i: number;
  /** Index j for keystream generation */
  _j: number;
}

/**
 * Standard RC4 stream cipher
 * 
 * @remarks
 * RC4 generates a pseudorandom stream of bytes (a keystream) which is
 * XORed with the plaintext to produce the ciphertext.
 * 
 * @example
 *