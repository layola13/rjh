/**
 * RIPEMD-160 Cryptographic Hash Algorithm
 * 
 * @preserve
 * (c) 2012 by Cédric Mesnil. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.
 */

/**
 * CryptoJS namespace containing cryptographic algorithms
 */
declare namespace CryptoJS {
  /**
   * Library namespace containing base classes and utilities
   */
  namespace lib {
    /**
     * Represents an array of 32-bit words
     */
    interface WordArray {
      /** Array of 32-bit words */
      words: number[];
      /** Number of significant bytes */
      sigBytes: number;
      /**
       * Creates a new WordArray
       * @param words - Array of 32-bit words
       * @param sigBytes - Number of significant bytes
       */
      create(words?: number[], sigBytes?: number): WordArray;
      /** Clones this WordArray */
      clone(): WordArray;
    }

    /**
     * Base class for hash algorithms
     */
    interface Hasher {
      /** The computed hash */
      _hash: WordArray;
      /** Input data buffer */
      _data: WordArray;
      /** Total bytes processed */
      _nDataBytes: number;

      /**
       * Resets the hasher to initial state
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
      _doFinalize(): WordArray;

      /**
       * Processes the data buffer
       */
      _process(): void;

      /**
       * Clones this hasher instance
       * @returns A clone of this hasher
       */
      clone(): Hasher;

      /**
       * Creates a helper function for this hasher
       * @param hasher - The hasher constructor
       */
      _createHelper(hasher: any): (message: string | WordArray, key?: string | WordArray) => WordArray;

      /**
       * Creates an HMAC helper function for this hasher
       * @param hasher - The hasher constructor
       */
      _createHmacHelper(hasher: any): (message: string | WordArray, key: string | WordArray) => WordArray;

      /**
       * Extends this base class
       * @param overrides - Properties to override
       */
      extend(overrides: Partial<Hasher>): any;
    }
  }

  /**
   * Algorithm namespace containing hash implementations
   */
  namespace algo {
    /**
     * RIPEMD-160 hash algorithm implementation
     * 
     * RIPEMD-160 is a 160-bit cryptographic hash function designed to be
     * used as a secure replacement for MD4 and MD5.
     */
    interface RIPEMD160 extends lib.Hasher {
      /**
       * Resets the hasher to its initial state
       * Initializes the hash buffer with RIPEMD-160 initial values
       */
      _doReset(): void;

      /**
       * Processes a 512-bit block of data
       * @param words - The data words array
       * @param offset - Offset into the words array where the block begins
       */
      _doProcessBlock(words: number[], offset: number): void;

      /**
       * Finalizes the hash computation
       * Applies padding and performs final transformations
       * @returns The computed 160-bit hash value
       */
      _doFinalize(): lib.WordArray;

      /**
       * Creates a copy of this hasher instance
       * @returns A new RIPEMD160 instance with copied state
       */
      clone(): RIPEMD160;
    }
  }

  /**
   * Computes RIPEMD-160 hash of a message
   * @param message - The message to hash (string or WordArray)
   * @param key - Optional key for keyed hashing
   * @returns The 160-bit hash value as a WordArray
   * 
   * @example
   *