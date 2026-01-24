/**
 * Deflate compression module - Type definitions
 * Implements the DEFLATE compression algorithm (RFC 1951)
 */

/**
 * Compression level constants
 */
export const Z_NO_FLUSH: number;
export const Z_PARTIAL_FLUSH: number;
export const Z_FULL_FLUSH: number;
export const Z_FINISH: number;
export const Z_BLOCK: number;

/**
 * Return codes
 */
export const Z_OK: number;
export const Z_STREAM_END: number;
export const Z_STREAM_ERROR: number;
export const Z_DATA_ERROR: number;
export const Z_BUF_ERROR: number;

/**
 * Compression levels
 */
export const Z_DEFAULT_COMPRESSION: number;

/**
 * Compression strategies
 */
export const Z_FILTERED: number;
export const Z_HUFFMAN_ONLY: number;
export const Z_RLE: number;
export const Z_FIXED: number;
export const Z_DEFAULT_STRATEGY: number;

/**
 * Deflate stream state
 */
export interface DeflateState {
    /** Associated z_stream */
    strm: ZStream | null;
    /** Current state (INIT_STATE, BUSY_STATE, FINISH_STATE, etc.) */
    status: number;
    /** Output buffer */
    pending_buf: Uint8Array | null;
    /** Size of pending_buf */
    pending_buf_size: number;
    /** Next pending byte to output */
    pending_out: number;
    /** Number of bytes in the pending buffer */
    pending: number;
    /** 0=none, 1=zlib, 2=gzip */
    wrap: number;
    /** gzip header information */
    gzhead: GZHeader | null;
    /** Index into gzip header extra field */
    gzindex: number;
    /** Compression method (Z_DEFLATED) */
    method: number;
    /** Value of flush param for previous deflate call */
    last_flush: number;

    /** Window size (32K by default) */
    w_size: number;
    /** log2(w_size) */
    w_bits: number;
    /** w_size - 1 */
    w_mask: number;
    /** Sliding window */
    window: Uint8Array | null;
    /** Actual size of window: 2 * w_size */
    window_size: number;

    /** Link to older string with same hash index */
    prev: Uint16Array | null;
    /** Heads of the hash chains */
    head: Uint16Array | null;

    /** Hash index of string to be inserted */
    ins_h: number;
    /** Number of elements in hash table */
    hash_size: number;
    /** log2(hash_size) */
    hash_bits: number;
    /** hash_size - 1 */
    hash_mask: number;
    /** Number of bits by which ins_h must be shifted */
    hash_shift: number;

    /** Start of string to insert */
    block_start: number;
    /** Length of matched string */
    match_length: number;
    /** Previous match */
    prev_match: number;
    /** Set if previous match exists */
    match_available: number;
    /** Start of string to insert */
    strstart: number;
    /** Start of matching string */
    match_start: number;
    /** Number of valid bytes ahead in window */
    lookahead: number;

    /** Length of best match at previous step */
    prev_length: number;
    /** Maximum hash chain length */
    max_chain_length: number;
    /** Don't look for matches beyond this */
    max_lazy_match: number;

    /** Compression level (0-9) */
    level: number;
    /** Compression strategy */
    strategy: number;
    /** Use lazy matching above this match length */
    good_match: number;
    /** Stop searching above this match length */
    nice_match: number;

    /** Literal and length tree */
    dyn_ltree: Uint16Array;
    /** Distance tree */
    dyn_dtree: Uint16Array;
    /** Huffman tree for bit lengths */
    bl_tree: Uint16Array;

    /** Descriptor for literal tree */
    l_desc: TreeDesc | null;
    /** Descriptor for distance tree */
    d_desc: TreeDesc | null;
    /** Descriptor for bit length tree */
    bl_desc: TreeDesc | null;

    /** Number of codes at each bit length */
    bl_count: Uint16Array;
    /** Heap used to build the Huffman trees */
    heap: Uint16Array;
    /** Number of elements in the heap */
    heap_len: number;
    /** Element of largest frequency */
    heap_max: number;
    /** Depth of each subtree used as tie breaker for trees of equal frequency */
    depth: Uint16Array;

    /** Index for literals or lengths */
    sym_buf: number;
    /** Size of lit_buf and dist_buf */
    lit_bufsize: number;
    /** Next symbol out */
    sym_next: number;
    /** End of valid data in sym_buf */
    sym_end: number;

    /** Bit length of current block with optimal trees */
    opt_len: number;
    /** Bit length of current block with static trees */
    static_len: number;
    /** Number of string matches in current block */
    matches: number;
    /** Number of bytes to insert into window before next match lookup */
    insert: number;

    /** Output bit buffer */
    bi_buf: number;
    /** Number of valid bits in bi_buf */
    bi_valid: number;
    /** High water mark offset in window for initialized bytes */
    high_water: number;
}

/**
 * Compression stream
 */
export interface ZStream {
    /** Input data */
    input: Uint8Array;
    /** Next input byte index */
    next_in: number;
    /** Number of bytes available at input */
    avail_in: number;
    /** Total number of input bytes read so far */
    total_in: number;

    /** Output buffer */
    output: Uint8Array;
    /** Next output byte index */
    next_out: number;
    /** Remaining free space at output */
    avail_out: number;
    /** Total number of bytes output so far */
    total_out: number;

    /** Last error message, null if no error */
    msg?: string;
    /** Internal state */
    state: DeflateState;
    /** Checksum value (Adler-32 or CRC-32) */
    adler: number;
    /** Best guess about the data type: binary or text */
    data_type: number;
}

/**
 * GZip header information
 */
export interface GZHeader {
    /** True if text data */
    text?: boolean;
    /** Modification time */
    time?: number;
    /** Extra flags */
    xflags?: number;
    /** Operating system */
    os?: number;
    /** Extra field */
    extra?: Uint8Array;
    /** Extra field length */
    extra_len?: number;
    /** File name */
    name?: string;
    /** Comment */
    comment?: string;
    /** True if header CRC present */
    hcrc?: boolean;
    /** CRC-16 value if hcrc is true */
    crc?: number;
}

/**
 * Tree descriptor for Huffman coding
 */
export interface TreeDesc {
    /** Huffman tree */
    dyn_tree: Uint16Array;
    /** Maximum code length */
    max_code: number;
    /** Static tree or null */
    stat_desc: StaticTreeDesc | null;
}

/**
 * Static tree descriptor
 */
export interface StaticTreeDesc {
    /** Static tree */
    static_tree: Uint16Array | null;
    /** Extra bits for each code or null */
    extra_bits: Uint8Array | null;
    /** Base index for extra_bits */
    extra_base: number;
    /** Number of elements */
    elems: number;
    /** Maximum bit length */
    max_length: number;
}

/**
 * Initialize deflate compression
 * 
 * @param strm - Compression stream
 * @param level - Compression level (0-9, or Z_DEFAULT_COMPRESSION)
 * @returns Z_OK on success, Z_STREAM_ERROR on parameter error, Z_MEM_ERROR on memory allocation failure
 */
export function deflateInit(strm: ZStream, level: number): number;

/**
 * Initialize deflate compression with advanced parameters
 * 
 * @param strm - Compression stream
 * @param level - Compression level (0-9)
 * @param method - Compression method (must be Z_DEFLATED)
 * @param windowBits - Base-2 logarithm of window size (8-15). Negative for raw deflate, +16 for gzip
 * @param memLevel - Memory usage level (1-9)
 * @param strategy - Compression strategy (Z_DEFAULT_STRATEGY, Z_FILTERED, Z_HUFFMAN_ONLY, Z_RLE, Z_FIXED)
 * @returns Z_OK on success, error code otherwise
 */
export function deflateInit2(
    strm: ZStream,
    level: number,
    method: number,
    windowBits: number,
    memLevel: number,
    strategy: number
): number;

/**
 * Compress data
 * 
 * @param strm - Compression stream
 * @param flush - Flush mode (Z_NO_FLUSH, Z_PARTIAL_FLUSH, Z_SYNC_FLUSH, Z_FULL_FLUSH, Z_FINISH, Z_BLOCK)
 * @returns Z_OK if progress made, Z_STREAM_END if finished, error code otherwise
 */
export function deflate(strm: ZStream, flush: number): number;

/**
 * Reset deflate stream state, keeping compression parameters
 * 
 * @param strm - Compression stream
 * @returns Z_OK on success, Z_STREAM_ERROR on parameter error
 */
export function deflateReset(strm: ZStream): number;

/**
 * Reset deflate stream state without resetting compression parameters
 * 
 * @param strm - Compression stream
 * @returns Z_OK on success, Z_STREAM_ERROR on parameter error
 */
export function deflateResetKeep(strm: ZStream): number;

/**
 * Set gzip header for compression
 * 
 * @param strm - Compression stream
 * @param head - GZip header information
 * @returns Z_OK on success, Z_STREAM_ERROR if not using gzip wrapper
 */
export function deflateSetHeader(strm: ZStream, head: GZHeader): number;

/**
 * Free all dynamically allocated data structures
 * 
 * @param strm - Compression stream
 * @returns Z_OK on success, Z_STREAM_ERROR on parameter error, Z_DATA_ERROR if stream was freed prematurely
 */
export function deflateEnd(strm: ZStream): number;

/**
 * Initialize compression dictionary
 * 
 * @param strm - Compression stream
 * @param dictionary - Dictionary data
 * @returns Z_OK on success, error code otherwise
 */
export function deflateSetDictionary(strm: ZStream, dictionary: Uint8Array): number;

/**
 * Library version information
 */
export const deflateInfo: string;