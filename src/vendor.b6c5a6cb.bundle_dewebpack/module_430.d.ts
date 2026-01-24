/**
 * Counter block mode compatible with Dr Brian Gladman's fileenc.c implementation.
 * Derived from CryptoJS.mode.CTR
 * 
 * This module implements the CTR (Counter) block cipher mode of operation
 * with increment logic compatible with Brian Gladman's reference implementation.
 * 
 * @author Jan Hruby <jhruby.web@gmail.com>
 * @preserve
 */

/**
 * Word array type representing cryptographic data
 */
export interface WordArray {
  /** Array of 32-bit words */
  words: number[];
  /** Number of significant bytes */
  sigBytes: number;
  /** Clones the word array */
  clone(): WordArray;
  /** Creates a slice of the word array */
  slice(start?: number, end?: number): WordArray;
}

/**
 * Block cipher interface
 */
export interface BlockCipher {
  /** Block size in 32-bit words */
  blockSize: number;
  /**
   * Encrypts a single block of data
   * @param words - The data words to encrypt
   * @param offset - The offset into the words array
   */
  encryptBlock(words: number[], offset: number): void;
}

/**
 * Base block cipher mode configuration
 */
export interface BlockCipherMode {
  /** The cipher instance being used */
  _cipher: BlockCipher;
  /** Initialization vector */
  _iv?: WordArray;
}

/**
 * CTR mode encryptor/decryptor interface
 */
export interface CTRGladmanMode extends BlockCipherMode {
  /** Current counter value */
  _counter: WordArray;
  /**
   * Processes a block of data
   * @param words - The data words to process
   * @param offset - The offset into the words array
   */
  processBlock(words: number[], offset: number): void;
}

/**
 * CTR mode constructor type
 */
export interface CTRGladmanModeStatic {
  /** Encryptor implementation */
  Encryptor: new () => CTRGladmanMode;
  /** Decryptor implementation (same as Encryptor in CTR mode) */
  Decryptor: new () => CTRGladmanMode;
  /**
   * Extends the base block cipher mode
   */
  extend(overrides?: Partial<CTRGladmanMode>): CTRGladmanModeStatic;
}

/**
 * CryptoJS library interface
 */
export interface CryptoJS {
  lib: {
    BlockCipherMode: {
      extend(overrides?: Partial<CTRGladmanMode>): CTRGladmanModeStatic;
    };
  };
  mode: {
    CTRGladman?: CTRGladmanModeStatic;
  };
}

/**
 * Increments a 32-bit counter value with little-endian byte overflow handling.
 * Compatible with Dr Brian Gladman's fileenc.c implementation.
 * 
 * The increment starts from the most significant byte (bits 24-31).
 * When a byte overflows (255 -> 0), the carry propagates to the next less significant byte.
 * 
 * @param counter - The 32-bit counter value to increment
 * @returns The incremented counter value
 */
declare function incrementCounter(counter: number): number;

/**
 * Increments the counter word array in-place.
 * 
 * Increments the first word, and if it overflows to zero,
 * increments the second word as well (64-bit counter support).
 * 
 * @param counterWords - The word array representing the counter
 */
declare function incrementCounterBlock(counterWords: number[]): void;

/**
 * CTR-Gladman block cipher mode of operation.
 * 
 * This mode turns a block cipher into a stream cipher by encrypting
 * an incrementing counter value and XORing the result with the plaintext.
 * 
 * Features:
 * - Counter increment compatible with Brian Gladman's fileenc.c
 * - Symmetric operation (encryption and decryption use the same process)
 * - Supports initialization vector (IV) as initial counter value
 * 
 * @param cryptoJS - The CryptoJS library instance
 * @returns The CTRGladman mode constructor
 */
declare function createCTRGladmanMode(cryptoJS: CryptoJS): CTRGladmanModeStatic;

export default createCTRGladmanMode;

/**
 * Module augmentation for CryptoJS
 */
declare module 'crypto-js' {
  interface CryptoJSStatic {
    mode: {
      CTRGladman: CTRGladmanModeStatic;
    };
  }
}