/**
 * Pako compression/decompression library module
 * Provides deflate/inflate compression algorithms and gzip functionality
 * @module pako
 */

/**
 * Deflate compression class for streaming compression
 */
export class Deflate {
  /**
   * Creates a new Deflate instance
   * @param options - Compression options
   */
  constructor(options?: DeflateOptions);
  
  /**
   * Pushes data chunk for compression
   * @param data - Input data to compress
   * @param flush - Flush mode
   * @returns True if operation succeeded
   */
  push(data: Uint8Array | string, flush?: boolean | number): boolean;
  
  /**
   * Compression result
   */
  result?: Uint8Array;
  
  /**
   * Error code (0 if no error)
   */
  err: number;
  
  /**
   * Error message
   */
  msg: string;
}

/**
 * Inflate decompression class for streaming decompression
 */
export class Inflate {
  /**
   * Creates a new Inflate instance
   * @param options - Decompression options
   */
  constructor(options?: InflateOptions);
  
  /**
   * Pushes data chunk for decompression
   * @param data - Compressed data to decompress
   * @param flush - Flush mode
   * @returns True if operation succeeded
   */
  push(data: Uint8Array, flush?: boolean | number): boolean;
  
  /**
   * Decompression result
   */
  result?: Uint8Array;
  
  /**
   * Error code (0 if no error)
   */
  err: number;
  
  /**
   * Error message
   */
  msg: string;
}

/**
 * Options for deflate compression
 */
export interface DeflateOptions {
  /** Compression level (0-9, default: 6) */
  level?: number;
  /** Compression method */
  method?: number;
  /** Window size */
  windowBits?: number;
  /** Memory level */
  memLevel?: number;
  /** Compression strategy */
  strategy?: number;
  /** Output as string */
  to?: 'string';
  /** Chunk size */
  chunkSize?: number;
}

/**
 * Options for inflate decompression
 */
export interface InflateOptions {
  /** Window size */
  windowBits?: number;
  /** Output as string */
  to?: 'string';
  /** Chunk size */
  chunkSize?: number;
}

/**
 * Compresses data using deflate algorithm
 * @param input - Data to compress
 * @param options - Compression options
 * @returns Compressed data
 */
export function deflate(input: Uint8Array | string, options?: DeflateOptions): Uint8Array;

/**
 * Compresses data using raw deflate algorithm (without headers)
 * @param input - Data to compress
 * @param options - Compression options
 * @returns Compressed data
 */
export function deflateRaw(input: Uint8Array | string, options?: DeflateOptions): Uint8Array;

/**
 * Compresses data using gzip format
 * @param input - Data to compress
 * @param options - Compression options
 * @returns Gzip compressed data
 */
export function gzip(input: Uint8Array | string, options?: DeflateOptions): Uint8Array;

/**
 * Decompresses deflate compressed data
 * @param input - Compressed data
 * @param options - Decompression options
 * @returns Decompressed data
 */
export function inflate(input: Uint8Array, options?: InflateOptions): Uint8Array;

/**
 * Decompresses raw deflate data (without headers)
 * @param input - Compressed data
 * @param options - Decompression options
 * @returns Decompressed data
 */
export function inflateRaw(input: Uint8Array, options?: InflateOptions): Uint8Array;

/**
 * Decompresses gzip compressed data
 * @param input - Gzip compressed data
 * @param options - Decompression options
 * @returns Decompressed data
 */
export function ungzip(input: Uint8Array, options?: InflateOptions): Uint8Array;

/**
 * Compression/decompression constants
 */
export const constants: {
  /** No flush */
  readonly Z_NO_FLUSH: number;
  /** Partial flush */
  readonly Z_PARTIAL_FLUSH: number;
  /** Sync flush */
  readonly Z_SYNC_FLUSH: number;
  /** Full flush */
  readonly Z_FULL_FLUSH: number;
  /** Finish compression/decompression */
  readonly Z_FINISH: number;
  /** Block flush */
  readonly Z_BLOCK: number;
  /** Trees flush */
  readonly Z_TREES: number;
  
  /** Success status */
  readonly Z_OK: number;
  /** Stream end status */
  readonly Z_STREAM_END: number;
  /** Need dictionary status */
  readonly Z_NEED_DICT: number;
  /** Error statuses */
  readonly Z_ERRNO: number;
  readonly Z_STREAM_ERROR: number;
  readonly Z_DATA_ERROR: number;
  readonly Z_MEM_ERROR: number;
  readonly Z_BUF_ERROR: number;
  readonly Z_VERSION_ERROR: number;
  
  /** Compression levels */
  readonly Z_NO_COMPRESSION: number;
  readonly Z_BEST_SPEED: number;
  readonly Z_BEST_COMPRESSION: number;
  readonly Z_DEFAULT_COMPRESSION: number;
  
  /** Compression strategies */
  readonly Z_FILTERED: number;
  readonly Z_HUFFMAN_ONLY: number;
  readonly Z_RLE: number;
  readonly Z_FIXED: number;
  readonly Z_DEFAULT_STRATEGY: number;
  
  /** Deflate compression method */
  readonly Z_DEFLATED: number;
};