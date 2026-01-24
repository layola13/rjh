/**
 * SHA3 (Keccak) cryptographic hash algorithm implementation
 * Implements the SHA3 family of hash functions as standardized in FIPS 202
 */

declare module 'crypto-js' {
  export namespace lib {
    /**
     * WordArray represents an array of 32-bit words
     */
    export class WordArray {
      /**
       * The array of 32-bit words
       */
      words: number[];
      
      /**
       * The number of significant bytes in this word array
       */
      sigBytes: number;
      
      /**
       * Initializes a newly created word array
       * @param words - An array of 32-bit words
       * @param sigBytes - The number of significant bytes
       */
      init(words?: number[], sigBytes?: number): WordArray;
    }

    /**
     * Base class for hash algorithms
     */
    export abstract class Hasher {
      /**
       * Configuration object
       */
      static cfg: HasherConfig;
      
      /**
       * Configuration for this hasher instance
       */
      cfg: HasherConfig;
      
      /**
       * The data buffer
       */
      _data: WordArray;
      
      /**
       * The number of bytes processed so far
       */
      _nDataBytes: number;
      
      /**
       * The internal state
       */
      _state: unknown[];
      
      /**
       * The block size in 32-bit words
       */
      blockSize: number;
      
      /**
       * Resets this hasher to its initial state
       */
      reset(): void;
      
      /**
       * Updates this hasher with a message
       * @param messageUpdate - The message to append
       */
      update(messageUpdate: WordArray | string): this;
      
      /**
       * Finalizes the hash computation
       * @param messageUpdate - Optional final message to append
       */
      finalize(messageUpdate?: WordArray | string): WordArray;
      
      /**
       * Creates a copy of this hasher
       */
      clone(): this;
      
      /**
       * Processes data blocks
       */
      _process(): WordArray;
      
      /**
       * Resets the internal state
       */
      abstract _doReset(): void;
      
      /**
       * Processes a single data block
       * @param words - The data words
       * @param offset - The offset where the block starts
       */
      abstract _doProcessBlock(words: number[], offset: number): void;
      
      /**
       * Finalizes the hash computation
       */
      abstract _doFinalize(): WordArray;
      
      /**
       * Creates a shortcut function to the hasher
       * @param hasher - The hasher to wrap
       */
      static _createHelper(hasher: typeof Hasher): HashHelper;
      
      /**
       * Creates a shortcut function to the HMAC hasher
       * @param hasher - The hasher to wrap
       */
      static _createHmacHelper(hasher: typeof Hasher): HmacHashHelper;
      
      /**
       * Extends the hasher class
       * @param overrides - Properties to override
       */
      static extend(overrides: Partial<Hasher>): typeof Hasher;
    }
  }

  export namespace x64 {
    /**
     * Represents a 64-bit word as two 32-bit words (high and low)
     */
    export class Word {
      /**
       * The high 32 bits
       */
      high: number;
      
      /**
       * The low 32 bits
       */
      low: number;
      
      /**
       * Initializes a 64-bit word
       * @param high - The high 32 bits
       * @param low - The low 32 bits
       */
      init(high?: number, low?: number): Word;
      
      /**
       * Creates a new 64-bit word
       * @param high - The high 32 bits
       * @param low - The low 32 bits
       */
      static create(high?: number, low?: number): Word;
      
      /**
       * Creates a copy of this word
       */
      clone(): Word;
    }
  }

  export namespace algo {
    /**
     * SHA3 (Keccak) hash algorithm configuration
     */
    export interface SHA3Config extends HasherConfig {
      /**
       * Output length in bits (224, 256, 384, or 512)
       * @default 512
       */
      outputLength: 224 | 256 | 384 | 512;
    }

    /**
     * SHA3 (Keccak) cryptographic hash algorithm
     * 
     * This implementation follows the FIPS 202 standard with configurable output lengths.
     * The algorithm uses a sponge construction with the Keccak-f[1600] permutation.
     */
    export class SHA3 extends lib.Hasher {
      /**
       * Configuration object
       */
      cfg: SHA3Config;
      
      /**
       * Internal state as an array of 25 64-bit words
       */
      _state: x64.Word[];
      
      /**
       * Resets the hasher to its initial state
       * Initializes the 5×5 state array and calculates block size based on output length
       */
      _doReset(): void;
      
      /**
       * Processes a single 1600-bit (200-byte) block
       * Applies the Keccak-f[1600] permutation function
       * 
       * @param words - The data words to process
       * @param offset - The offset in the words array where the block starts
       */
      _doProcessBlock(words: number[], offset: number): void;
      
      /**
       * Finalizes the hash computation
       * Applies padding and extracts the hash value
       * 
       * @returns The computed hash as a WordArray
       */
      _doFinalize(): lib.WordArray;
      
      /**
       * Creates a copy of this hasher
       * 
       * @returns A clone of this SHA3 instance
       */
      clone(): SHA3;
      
      /**
       * Configuration object with default settings
       */
      static cfg: SHA3Config;
    }
  }

  /**
   * Configuration options for hash algorithms
   */
  export interface HasherConfig {
    /**
     * Extends the configuration with additional properties
     * @param overrides - Properties to add or override
     */
    extend(overrides: Record<string, unknown>): HasherConfig;
  }

  /**
   * Shortcut function for computing a hash
   */
  export interface HashHelper {
    /**
     * Computes a hash of the given message
     * @param message - The message to hash
     * @param cfg - Optional configuration
     */
    (message: lib.WordArray | string, cfg?: Record<string, unknown>): lib.WordArray;
  }

  /**
   * Shortcut function for computing an HMAC
   */
  export interface HmacHashHelper {
    /**
     * Computes an HMAC of the given message
     * @param message - The message to authenticate
     * @param key - The secret key
     */
    (message: lib.WordArray | string, key: lib.WordArray | string): lib.WordArray;
  }

  /**
   * Computes SHA3 hash
   * Shortcut function for hashing messages with SHA3-512 (default) or other variants
   * 
   * @example
   *