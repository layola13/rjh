/**
 * Buffer module type definitions
 * Browser-compatible implementation of Node.js Buffer API
 * @license MIT
 */

/**
 * Encoding types supported by Buffer operations
 */
export type BufferEncoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'utf-16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'latin1'
  | 'binary'
  | 'hex';

/**
 * Buffer constructor options
 */
export interface BufferConstructorOptions {
  /** Maximum size for buffer pooling */
  poolSize?: number;
}

/**
 * Buffer class - provides a way to work with binary data
 * Compatible with Uint8Array with additional methods
 */
export interface Buffer extends Uint8Array {
  /** Internal flag indicating this is a Buffer instance */
  readonly _isBuffer: true;

  /**
   * Writes string to buffer at offset according to encoding
   * @param string - Data to write
   * @param offset - Number of bytes to skip before starting to write
   * @param length - Maximum number of bytes to write
   * @param encoding - Character encoding to use
   * @returns Number of bytes written
   */
  write(string: string, encoding?: BufferEncoding): number;
  write(string: string, offset: number, encoding?: BufferEncoding): number;
  write(string: string, offset: number, length: number, encoding?: BufferEncoding): number;

  /**
   * Decodes buffer to a string according to encoding
   * @param encoding - Character encoding to use
   * @param start - Index to start decoding at
   * @param end - Index to stop decoding at (not inclusive)
   * @returns Decoded string
   */
  toString(encoding?: BufferEncoding, start?: number, end?: number): string;

  /**
   * Returns a JSON representation of the buffer
   * @returns Object with type 'Buffer' and data array
   */
  toJSON(): { type: 'Buffer'; data: number[] };

  /**
   * Compares two buffers
   * @param target - Buffer to compare with
   * @param targetStart - Offset within target to start comparison
   * @param targetEnd - Offset within target to end comparison (not inclusive)
   * @param sourceStart - Offset within source to start comparison
   * @param sourceEnd - Offset within source to end comparison (not inclusive)
   * @returns 0 if equal, 1 if target comes after, -1 if target comes before
   */
  compare(
    target: Uint8Array,
    targetStart?: number,
    targetEnd?: number,
    sourceStart?: number,
    sourceEnd?: number
  ): -1 | 0 | 1;

  /**
   * Copies data from a region of this buffer to a region in target
   * @param target - Buffer to copy into
   * @param targetStart - Offset within target to start copying to
   * @param sourceStart - Offset within this buffer to start copying from
   * @param sourceEnd - Offset within this buffer to stop copying from (not inclusive)
   * @returns Number of bytes copied
   */
  copy(target: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;

  /**
   * Creates a new buffer that references the same memory as the original
   * @param start - Index to start the slice at
   * @param end - Index to end the slice at (not inclusive)
   * @returns New Buffer instance
   */
  slice(start?: number, end?: number): Buffer;

  /**
   * Fills the buffer with the specified value
   * @param value - Value to fill buffer with
   * @param offset - Number of bytes to skip before starting to fill
   * @param end - Index to stop filling at (not inclusive)
   * @param encoding - Encoding to use if value is a string
   * @returns Reference to this buffer
   */
  fill(value: string | number | Uint8Array, offset?: number, end?: number, encoding?: BufferEncoding): this;

  /**
   * Returns the index of the first occurrence of value in buffer
   * @param value - What to search for
   * @param byteOffset - Where to begin searching
   * @param encoding - Character encoding if value is a string
   * @returns Index of first occurrence, or -1 if not found
   */
  indexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): number;

  /**
   * Returns the index of the last occurrence of value in buffer
   * @param value - What to search for
   * @param byteOffset - Where to begin searching backward
   * @param encoding - Character encoding if value is a string
   * @returns Index of last occurrence, or -1 if not found
   */
  lastIndexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): number;

  /**
   * Returns true if value is found in buffer
   * @param value - What to search for
   * @param byteOffset - Where to begin searching
   * @param encoding - Character encoding if value is a string
   */
  includes(value: string | number | Buffer, byteOffset?: number, encoding?: BufferEncoding): boolean;

  /**
   * Swaps byte order (16-bit)
   * @returns Reference to this buffer
   */
  swap16(): Buffer;

  /**
   * Swaps byte order (32-bit)
   * @returns Reference to this buffer
   */
  swap32(): Buffer;

  /**
   * Swaps byte order (64-bit)
   * @returns Reference to this buffer
   */
  swap64(): Buffer;

  // Read methods for unsigned integers
  readUInt8(offset: number, noAssert?: boolean): number;
  readUInt16LE(offset: number, noAssert?: boolean): number;
  readUInt16BE(offset: number, noAssert?: boolean): number;
  readUInt32LE(offset: number, noAssert?: boolean): number;
  readUInt32BE(offset: number, noAssert?: boolean): number;
  readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
  readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;

  // Read methods for signed integers
  readInt8(offset: number, noAssert?: boolean): number;
  readInt16LE(offset: number, noAssert?: boolean): number;
  readInt16BE(offset: number, noAssert?: boolean): number;
  readInt32LE(offset: number, noAssert?: boolean): number;
  readInt32BE(offset: number, noAssert?: boolean): number;
  readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
  readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;

  // Read methods for floating point
  readFloatLE(offset: number, noAssert?: boolean): number;
  readFloatBE(offset: number, noAssert?: boolean): number;
  readDoubleLE(offset: number, noAssert?: boolean): number;
  readDoubleBE(offset: number, noAssert?: boolean): number;

  // Write methods for unsigned integers
  writeUInt8(value: number, offset: number, noAssert?: boolean): number;
  writeUInt16LE(value: number, offset: number, noAssert?: boolean): number;
  writeUInt16BE(value: number, offset: number, noAssert?: boolean): number;
  writeUInt32LE(value: number, offset: number, noAssert?: boolean): number;
  writeUInt32BE(value: number, offset: number, noAssert?: boolean): number;
  writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
  writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;

  // Write methods for signed integers
  writeInt8(value: number, offset: number, noAssert?: boolean): number;
  writeInt16LE(value: number, offset: number, noAssert?: boolean): number;
  writeInt16BE(value: number, offset: number, noAssert?: boolean): number;
  writeInt32LE(value: number, offset: number, noAssert?: boolean): number;
  writeInt32BE(value: number, offset: number, noAssert?: boolean): number;
  writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
  writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;

  // Write methods for floating point
  writeFloatLE(value: number, offset: number, noAssert?: boolean): number;
  writeFloatBE(value: number, offset: number, noAssert?: boolean): number;
  writeDoubleLE(value: number, offset: number, noAssert?: boolean): number;
  writeDoubleBE(value: number, offset: number, noAssert?: boolean): number;
}

/**
 * Buffer constructor interface
 */
export interface BufferConstructor {
  /**
   * Allocates a new buffer of size bytes filled with fill value
   * @param size - Desired length of the buffer
   * @param fill - Value to pre-fill the buffer with
   * @param encoding - Encoding to use if fill is a string
   */
  alloc(size: number, fill?: string | number | Buffer, encoding?: BufferEncoding): Buffer;

  /**
   * Allocates a new buffer of size bytes without initialization
   * @param size - Desired length of the buffer
   */
  allocUnsafe(size: number): Buffer;

  /**
   * Allocates a new non-pooled buffer of size bytes
   * @param size - Desired length of the buffer
   */
  allocUnsafeSlow(size: number): Buffer;

  /**
   * Creates a new Buffer from various input types
   * @param data - Data to create buffer from
   * @param encodingOrOffset - Encoding (string) or offset (ArrayBuffer)
   * @param length - Length (ArrayBuffer only)
   */
  from(data: string, encoding?: BufferEncoding): Buffer;
  from(data: number[]): Buffer;
  from(data: Uint8Array): Buffer;
  from(data: ArrayBuffer, byteOffset?: number, length?: number): Buffer;

  /**
   * Returns true if obj is a Buffer instance
   * @param obj - Object to test
   */
  isBuffer(obj: unknown): obj is Buffer;

  /**
   * Returns true if encoding is a valid encoding name
   * @param encoding - Encoding name to test
   */
  isEncoding(encoding: string): encoding is BufferEncoding;

  /**
   * Returns the byte length of a string when encoded
   * @param string - String to measure
   * @param encoding - Character encoding to use
   */
  byteLength(string: string | Buffer | ArrayBuffer | Uint8Array, encoding?: BufferEncoding): number;

  /**
   * Concatenates a list of buffers into one buffer
   * @param list - Array of buffers to concatenate
   * @param totalLength - Total length of concatenated buffers
   */
  concat(list: ReadonlyArray<Uint8Array>, totalLength?: number): Buffer;

  /**
   * Compares two buffers
   * @param buf1 - First buffer
   * @param buf2 - Second buffer
   * @returns 0 if equal, 1 if buf1 comes after buf2, -1 if buf1 comes before buf2
   */
  compare(buf1: Uint8Array, buf2: Uint8Array): -1 | 0 | 1;

  /** Default pool size for buffer allocation */
  poolSize: number;

  readonly prototype: Buffer;
}

/**
 * Main Buffer export
 */
export const hp: BufferConstructor;

/**
 * Inspection depth constant
 */
export const IS: number;