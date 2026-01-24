/**
 * CryptoJS Core Module
 * Provides cryptographic utility classes and encoding schemes
 */

/**
 * Configuration object that can be extended
 */
interface CryptoConfig {
  [key: string]: any;
}

/**
 * Encoder/Decoder interface for various encoding schemes
 */
interface Encoder {
  /**
   * Converts a WordArray to a string representation
   * @param wordArray - The WordArray to stringify
   * @returns The string representation
   */
  stringify(wordArray: WordArray): string;
  
  /**
   * Parses a string into a WordArray
   * @param str - The string to parse
   * @returns The parsed WordArray
   */
  parse(str: string): WordArray;
}

/**
 * Base class providing prototype inheritance and mixing capabilities
 */
interface Base {
  /**
   * Extends this object to create a new derived object
   * @param overrides - Properties to add/override in the new object
   * @returns A new extended object
   */
  extend(overrides?: Record<string, any>): Base;
  
  /**
   * Creates an instance of this object
   * @param args - Arguments to pass to the init method
   * @returns A new instance
   */
  create(...args: any[]): Base;
  
  /**
   * Initializes the object (called by create)
   * @param args - Initialization arguments
   */
  init(...args: any[]): void;
  
  /**
   * Copies properties from another object into this one
   * @param properties - Object containing properties to mix in
   */
  mixIn(properties: Record<string, any>): void;
  
  /**
   * Creates a copy of this object
   * @returns A cloned instance
   */
  clone(): this;
  
  /**
   * Reference to the parent/super class
   */
  $super?: Base;
}

/**
 * Represents an array of 32-bit words with a byte length
 * Core data structure for cryptographic operations
 */
interface WordArray extends Base {
  /**
   * The array of 32-bit words
   */
  words: number[];
  
  /**
   * The number of significant bytes in the word array
   */
  sigBytes: number;
  
  /**
   * Initializes a WordArray
   * @param words - Array of 32-bit words (defaults to empty array)
   * @param sigBytes - Number of significant bytes (defaults to words.length * 4)
   */
  init(words?: number[], sigBytes?: number): void;
  
  /**
   * Converts the WordArray to a string using the specified encoder
   * @param encoder - The encoder to use (defaults to Hex)
   * @returns String representation
   */
  toString(encoder?: Encoder): string;
  
  /**
   * Concatenates another WordArray to this one
   * @param wordArray - The WordArray to append
   * @returns This WordArray (for chaining)
   */
  concat(wordArray: WordArray): this;
  
  /**
   * Removes insignificant bits from the last word
   */
  clamp(): void;
  
  /**
   * Creates a WordArray filled with random bytes
   * @param nBytes - The number of random bytes to generate
   * @returns A new WordArray with random data
   */
  random(nBytes: number): WordArray;
}

/**
 * Base class for block cipher algorithms with buffering
 */
interface BufferedBlockAlgorithm extends Base {
  /**
   * The size of a processing block in 32-bit words
   */
  blockSize: number;
  
  /**
   * Minimum buffer size before processing
   */
  _minBufferSize: number;
  
  /**
   * Internal data buffer
   */
  _data: WordArray;
  
  /**
   * Number of bytes currently buffered
   */
  _nDataBytes: number;
  
  /**
   * Resets the internal state
   */
  reset(): void;
  
  /**
   * Appends data to the internal buffer
   * @param data - String or WordArray to append
   */
  _append(data: string | WordArray): void;
  
  /**
   * Processes buffered data blocks
   * @param doFlush - Whether to flush remaining data
   * @returns Processed data as WordArray
   */
  _process(doFlush?: boolean): WordArray;
  
  /**
   * Processes a single block of data
   * @param words - The data words to process
   * @param offset - Offset into the words array
   */
  _doProcessBlock(words: number[], offset: number): void;
}

/**
 * Base class for hash algorithms
 */
interface Hasher extends BufferedBlockAlgorithm {
  /**
   * Configuration options for the hasher
   */
  cfg: CryptoConfig;
  
  /**
   * Initializes the hasher with optional configuration
   * @param cfg - Configuration options
   */
  init(cfg?: CryptoConfig): void;
  
  /**
   * Updates the hash with new data
   * @param messageUpdate - Data to hash (string or WordArray)
   * @returns This hasher (for chaining)
   */
  update(messageUpdate: string | WordArray): this;
  
  /**
   * Finalizes the hash computation
   * @param messageUpdate - Optional final data to include
   * @returns The computed hash as WordArray
   */
  finalize(messageUpdate?: string | WordArray): WordArray;
  
  /**
   * Resets algorithm-specific state (implemented by subclasses)
   */
  _doReset(): void;
  
  /**
   * Performs the final hash computation (implemented by subclasses)
   * @returns The hash result
   */
  _doFinalize(): WordArray;
  
  /**
   * Creates a helper function for one-shot hashing
   * @param hasherConstructor - The hasher class constructor
   * @returns A function that computes hashes
   */
  _createHelper(hasherConstructor: HasherConstructor): HashFunction;
  
  /**
   * Creates a helper function for HMAC computation
   * @param hasherConstructor - The hasher class constructor
   * @returns A function that computes HMACs
   */
  _createHmacHelper(hasherConstructor: HasherConstructor): HmacFunction;
}

/**
 * Constructor type for Hasher classes
 */
interface HasherConstructor {
  new(cfg?: CryptoConfig): Hasher;
  init(cfg?: CryptoConfig): Hasher;
}

/**
 * One-shot hash function signature
 */
type HashFunction = (message: string | WordArray, cfg?: CryptoConfig) => WordArray;

/**
 * One-shot HMAC function signature
 */
type HmacFunction = (message: string | WordArray, key: string | WordArray) => WordArray;

/**
 * Library containing base classes
 */
interface Lib {
  /**
   * Base class for all CryptoJS classes
   */
  Base: Base;
  
  /**
   * WordArray class for representing byte arrays
   */
  WordArray: WordArray;
  
  /**
   * Base class for buffered block algorithms
   */
  BufferedBlockAlgorithm: BufferedBlockAlgorithm;
  
  /**
   * Base class for hash functions
   */
  Hasher: Hasher;
}

/**
 * Collection of encoding/decoding schemes
 */
interface Encoders {
  /**
   * Hexadecimal encoding
   */
  Hex: Encoder;
  
  /**
   * Latin1 (ISO-8859-1) encoding
   */
  Latin1: Encoder;
  
  /**
   * UTF-8 encoding
   */
  Utf8: Encoder;
}

/**
 * Algorithm namespace for hash and cipher implementations
 */
interface AlgoNamespace {
  /**
   * HMAC implementation
   */
  HMAC?: any;
  
  [algorithmName: string]: any;
}

/**
 * Root CryptoJS namespace
 */
interface CryptoJS {
  /**
   * Library of base classes
   */
  lib: Lib;
  
  /**
   * Encoding schemes
   */
  enc: Encoders;
  
  /**
   * Algorithm implementations
   */
  algo: AlgoNamespace;
}

/**
 * CryptoJS core module
 */
declare const CryptoJS: CryptoJS;

export = CryptoJS;