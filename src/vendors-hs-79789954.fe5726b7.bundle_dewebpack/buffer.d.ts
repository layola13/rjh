/**
 * Buffer module type definitions
 * Provides Node.js-compatible Buffer implementation for binary data manipulation
 */

/**
 * Encoding types supported by Buffer operations
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
 * Maximum number of bytes to display when inspecting a Buffer
 */
export const INSPECT_MAX_BYTES: number;

/**
 * Immutable array-like view of binary data
 * The Buffer class is a subclass of Uint8Array and provides methods for reading/writing various data types
 */
export class Buffer extends Uint8Array {
  /**
   * Maximum safe buffer allocation size
   */
  static readonly kMaxLength: number;

  /**
   * Number of bytes used for buffer pooling (default: 8192)
   */
  static poolSize: number;

  /**
   * Whether typed array support is available in the environment
   */
  static readonly TYPED_ARRAY_SUPPORT: boolean;

  /**
   * Allocates a new Buffer of specified size with optional fill value
   * @param size - The desired length of the buffer
   * @param fill - Value to pre-fill the buffer (default: 0)
   * @param encoding - Encoding to use if fill is a string (default: 'utf8')
   * @returns A new initialized Buffer instance
   */
  static alloc(size: number, fill?: string | number | Buffer, encoding?: BufferEncoding): Buffer;

  /**
   * Allocates a new Buffer without initialization (faster but contains old memory data)
   * @param size - The desired length of the buffer
   * @returns A new uninitialized Buffer instance
   */
  static allocUnsafe(size: number): Buffer;

  /**
   * Allocates a new Buffer without initialization (non-pooled)
   * @param size - The desired length of the buffer
   * @returns A new uninitialized Buffer instance
   */
  static allocUnsafeSlow(size: number): Buffer;

  /**
   * Checks if an object is a Buffer instance
   * @param obj - The object to check
   * @returns True if obj is a Buffer
   */
  static isBuffer(obj: unknown): obj is Buffer;

  /**
   * Creates a new Buffer from various input types
   * @param value - Array, ArrayBuffer, Buffer, string, or array-like object
   * @param encodingOrOffset - Encoding (if string) or byte offset (if ArrayBuffer)
   * @param length - Length to read from ArrayBuffer
   * @returns A new Buffer instance
   */
  static from(
    value: string | ArrayBuffer | ArrayLike<number> | Buffer,
    encodingOrOffset?: BufferEncoding | number,
    length?: number
  ): Buffer;

  /**
   * Compares two Buffers for sorting purposes
   * @param buf1 - First buffer to compare
   * @param buf2 - Second buffer to compare
   * @returns -1, 0, or 1 depending on comparison result
   */
  static compare(buf1: Buffer, buf2: Buffer): -1 | 0 | 1;

  /**
   * Concatenates an array of Buffers into a single Buffer
   * @param list - Array of Buffers to concatenate
   * @param totalLength - Total length of concatenated result (optional optimization)
   * @returns A new Buffer containing all input buffers
   */
  static concat(list: readonly Buffer[], totalLength?: number): Buffer;

  /**
   * Checks if a string is a valid encoding name
   * @param encoding - The encoding name to check
   * @returns True if encoding is supported
   */
  static isEncoding(encoding: string): encoding is BufferEncoding;

  /**
   * Returns the byte length of a string when encoded
   * @param string - The string to measure
   * @param encoding - The encoding to use (default: 'utf8')
   * @returns Number of bytes required to encode the string
   */
  static byteLength(string: string | Buffer | ArrayBuffer | ArrayBufferView, encoding?: BufferEncoding): number;

  /**
   * Byte length of the buffer
   */
  readonly length: number;

  /**
   * Writes a string to the buffer at the specified offset
   * @param string - Data to write
   * @param offset - Position to start writing (default: 0)
   * @param length - Maximum bytes to write (default: buffer.length - offset)
   * @param encoding - Character encoding (default: 'utf8')
   * @returns Number of bytes written
   */
  write(string: string, offset?: number, length?: number, encoding?: BufferEncoding): number;

  /**
   * Decodes buffer to a string
   * @param encoding - Character encoding to use (default: 'utf8')
   * @param start - Start byte index (default: 0)
   * @param end - End byte index (default: buffer.length)
   * @returns Decoded string
   */
  toString(encoding?: BufferEncoding, start?: number, end?: number): string;

  /**
   * Returns a JSON representation of the buffer
   * @returns Object with type 'Buffer' and data array
   */
  toJSON(): { type: 'Buffer'; data: number[] };

  /**
   * Checks if this buffer is equal to another buffer
   * @param otherBuffer - Buffer to compare with
   * @returns True if buffers have identical bytes
   */
  equals(otherBuffer: Buffer): boolean;

  /**
   * Compares this buffer with another for sorting
   * @param target - Buffer to compare with
   * @param targetStart - Start position in target (default: 0)
   * @param targetEnd - End position in target (default: target.length)
   * @param sourceStart - Start position in this buffer (default: 0)
   * @param sourceEnd - End position in this buffer (default: this.length)
   * @returns -1, 0, or 1 depending on comparison result
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
   * @param targetStart - Start position in target (default: 0)
   * @param sourceStart - Start position in source (default: 0)
   * @param sourceEnd - End position in source (default: this.length)
   * @returns Number of bytes copied
   */
  copy(target: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;

  /**
   * Returns a new buffer that references the same memory as the original
   * @param start - Start byte index (default: 0)
   * @param end - End byte index (default: buffer.length)
   * @returns A new Buffer view
   */
  slice(start?: number, end?: number): Buffer;

  /**
   * Fills the buffer with a specified value
   * @param value - Value to fill buffer with
   * @param offset - Start position (default: 0)
   * @param end - End position (default: buffer.length)
   * @param encoding - Encoding if value is string (default: 'utf8')
   * @returns The modified buffer
   */
  fill(value: string | number | Buffer, offset?: number, end?: number, encoding?: BufferEncoding): this;

  /**
   * Searches for a value in the buffer
   * @param value - Value to search for
   * @param byteOffset - Position to start search (default: 0)
   * @param encoding - Encoding if value is string (default: 'utf8')
   * @returns Index of first occurrence or -1 if not found
   */
  indexOf(value: string | number | Buffer, byteOffset?: number, encoding?: BufferEncoding): number;

  /**
   * Searches for a value in the buffer from the end
   * @param value - Value to search for
   * @param byteOffset - Position to start reverse search (default: buffer.length - 1)
   * @param encoding - Encoding if value is string (default: 'utf8')
   * @returns Index of last occurrence or -1 if not found
   */
  lastIndexOf(value: string | number | Buffer, byteOffset?: number, encoding?: BufferEncoding): number;

  /**
   * Checks if buffer contains a value
   * @param value - Value to search for
   * @param byteOffset - Position to start search (default: 0)
   * @param encoding - Encoding if value is string (default: 'utf8')
   * @returns True if value is found
   */
  includes(value: string | number | Buffer, byteOffset?: number, encoding?: BufferEncoding): boolean;

  /**
   * Swaps byte order (16-bit units)
   * @returns The modified buffer
   */
  swap16(): this;

  /**
   * Swaps byte order (32-bit units)
   * @returns The modified buffer
   */
  swap32(): this;

  /**
   * Swaps byte order (64-bit units)
   * @returns The modified buffer
   */
  swap64(): this;

  // Read methods - unsigned integers
  readUInt8(offset: number, noAssert?: boolean): number;
  readUInt16LE(offset: number, noAssert?: boolean): number;
  readUInt16BE(offset: number, noAssert?: boolean): number;
  readUInt32LE(offset: number, noAssert?: boolean): number;
  readUInt32BE(offset: number, noAssert?: boolean): number;
  readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
  readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;

  // Read methods - signed integers
  readInt8(offset: number, noAssert?: boolean): number;
  readInt16LE(offset: number, noAssert?: boolean): number;
  readInt16BE(offset: number, noAssert?: boolean): number;
  readInt32LE(offset: number, noAssert?: boolean): number;
  readInt32BE(offset: number, noAssert?: boolean): number;
  readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
  readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;

  // Read methods - floating point
  readFloatLE(offset: number, noAssert?: boolean): number;
  readFloatBE(offset: number, noAssert?: boolean): number;
  readDoubleLE(offset: number, noAssert?: boolean): number;
  readDoubleBE(offset: number, noAssert?: boolean): number;

  // Write methods - unsigned integers
  writeUInt8(value: number, offset: number, noAssert?: boolean): number;
  writeUInt16LE(value: number, offset: number, noAssert?: boolean): number;
  writeUInt16BE(value: number, offset: number, noAssert?: boolean): number;
  writeUInt32LE(value: number, offset: number, noAssert?: boolean): number;
  writeUInt32BE(value: number, offset: number, noAssert?: boolean): number;
  writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
  writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;

  // Write methods - signed integers
  writeInt8(value: number, offset: number, noAssert?: boolean): number;
  writeInt16LE(value: number, offset: number, noAssert?: boolean): number;
  writeInt16BE(value: number, offset: number, noAssert?: boolean): number;
  writeInt32LE(value: number, offset: number, noAssert?: boolean): number;
  writeInt32BE(value: number, offset: number, noAssert?: boolean): number;
  writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
  writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;

  // Write methods - floating point
  writeFloatLE(value: number, offset: number, noAssert?: boolean): number;
  writeFloatBE(value: number, offset: number, noAssert?: boolean): number;
  writeDoubleLE(value: number, offset: number, noAssert?: boolean): number;
  writeDoubleBE(value: number, offset: number, noAssert?: boolean): number;

  /**
   * Returns a string representation for debugging
   * @returns Formatted string showing buffer contents
   */
  inspect(): string;

  /**
   * Internal flag indicating this is a Buffer instance
   * @internal
   */
  readonly _isBuffer: true;
}

/**
 * Creates an uninitialized buffer (legacy API, use Buffer.allocUnsafe instead)
 * @param size - The desired length of the buffer
 * @returns A new uninitialized Buffer instance
 * @deprecated Use Buffer.allocUnsafe() instead
 */
export function SlowBuffer(size: number): Buffer;