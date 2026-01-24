/**
 * MD5 hash algorithm implementation with HMAC support
 * Supports multiple input types: string, ArrayBuffer, Uint8Array, Array
 * Supports multiple output formats: hex, digest, array, arrayBuffer, base64
 */

/**
 * Input data type for MD5 hashing
 * Can be a string, ArrayBuffer, typed array, or number array
 */
export type Md5InputData = string | ArrayBuffer | Uint8Array | number[];

/**
 * Output format type for hash results
 */
export type Md5OutputFormat = 'hex' | 'array' | 'digest' | 'buffer' | 'arrayBuffer' | 'base64';

/**
 * MD5 hash result as a byte array (16 bytes)
 */
export type Md5Digest = number[];

/**
 * Core MD5 hasher class
 * Implements the MD5 algorithm with streaming support
 */
export declare class Md5Hasher {
  /**
   * Internal hash state - h0 register
   */
  private h0: number;

  /**
   * Internal hash state - h1 register
   */
  private h1: number;

  /**
   * Internal hash state - h2 register
   */
  private h2: number;

  /**
   * Internal hash state - h3 register
   */
  private h3: number;

  /**
   * Current data blocks being processed (17 x 32-bit integers)
   */
  private blocks: Uint32Array | number[];

  /**
   * Byte view of blocks (for ArrayBuffer environments)
   */
  private buffer8?: Uint8Array;

  /**
   * Total bytes processed (low 32 bits)
   */
  private bytes: number;

  /**
   * Total bytes processed (high 32 bits, for > 4GB data)
   */
  private hBytes: number;

  /**
   * Current position in the buffer (0-64)
   */
  private start: number;

  /**
   * Index of the last byte written
   */
  private lastByteIndex: number;

  /**
   * Whether finalize() has been called
   */
  private finalized: boolean;

  /**
   * Whether hash() has been called for current block
   */
  private hashed: boolean;

  /**
   * Whether this is the first hash() call
   */
  private first: boolean;

  /**
   * Creates a new MD5 hasher instance
   * @param sharedMemory - If true, uses shared memory for better performance
   */
  constructor(sharedMemory?: boolean);

  /**
   * Updates the hash with new data (streaming)
   * @param data - Input data to hash
   * @returns This hasher instance for chaining
   */
  update(data: Md5InputData): this;

  /**
   * Finalizes the hash computation
   * Must be called before reading results
   */
  finalize(): void;

  /**
   * Performs the core MD5 compression function on current block
   */
  private hash(): void;

  /**
   * Returns the hash as a hexadecimal string (32 characters)
   */
  hex(): string;

  /**
   * Returns the hash as a hexadecimal string (alias for hex())
   */
  toString(): string;

  /**
   * Returns the hash as a byte array (16 bytes)
   */
  digest(): Md5Digest;

  /**
   * Returns the hash as a byte array (alias for digest())
   */
  array(): Md5Digest;

  /**
   * Returns the hash as an ArrayBuffer (16 bytes)
   */
  arrayBuffer(): ArrayBuffer;

  /**
   * Returns the hash as an ArrayBuffer (alias for arrayBuffer())
   */
  buffer(): ArrayBuffer;

  /**
   * Returns the hash as a Base64 string
   */
  base64(): string;
}

/**
 * HMAC-MD5 hasher class
 * Implements Hash-based Message Authentication Code using MD5
 */
export declare class HmacMd5Hasher extends Md5Hasher {
  /**
   * Outer key pad (64 bytes XOR'd with 0x5C)
   */
  private oKeyPad: number[];

  /**
   * Whether currently processing inner hash
   */
  private inner: boolean;

  /**
   * Whether using shared memory
   */
  private sharedMemory: boolean;

  /**
   * Creates a new HMAC-MD5 hasher instance
   * @param key - Secret key for HMAC (string, ArrayBuffer, or array)
   * @param sharedMemory - If true, uses shared memory for better performance
   */
  constructor(key: Md5InputData, sharedMemory?: boolean);

  /**
   * Finalizes the HMAC computation
   * Performs both inner and outer hash passes
   */
  finalize(): void;
}

/**
 * Main MD5 hash function interface
 * @param data - Input data to hash
 * @returns Hexadecimal hash string
 */
export interface Md5Function {
  (data: Md5InputData): string;

  /**
   * Creates a new MD5 hasher instance for streaming
   */
  create(): Md5Hasher;

  /**
   * Convenience method: create hasher and update with data
   * @param data - Input data
   */
  update(data: Md5InputData): Md5Hasher;

  /**
   * Returns hash as hexadecimal string
   */
  hex(data: Md5InputData): string;

  /**
   * Returns hash as byte array
   */
  array(data: Md5InputData): Md5Digest;

  /**
   * Returns hash as byte array (alias for array)
   */
  digest(data: Md5InputData): Md5Digest;

  /**
   * Returns hash as ArrayBuffer
   */
  buffer(data: Md5InputData): ArrayBuffer;

  /**
   * Returns hash as ArrayBuffer (alias for buffer)
   */
  arrayBuffer(data: Md5InputData): ArrayBuffer;

  /**
   * Returns hash as Base64 string
   */
  base64(data: Md5InputData): string;
}

/**
 * HMAC-MD5 function interface
 * @param key - Secret key
 * @param data - Input data
 * @returns Hexadecimal HMAC string
 */
export interface HmacMd5Function {
  (key: Md5InputData, data: Md5InputData): string;

  /**
   * Creates a new HMAC-MD5 hasher instance
   * @param key - Secret key
   */
  create(key: Md5InputData): HmacMd5Hasher;

  /**
   * Convenience method: create HMAC hasher and update with data
   * @param key - Secret key
   * @param data - Input data
   */
  update(key: Md5InputData, data: Md5InputData): HmacMd5Hasher;

  /**
   * Returns HMAC as hexadecimal string
   */
  hex(key: Md5InputData, data: Md5InputData): string;

  /**
   * Returns HMAC as byte array
   */
  array(key: Md5InputData, data: Md5InputData): Md5Digest;

  /**
   * Returns HMAC as byte array (alias for array)
   */
  digest(key: Md5InputData, data: Md5InputData): Md5Digest;

  /**
   * Returns HMAC as ArrayBuffer
   */
  buffer(key: Md5InputData, data: Md5InputData): ArrayBuffer;

  /**
   * Returns HMAC as ArrayBuffer (alias for buffer)
   */
  arrayBuffer(key: Md5InputData, data: Md5InputData): ArrayBuffer;

  /**
   * Returns HMAC as Base64 string
   */
  base64(key: Md5InputData, data: Md5InputData): string;
}

/**
 * Main MD5 module interface
 */
export interface Md5Module extends Md5Function {
  /**
   * Main MD5 hash function (same as default export)
   */
  md5: Md5Function & {
    /**
     * HMAC-MD5 function and utilities
     */
    hmac: HmacMd5Function;
  };
}

/**
 * Default export: MD5 hash function
 * @example
 *