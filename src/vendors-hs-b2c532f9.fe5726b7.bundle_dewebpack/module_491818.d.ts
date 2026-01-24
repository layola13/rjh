/**
 * Zlib compression constants and flags
 * Defines standard constants used by zlib compression library
 */

/**
 * Flush modes for compression operations
 */

/** No flush - allow compression to accumulate more data */
export const Z_NO_FLUSH: 0;

/** Partial flush - flush pending output */
export const Z_PARTIAL_FLUSH: 1;

/** Sync flush - flush all pending output and align to byte boundary */
export const Z_SYNC_FLUSH: 2;

/** Full flush - flush all output and reset compression state */
export const Z_FULL_FLUSH: 3;

/** Finish compression - flush all output and finish the stream */
export const Z_FINISH: 4;

/** Emit a deflate block boundary and return */
export const Z_BLOCK: 5;

/** Flush the current block and emit trees */
export const Z_TREES: 6;

/**
 * Return codes for compression operations
 */

/** Operation completed successfully */
export const Z_OK: 0;

/** End of stream reached */
export const Z_STREAM_END: 1;

/** Dictionary is needed for decompression */
export const Z_NEED_DICT: 2;

/** Generic error code */
export const Z_ERRNO: -1;

/** Invalid stream state or parameters */
export const Z_STREAM_ERROR: -2;

/** Input data is corrupted */
export const Z_DATA_ERROR: -3;

/** Insufficient memory */
export const Z_MEM_ERROR: -4;

/** Insufficient buffer space */
export const Z_BUF_ERROR: -5;

/**
 * Compression levels
 */

/** No compression, store only */
export const Z_NO_COMPRESSION: 0;

/** Fastest compression with minimal compression ratio */
export const Z_BEST_SPEED: 1;

/** Best compression ratio but slowest */
export const Z_BEST_COMPRESSION: 9;

/** Default compression level (balance between speed and ratio) */
export const Z_DEFAULT_COMPRESSION: -1;

/**
 * Compression strategies
 */

/** Filtered compression strategy for small values with random distribution */
export const Z_FILTERED: 1;

/** Huffman-only compression strategy */
export const Z_HUFFMAN_ONLY: 2;

/** Run-length encoding compression strategy */
export const Z_RLE: 3;

/** Fixed Huffman codes compression strategy */
export const Z_FIXED: 4;

/** Default compression strategy */
export const Z_DEFAULT_STRATEGY: 0;

/**
 * Data type hints
 */

/** Binary data type */
export const Z_BINARY: 0;

/** Text data type */
export const Z_TEXT: 1;

/** Unknown data type */
export const Z_UNKNOWN: 2;

/**
 * Compression methods
 */

/** Deflate compression method (standard method) */
export const Z_DEFLATED: 8;