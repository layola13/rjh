/**
 * IEEE 754 floating point number encoding and decoding utilities for ArrayBuffer and DataView polyfills
 * Provides typed array support for environments that lack native implementations
 */

/** Property key for internal buffer storage */
type BufferKey = '_b' | 'buffer';

/** Property key for byte length */
type ByteLengthKey = '_l' | 'byteLength';

/** Property key for byte offset */
type ByteOffsetKey = '_o' | 'byteOffset';

/**
 * Encodes a number into IEEE 754 binary representation
 * @param value - The number to encode
 * @param mantissaBits - Number of bits for mantissa (23 for float32, 52 for float64)
 * @param byteLength - Number of bytes in output (4 for float32, 8 for float64)
 * @returns Array of bytes representing the encoded number
 */
declare function packIEEE754(
  value: number,
  mantissaBits: number,
  byteLength: number
): number[];

/**
 * Decodes IEEE 754 binary representation into a number
 * @param bytes - Array of bytes to decode
 * @param mantissaBits - Number of bits for mantissa (23 for float32, 52 for float64)
 * @param byteLength - Number of bytes to read (4 for float32, 8 for float64)
 * @returns The decoded number (can be NaN, Infinity, or -Infinity)
 */
declare function unpackIEEE754(
  bytes: number[],
  mantissaBits: number,
  byteLength: number
): number;

/**
 * Reads a 32-bit integer from 4 bytes in little-endian format
 * @param bytes - Array containing at least 4 bytes
 * @returns 32-bit integer value
 */
declare function readInt32LE(bytes: number[]): number;

/**
 * Packs an 8-bit signed/unsigned integer
 * @param value - Number to pack
 * @returns Single-byte array
 */
declare function packInt8(value: number): number[];

/**
 * Packs a 16-bit integer into 2 bytes
 * @param value - Number to pack
 * @returns Two-byte array in little-endian format
 */
declare function packInt16(value: number): number[];

/**
 * Packs a 32-bit integer into 4 bytes
 * @param value - Number to pack
 * @returns Four-byte array in little-endian format
 */
declare function packInt32(value: number): number[];

/**
 * Packs a 64-bit float (double precision)
 * @param value - Number to pack
 * @returns Eight-byte array in IEEE 754 format
 */
declare function packFloat64(value: number): number[];

/**
 * Packs a 32-bit float (single precision)
 * @param value - Number to pack
 * @returns Four-byte array in IEEE 754 format
 */
declare function packFloat32(value: number): number[];

/**
 * Defines a getter property on the prototype
 * @param target - Target object
 * @param propertyName - Public property name
 * @param internalKey - Internal property key to read from
 */
declare function defineGetter(
  target: Record<string, unknown>,
  propertyName: string,
  internalKey: string
): void;

/**
 * Reads bytes from an ArrayBuffer view
 * @param view - DataView-like object with internal buffer
 * @param byteCount - Number of bytes to read
 * @param offset - Byte offset to start reading
 * @param littleEndian - Whether to read in little-endian format
 * @returns Array of bytes
 * @throws RangeError if offset is out of bounds
 */
declare function readBytes(
  view: DataViewLike,
  byteCount: number,
  offset: number,
  littleEndian?: boolean
): number[];

/**
 * Writes bytes to an ArrayBuffer view
 * @param view - DataView-like object with internal buffer
 * @param byteCount - Number of bytes to write
 * @param offset - Byte offset to start writing
 * @param packer - Function that converts value to byte array
 * @param value - Value to write
 * @param littleEndian - Whether to write in little-endian format
 * @throws RangeError if offset is out of bounds
 */
declare function writeBytes(
  view: DataViewLike,
  byteCount: number,
  offset: number,
  packer: (value: number) => number[],
  value: number,
  littleEndian?: boolean
): void;

/**
 * Internal representation of ArrayBuffer polyfill
 */
interface ArrayBufferLike {
  /** Internal byte buffer */
  readonly _b?: number[];
  /** Internal or public byte length */
  readonly _l?: number;
  readonly byteLength?: number;
}

/**
 * Internal representation of DataView polyfill
 */
interface DataViewLike {
  /** Internal buffer reference */
  readonly _b?: ArrayBufferLike;
  readonly buffer?: ArrayBufferLike;
  /** Internal or public byte length */
  readonly _l?: number;
  readonly byteLength?: number;
  /** Internal or public byte offset */
  readonly _o?: number;
  readonly byteOffset?: number;
}

/**
 * Polyfill for ArrayBuffer
 * Creates a fixed-size buffer for raw binary data
 */
declare class ArrayBuffer {
  /**
   * Creates a new ArrayBuffer
   * @param byteLength - Size of the buffer in bytes
   * @throws RangeError if byteLength is negative or too large
   */
  constructor(byteLength: number);

  /** The size in bytes of the array */
  readonly byteLength: number;
  
  /** Internal byte storage (polyfill implementation detail) */
  readonly _b?: number[];
  readonly _l?: number;
}

/**
 * Polyfill for DataView
 * Provides a low-level interface for reading/writing multiple number types in an ArrayBuffer
 */
declare class DataView {
  /**
   * Creates a new DataView
   * @param buffer - ArrayBuffer to create a view of
   * @param byteOffset - Offset in bytes from start of buffer (default: 0)
   * @param byteLength - Number of bytes to include in view (default: buffer length - byteOffset)
   * @throws TypeError if buffer is not an ArrayBuffer
   * @throws RangeError if offset or length is out of bounds
   */
  constructor(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number);

  /** The ArrayBuffer referenced by this view */
  readonly buffer: ArrayBuffer;
  
  /** The length in bytes of this view */
  readonly byteLength: number;
  
  /** The offset in bytes from the start of the buffer */
  readonly byteOffset: number;

  /**
   * Gets a signed 8-bit integer at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @returns Signed 8-bit integer (-128 to 127)
   */
  getInt8(byteOffset: number): number;

  /**
   * Gets an unsigned 8-bit integer at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @returns Unsigned 8-bit integer (0 to 255)
   */
  getUint8(byteOffset: number): number;

  /**
   * Gets a signed 16-bit integer at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param littleEndian - Whether to read in little-endian format (default: false)
   * @returns Signed 16-bit integer (-32768 to 32767)
   */
  getInt16(byteOffset: number, littleEndian?: boolean): number;

  /**
   * Gets an unsigned 16-bit integer at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param littleEndian - Whether to read in little-endian format (default: false)
   * @returns Unsigned 16-bit integer (0 to 65535)
   */
  getUint16(byteOffset: number, littleEndian?: boolean): number;

  /**
   * Gets a signed 32-bit integer at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param littleEndian - Whether to read in little-endian format (default: false)
   * @returns Signed 32-bit integer (-2147483648 to 2147483647)
   */
  getInt32(byteOffset: number, littleEndian?: boolean): number;

  /**
   * Gets an unsigned 32-bit integer at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param littleEndian - Whether to read in little-endian format (default: false)
   * @returns Unsigned 32-bit integer (0 to 4294967295)
   */
  getUint32(byteOffset: number, littleEndian?: boolean): number;

  /**
   * Gets a 32-bit floating point number at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param littleEndian - Whether to read in little-endian format (default: false)
   * @returns 32-bit float (IEEE 754 single precision)
   */
  getFloat32(byteOffset: number, littleEndian?: boolean): number;

  /**
   * Gets a 64-bit floating point number at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param littleEndian - Whether to read in little-endian format (default: false)
   * @returns 64-bit float (IEEE 754 double precision)
   */
  getFloat64(byteOffset: number, littleEndian?: boolean): number;

  /**
   * Stores a signed 8-bit integer at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param value - Value to set (-128 to 127)
   */
  setInt8(byteOffset: number, value: number): void;

  /**
   * Stores an unsigned 8-bit integer at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param value - Value to set (0 to 255)
   */
  setUint8(byteOffset: number, value: number): void;

  /**
   * Stores a signed 16-bit integer at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param value - Value to set (-32768 to 32767)
   * @param littleEndian - Whether to write in little-endian format (default: false)
   */
  setInt16(byteOffset: number, value: number, littleEndian?: boolean): void;

  /**
   * Stores an unsigned 16-bit integer at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param value - Value to set (0 to 65535)
   * @param littleEndian - Whether to write in little-endian format (default: false)
   */
  setUint16(byteOffset: number, value: number, littleEndian?: boolean): void;

  /**
   * Stores a signed 32-bit integer at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param value - Value to set (-2147483648 to 2147483647)
   * @param littleEndian - Whether to write in little-endian format (default: false)
   */
  setInt32(byteOffset: number, value: number, littleEndian?: boolean): void;

  /**
   * Stores an unsigned 32-bit integer at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param value - Value to set (0 to 4294967295)
   * @param littleEndian - Whether to write in little-endian format (default: false)
   */
  setUint32(byteOffset: number, value: number, littleEndian?: boolean): void;

  /**
   * Stores a 32-bit floating point number at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param value - Value to set (IEEE 754 single precision)
   * @param littleEndian - Whether to write in little-endian format (default: false)
   */
  setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void;

  /**
   * Stores a 64-bit floating point number at the specified byte offset
   * @param byteOffset - Offset from start of the view
   * @param value - Value to set (IEEE 754 double precision)
   * @param littleEndian - Whether to write in little-endian format (default: false)
   */
  setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void;

  /** Internal properties (polyfill implementation details) */
  readonly _b?: ArrayBufferLike;
  readonly _l?: number;
  readonly _o?: number;
}

export { ArrayBuffer, DataView };