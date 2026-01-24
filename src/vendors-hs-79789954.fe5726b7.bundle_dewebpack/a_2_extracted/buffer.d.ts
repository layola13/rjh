/**
 * Buffer module - Node.js-compatible Buffer implementation for browsers
 * Provides binary data manipulation capabilities with TypeScript support
 */

/// <reference types="node" />

/**
 * Maximum number of bytes to display when inspecting a Buffer
 */
export const INSPECT_MAX_BYTES: number;

/**
 * Buffer encoding types supported by the Buffer API
 */
export type BufferEncoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'latin1'
  | 'binary'
  | 'hex';

/**
 * Main Buffer class for handling binary data
 * Represents a fixed-length sequence of bytes
 */
export class Buffer extends Uint8Array {
  /**
   * Pool size for buffer allocation optimization
   */
  static readonly poolSize: number;

  /**
   * Maximum length of a Buffer instance
   */
  static readonly kMaxLength: number;

  /**
   * Indicates if typed array support is available in the runtime
   */
  static readonly TYPED_ARRAY_SUPPORT: boolean;

  /**
   * Creates a Buffer from various input types
   * @param value - Data source (string, array, ArrayBuffer, Buffer, etc.)
   * @param encodingOrOffset - Encoding (for strings) or offset (for ArrayBuffer)
   * @param length - Length of the buffer
   */
  constructor(
    value: string | number | Array<number> | ArrayBuffer | Buffer,
    encodingOrOffset?: BufferEncoding | number,
    length?: number
  );

  /**
   * Allocates a new Buffer of specified size with optional fill value
   * @param size - Size of the buffer in bytes
   * @param fill - Value or string to pre-fill the buffer
   * @param encoding - Encoding to use if fill is a string
   * @returns Newly allocated Buffer
   */
  static alloc(size: number, fill?: string | number | Buffer, encoding?: BufferEncoding): Buffer;

  /**
   * Allocates a new Buffer without initialization (faster but potentially unsafe)
   * @param size - Size of the buffer in bytes
   * @returns Uninitialized Buffer
   */
  static allocUnsafe(size: number): Buffer;

  /**
   * Allocates a new Buffer without initialization (bypasses pool)
   * @param size - Size of the buffer in bytes
   * @returns Uninitialized Buffer
   */
  static allocUnsafeSlow(size: number): Buffer;

  /**
   * Creates a Buffer from various input types
   * @param value - Data source
   * @param encodingOrOffset - Encoding or offset parameter
   * @param length - Length parameter
   * @returns New Buffer instance
   */
  static from(
    value: string | Array<number> | ArrayBuffer | Buffer | { type: 'Buffer'; data: number[] },
    encodingOrOffset?: BufferEncoding | number,
    length?: number
  ): Buffer;

  /**
   * Checks if an object is a Buffer instance
   * @param obj - Object to test
   * @returns True if obj is a Buffer
   */
  static isBuffer(obj: unknown): obj is Buffer;

  /**
   * Checks if a string encoding is supported
   * @param encoding - Encoding name to check
   * @returns True if encoding is valid
   */
  static isEncoding(encoding: string): encoding is BufferEncoding;

  /**
   * Returns the byte length of a string when encoded
   * @param string - String or Buffer to measure
   * @param encoding - Character encoding
   * @returns Number of bytes
   */
  static byteLength(string: string | Buffer | ArrayBuffer, encoding?: BufferEncoding): number;

  /**
   * Concatenates an array of Buffers into a single Buffer
   * @param list - Array of Buffers to concatenate
   * @param totalLength - Optional total length (calculated if not provided)
   * @returns Concatenated Buffer
   */
  static concat(list: ReadonlyArray<Buffer>, totalLength?: number): Buffer;

  /**
   * Compares two Buffers for sorting purposes
   * @param buf1 - First buffer
   * @param buf2 - Second buffer
   * @returns -1, 0, or 1 for sorting
   */
  static compare(buf1: Buffer, buf2: Buffer): -1 | 0 | 1;

  /**
   * Writes a string to the buffer at a given offset
   * @param string - String to write
   * @param offset - Byte offset to start writing
   * @param length - Maximum bytes to write
   * @param encoding - Character encoding
   * @returns Number of bytes written
   */
  write(string: string, offset?: number, length?: number, encoding?: BufferEncoding): number;

  /**
   * Converts buffer contents to a string
   * @param encoding - Character encoding
   * @param start - Start byte offset
   * @param end - End byte offset
   * @returns Decoded string
   */
  toString(encoding?: BufferEncoding, start?: number, end?: number): string;

  /**
   * Returns a JSON representation of the buffer
   * @returns Object with type and data properties
   */
  toJSON(): { type: 'Buffer'; data: number[] };

  /**
   * Checks if this buffer is equal to another buffer
   * @param otherBuffer - Buffer to compare against
   * @returns True if buffers are equal
   */
  equals(otherBuffer: Buffer): boolean;

  /**
   * Compares this buffer with another buffer
   * @param target - Buffer to compare against
   * @param targetStart - Offset in target buffer
   * @param targetEnd - End offset in target buffer
   * @param sourceStart - Offset in source buffer
   * @param sourceEnd - End offset in source buffer
   * @returns Comparison result (-1, 0, or 1)
   */
  compare(
    target: Buffer,
    targetStart?: number,
    targetEnd?: number,
    sourceStart?: number,
    sourceEnd?: number
  ): -1 | 0 | 1;

  /**
   * Copies data from this buffer to a target buffer
   * @param target - Destination buffer
   * @param targetStart - Offset in target buffer
   * @param sourceStart - Offset in source buffer
   * @param sourceEnd - End offset in source buffer
   * @returns Number of bytes copied
   */
  copy(target: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;

  /**
   * Creates a new buffer that references the same memory as the original
   * @param start - Start offset
   * @param end - End offset
   * @returns New Buffer view
   */
  slice(start?: number, end?: number): Buffer;

  /**
   * Fills the buffer with a specified value
   * @param value - Value to fill (string, number, or Buffer)
   * @param offset - Start offset
   * @param end - End offset
   * @param encoding - Encoding if value is a string
   * @returns This buffer for chaining
   */
  fill(value: string | number | Buffer, offset?: number, end?: number, encoding?: BufferEncoding): this;

  /**
   * Searches for a value in the buffer
   * @param value - Value to search for
   * @param byteOffset - Offset to start searching
   * @param encoding - Encoding if value is a string
   * @returns Index of first occurrence or -1
   */
  indexOf(value: string | number | Buffer, byteOffset?: number, encoding?: BufferEncoding): number;

  /**
   * Searches for a value in the buffer from the end
   * @param value - Value to search for
   * @param byteOffset - Offset to start searching backwards
   * @param encoding - Encoding if value is a string
   * @returns Index of last occurrence or -1
   */
  lastIndexOf(value: string | number | Buffer, byteOffset?: number, encoding?: BufferEncoding): number;

  /**
   * Checks if the buffer contains a value
   * @param value - Value to search for
   * @param byteOffset - Offset to start searching
   * @param encoding - Encoding if value is a string
   * @returns True if value is found
   */
  includes(value: string | number | Buffer, byteOffset?: number, encoding?: BufferEncoding): boolean;

  /**
   * Swaps byte order in-place for 16-bit values
   * @returns This buffer for chaining
   */
  swap16(): Buffer;

  /**
   * Swaps byte order in-place for 32-bit values
   * @returns This buffer for chaining
   */
  swap32(): Buffer;

  /**
   * Swaps byte order in-place for 64-bit values
   * @returns This buffer for chaining
   */
  swap64(): Buffer;

  /**
   * Returns a string representation for debugging
   * @returns Formatted string showing buffer contents
   */
  inspect(): string;

  // Read methods - Unsigned Integers
  readUInt8(offset: number, noAssert?: boolean): number;
  readUInt16LE(offset: number, noAssert?: boolean): number;
  readUInt16BE(offset: number, noAssert?: boolean): number;
  readUInt32LE(offset: number, noAssert?: boolean): number;
  readUInt32BE(offset: number, noAssert?: boolean): number;
  readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
  readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;

  // Read methods - Signed Integers
  readInt8(offset: number, noAssert?: boolean): number;
  readInt16LE(offset: number, noAssert?: boolean): number;
  readInt16BE(offset: number, noAssert?: boolean): number;
  readInt32LE(offset: number, noAssert?: boolean): number;
  readInt32BE(offset: number, noAssert?: boolean): number;
  readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
  readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;

  // Read methods - Floating Point
  readFloatLE(offset: number, noAssert?: boolean): number;
  readFloatBE(offset: number, noAssert?: boolean): number;
  readDoubleLE(offset: number, noAssert?: boolean): number;
  readDoubleBE(offset: number, noAssert?: boolean): number;

  // Write methods - Unsigned Integers
  writeUInt8(value: number, offset: number, noAssert?: boolean): number;
  writeUInt16LE(value: number, offset: number, noAssert?: boolean): number;
  writeUInt16BE(value: number, offset: number, noAssert?: boolean): number;
  writeUInt32LE(value: number, offset: number, noAssert?: boolean): number;
  writeUInt32BE(value: number, offset: number, noAssert?: boolean): number;
  writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
  writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;

  // Write methods - Signed Integers
  writeInt8(value: number, offset: number, noAssert?: boolean): number;
  writeInt16LE(value: number, offset: number, noAssert?: boolean): number;
  writeInt16BE(value: number, offset: number, noAssert?: boolean): number;
  writeInt32LE(value: number, offset: number, noAssert?: boolean): number;
  writeInt32BE(value: number, offset: number, noAssert?: boolean): number;
  writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
  writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;

  // Write methods - Floating Point
  writeFloatLE(value: number, offset: number, noAssert?: boolean): number;
  writeFloatBE(value: number, offset: number, noAssert?: boolean): number;
  writeDoubleLE(value: number, offset: number, noAssert?: boolean): number;
  writeDoubleBE(value: number, offset: number, noAssert?: boolean): number;

  /**
   * Internal flag indicating this is a Buffer instance
   * @internal
   */
  readonly _isBuffer: true;
}

/**
 * Legacy slow buffer constructor (deprecated)
 * Creates an uninitialized buffer allocated outside the pool
 * @param size - Size in bytes
 * @returns Uninitialized Buffer
 * @deprecated Use Buffer.allocUnsafeSlow() instead
 */
export function SlowBuffer(size: number): Buffer;