/**
 * Inflate (decompression) module for zlib/gzip data streams.
 * Provides streaming and one-shot decompression APIs.
 */

/**
 * Options for configuring the Inflate decompression stream.
 */
export interface InflateOptions {
  /**
   * Size of the internal chunk buffer for decompression.
   * @default 65536
   */
  chunkSize?: number;

  /**
   * Window size (zlib windowBits parameter).
   * Range: 8-15 for standard zlib, +16 for gzip, +32 for auto-detect, negative for raw deflate.
   * @default 15
   */
  windowBits?: number;

  /**
   * Output format: empty string for Uint8Array, "string" for UTF-8 string.
   * @default ""
   */
  to?: "" | "string";

  /**
   * Use raw deflate format (no zlib header/trailer).
   * @default false
   */
  raw?: boolean;

  /**
   * Preset dictionary for decompression (must match compression dictionary).
   */
  dictionary?: Uint8Array | string | ArrayBuffer;
}

/**
 * Header information extracted from gzip streams.
 */
export interface GzipHeader {
  /**
   * true if compressed with maximum compression, false if fastest.
   */
  text?: boolean;

  /**
   * Modification time (Unix timestamp).
   */
  time?: number;

  /**
   * Extra flags.
   */
  xflags?: number;

  /**
   * Operating system identifier.
   */
  os?: number;

  /**
   * Extra field data.
   */
  extra?: Uint8Array;

  /**
   * Original file name.
   */
  name?: string;

  /**
   * File comment.
   */
  comment?: string;

  /**
   * true if header CRC is present.
   */
  hcrc?: boolean;

  /**
   * Whether header parsing is complete.
   */
  done?: boolean;
}

/**
 * Internal zlib stream state object.
 */
export interface ZStream {
  /**
   * Input buffer.
   */
  input?: Uint8Array;

  /**
   * Position of next input byte to process.
   */
  next_in?: number;

  /**
   * Number of bytes available in input buffer.
   */
  avail_in?: number;

  /**
   * Output buffer.
   */
  output?: Uint8Array;

  /**
   * Position of next output byte.
   */
  next_out?: number;

  /**
   * Remaining space in output buffer.
   */
  avail_out?: number;

  /**
   * Last error message.
   */
  msg?: string;

  /**
   * Internal stream state (opaque).
   */
  state?: unknown;
}

/**
 * Streaming inflate (decompression) class.
 * Supports zlib, gzip, and raw deflate formats.
 */
export class Inflate {
  /**
   * Configuration options.
   */
  options: Required<InflateOptions>;

  /**
   * Last error code (0 = Z_OK = success).
   */
  err: number;

  /**
   * Error message string.
   */
  msg: string;

  /**
   * Whether decompression has finished.
   */
  ended: boolean;

  /**
   * Accumulated output chunks.
   */
  chunks: Array<Uint8Array | string>;

  /**
   * Internal zlib stream state.
   */
  strm: ZStream;

  /**
   * Gzip header information (populated for gzip streams).
   */
  header: GzipHeader;

  /**
   * Final decompression result (available after stream ends).
   */
  result?: Uint8Array | string;

  /**
   * Creates a new Inflate decompression stream.
   * @param options - Configuration options
   */
  constructor(options?: InflateOptions);

  /**
   * Push input data through the decompression stream.
   * @param data - Compressed input data
   * @param flush - Flush mode: true/Z_FINISH to finalize, false/Z_NO_FLUSH for partial input
   * @returns false if stream error occurred, true otherwise
   */
  push(data: Uint8Array | ArrayBuffer, flush?: boolean | number): boolean;

  /**
   * Called when decompressed data is available.
   * Override to handle streaming output.
   * @param chunk - Decompressed data chunk
   */
  onData(chunk: Uint8Array | string): void;

  /**
   * Called when decompression ends (success or error).
   * @param status - Final zlib status code
   */
  onEnd(status: number): void;
}

/**
 * One-shot decompression of zlib/gzip data.
 * @param data - Compressed input data
 * @param options - Decompression options
 * @returns Decompressed data as Uint8Array or string (based on options.to)
 * @throws Error if decompression fails
 */
export function inflate(
  data: Uint8Array | ArrayBuffer,
  options?: InflateOptions
): Uint8Array | string;

/**
 * One-shot decompression of raw deflate data (no zlib wrapper).
 * @param data - Compressed input data
 * @param options - Decompression options (raw flag is automatically set)
 * @returns Decompressed data as Uint8Array or string (based on options.to)
 * @throws Error if decompression fails
 */
export function inflateRaw(
  data: Uint8Array | ArrayBuffer,
  options?: InflateOptions
): Uint8Array | string;

/**
 * One-shot decompression of gzip data.
 * Alias for inflate() which auto-detects gzip format.
 * @param data - Compressed gzip data
 * @param options - Decompression options
 * @returns Decompressed data as Uint8Array or string (based on options.to)
 * @throws Error if decompression fails
 */
export function ungzip(
  data: Uint8Array | ArrayBuffer,
  options?: InflateOptions
): Uint8Array | string;

/**
 * Zlib constants (flush modes, return codes, compression levels, strategies).
 */
export const constants: {
  /**
   * No flush - partial input, more data expected.
   */
  Z_NO_FLUSH: number;

  /**
   * Partial flush.
   */
  Z_PARTIAL_FLUSH: number;

  /**
   * Sync flush - flush output, align to byte boundary.
   */
  Z_SYNC_FLUSH: number;

  /**
   * Full flush - reset compression state.
   */
  Z_FULL_FLUSH: number;

  /**
   * Finish compression/decompression.
   */
  Z_FINISH: number;

  /**
   * Operation completed successfully.
   */
  Z_OK: number;

  /**
   * End of stream reached.
   */
  Z_STREAM_END: number;

  /**
   * Preset dictionary needed.
   */
  Z_NEED_DICT: number;

  /**
   * Stream structure error.
   */
  Z_STREAM_ERROR: number;

  /**
   * Input data corrupted.
   */
  Z_DATA_ERROR: number;

  /**
   * Insufficient memory.
   */
  Z_MEM_ERROR: number;

  /**
   * Buffer error.
   */
  Z_BUF_ERROR: number;

  /**
   * Incompatible version.
   */
  Z_VERSION_ERROR: number;

  // Compression levels
  Z_NO_COMPRESSION: number;
  Z_BEST_SPEED: number;
  Z_BEST_COMPRESSION: number;
  Z_DEFAULT_COMPRESSION: number;

  // Compression strategies
  Z_FILTERED: number;
  Z_HUFFMAN_ONLY: number;
  Z_RLE: number;
  Z_FIXED: number;
  Z_DEFAULT_STRATEGY: number;
};