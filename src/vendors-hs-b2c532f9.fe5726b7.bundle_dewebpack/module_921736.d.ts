/**
 * Pako Inflate Module - DEFLATE decompression implementation
 * Provides functionality for decompressing DEFLATE-compressed data streams
 */

/**
 * Z-library status codes
 */
export declare const Z_OK: number;
export declare const Z_STREAM_END: number;
export declare const Z_NEED_DICT: number;
export declare const Z_STREAM_ERROR: number;
export declare const Z_DATA_ERROR: number;
export declare const Z_MEM_ERROR: number;
export declare const Z_BUF_ERROR: number;

/**
 * Flush modes for inflate operations
 */
export declare const Z_FINISH: number;
export declare const Z_BLOCK: number;
export declare const Z_TREES: number;

/**
 * Compression method
 */
export declare const Z_DEFLATED: number;

/**
 * Inflate stream state modes
 */
declare enum InflateMode {
  /** Reading header */
  HEAD = 16180,
  /** Waiting for dictionary */
  DICT = 16190,
  /** Processing type bits */
  TYPE = 16191,
  /** Processing stored/fixed/dynamic block */
  TYPEDO = 16192,
  /** Processing stored block */
  STORED = 16194,
  /** Processing fixed/dynamic codes */
  LEN = 16199,
  /** Processing length/literal/end-of-block */
  LENEXT = 16200,
  /** Processing distance code */
  DIST = 16206,
  /** Checking data integrity */
  CHECK = 16209,
  /** Processing length check */
  LENGTH = 16210,
  /** Stream finished */
  DONE = 16211
}

/**
 * GZIP header information
 */
export interface GZipHeader {
  /** Header CRC present flag */
  hcrc?: number;
  /** Text flag */
  text?: number;
  /** Modification time */
  time?: number;
  /** Extra flags */
  xflags?: number;
  /** Operating system */
  os?: number;
  /** Extra field data */
  extra?: Uint8Array;
  /** Extra field length */
  extra_len?: number;
  /** Original file name */
  name?: string;
  /** File comment */
  comment?: string;
  /** Header processing complete flag */
  done?: boolean;
}

/**
 * Internal inflate state
 * Maintains all state information needed for decompression
 */
export interface InflateState {
  /** Parent stream reference */
  strm: InflateStream | null;
  /** Current processing mode */
  mode: number;
  /** Last block flag */
  last: boolean;
  /** Wrapper type: 0=raw, 1=zlib, 2=gzip */
  wrap: number;
  /** Dictionary present flag */
  havedict: boolean;
  /** GZIP header flags */
  flags: number;
  /** Maximum distance for validity checks */
  dmax: number;
  /** Checksum value (Adler-32 or CRC-32) */
  check: number;
  /** Total bytes processed */
  total: number;
  /** GZIP header information */
  head: GZipHeader | null;
  /** Window size bits (8-15) */
  wbits: number;
  /** Window size (1 << wbits) */
  wsize: number;
  /** Valid bytes in window */
  whave: number;
  /** Next window write position */
  wnext: number;
  /** Sliding window buffer */
  window: Uint8Array | null;
  /** Bit accumulator */
  hold: number;
  /** Number of bits in accumulator */
  bits: number;
  /** Current length value */
  length: number;
  /** Current distance offset */
  offset: number;
  /** Extra bits needed */
  extra: number;
  /** Literal/length decode table */
  lencode: Int32Array | null;
  /** Distance decode table */
  distcode: Int32Array | null;
  /** Literal/length code bits */
  lenbits: number;
  /** Distance code bits */
  distbits: number;
  /** Number of code length codes */
  ncode: number;
  /** Number of literal/length codes */
  nlen: number;
  /** Number of distance codes */
  ndist: number;
  /** Codes processed count */
  have: number;
  /** Next code index */
  next: Int32Array | null;
  /** Code lengths work array */
  lens: Uint16Array;
  /** Huffman code work array */
  work: Uint16Array;
  /** Dynamic literal/length table */
  lendyn: Int32Array | null;
  /** Dynamic distance table */
  distdyn: Int32Array | null;
  /** Sanity check flag for distances */
  sane: number;
  /** Back reference bits */
  back: number;
  /** Previous length for copy */
  was: number;
}

/**
 * Inflate stream structure
 * Main interface for decompression operations
 */
export interface InflateStream {
  /** Input data buffer */
  input: Uint8Array;
  /** Next input byte position */
  next_in: number;
  /** Available input bytes */
  avail_in: number;
  /** Total input bytes processed */
  total_in: number;
  
  /** Output data buffer */
  output: Uint8Array;
  /** Next output byte position */
  next_out: number;
  /** Available output space */
  avail_out: number;
  /** Total output bytes produced */
  total_out: number;
  
  /** Error message */
  msg: string;
  /** Internal state */
  state: InflateState | null;
  /** Checksum value (Adler-32 or CRC-32) */
  adler: number;
  /** Data type indicator */
  data_type: number;
}

/**
 * Reset inflate state while keeping settings
 * @param stream - Inflate stream to reset
 * @returns Status code (Z_OK or Z_STREAM_ERROR)
 */
export declare function inflateResetKeep(stream: InflateStream): number;

/**
 * Reset inflate state including window
 * @param stream - Inflate stream to reset
 * @returns Status code (Z_OK or Z_STREAM_ERROR)
 */
export declare function inflateReset(stream: InflateStream): number;

/**
 * Reset inflate state with new window bits
 * @param stream - Inflate stream to reset
 * @param windowBits - Window size: 8-15, or negative for raw inflate
 * @returns Status code (Z_OK or Z_STREAM_ERROR)
 */
export declare function inflateReset2(stream: InflateStream, windowBits: number): number;

/**
 * Initialize inflate with default window size (15 bits)
 * @param stream - Inflate stream to initialize
 * @returns Status code (Z_OK or Z_STREAM_ERROR)
 */
export declare function inflateInit(stream: InflateStream): number;

/**
 * Initialize inflate with custom window size
 * @param stream - Inflate stream to initialize
 * @param windowBits - Window size configuration:
 *   - 8-15: zlib wrapper with specified window size
 *   - -8 to -15: raw deflate with specified window size
 *   - 24-31: gzip wrapper with window size (value - 16)
 *   - 40-47: auto-detect wrapper with window size (value - 32)
 * @returns Status code (Z_OK or Z_STREAM_ERROR)
 */
export declare function inflateInit2(stream: InflateStream, windowBits: number): number;

/**
 * Decompress data from input to output
 * @param stream - Inflate stream with input/output buffers
 * @param flush - Flush mode (Z_NO_FLUSH, Z_SYNC_FLUSH, Z_FINISH, etc.)
 * @returns Status code:
 *   - Z_OK: Progress made, more input/output may be needed
 *   - Z_STREAM_END: Decompression completed successfully
 *   - Z_NEED_DICT: Preset dictionary needed
 *   - Z_BUF_ERROR: No progress possible (need input or output space)
 *   - Z_STREAM_ERROR: Invalid stream state
 *   - Z_DATA_ERROR: Invalid compressed data
 *   - Z_MEM_ERROR: Insufficient memory
 */
export declare function inflate(stream: InflateStream, flush: number): number;

/**
 * Free inflate state resources
 * @param stream - Inflate stream to clean up
 * @returns Status code (Z_OK or Z_STREAM_ERROR)
 */
export declare function inflateEnd(stream: InflateStream): number;

/**
 * Set GZIP header structure to receive header information
 * @param stream - Inflate stream
 * @param header - Header structure to populate
 * @returns Status code (Z_OK or Z_STREAM_ERROR)
 */
export declare function inflateGetHeader(stream: InflateStream, header: GZipHeader): number;

/**
 * Set preset dictionary for decompression
 * @param stream - Inflate stream
 * @param dictionary - Dictionary data
 * @returns Status code:
 *   - Z_OK: Dictionary set successfully
 *   - Z_STREAM_ERROR: Invalid stream state
 *   - Z_DATA_ERROR: Dictionary mismatch
 */
export declare function inflateSetDictionary(stream: InflateStream, dictionary: Uint8Array): number;

/**
 * Library version information
 */
export declare const inflateInfo: string;