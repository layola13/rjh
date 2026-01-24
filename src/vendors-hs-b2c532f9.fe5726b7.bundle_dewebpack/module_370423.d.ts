/**
 * DEFLATE inflation table builder
 * 
 * Constructs Huffman decoding tables used in DEFLATE decompression.
 * Based on the inflate_table function from zlib/pako.
 * 
 * @module InflateTable
 */

/**
 * Maximum number of bits for code length
 */
const MAX_BITS = 15;

/**
 * Base values for length codes 257..285
 * These are the base lengths that get added to extra bits.
 */
const LENGTH_BASE: Readonly<Uint16Array> = new Uint16Array([
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
]);

/**
 * Extra bits for length codes 257..285
 * Number of additional bits to read after the base value.
 */
const LENGTH_EXTRA_BITS: Readonly<Uint8Array> = new Uint8Array([
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
]);

/**
 * Base values for distance codes 0..29
 * These are the base distances that get added to extra bits.
 */
const DISTANCE_BASE: Readonly<Uint16Array> = new Uint16Array([
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0
]);

/**
 * Extra bits for distance codes 0..29
 * Number of additional bits to read after the base value.
 */
const DISTANCE_EXTRA_BITS: Readonly<Uint8Array> = new Uint8Array([
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64
]);

/**
 * Table type enumeration
 */
enum TableType {
  /** Code length codes (CODES) */
  CODES = 0,
  /** Literal/length codes (LENS) */
  LENS = 1,
  /** Distance codes (DISTS) */
  DISTS = 2
}

/**
 * State object for tracking decode table construction
 */
interface InflateState {
  /** Current number of bits used for decoding */
  bits: number;
}

/**
 * Build a set of tables to decode the provided canonical Huffman code.
 * 
 * @param tableType - Type of code: 0=codes, 1=lens, 2=dists
 * @param codeLengths - Array of code lengths for each symbol
 * @param codeLengthsOffset - Offset into codeLengths array
 * @param numCodes - Number of codes (symbols) in the code
 * @param table - Output table for decoded values (32-bit entries)
 * @param tableOffset - Starting offset in table array
 * @param work - Working area for symbol sorting
 * @param state - Inflate state object containing bits configuration
 * @returns 0 on success, 1 on invalid input (over-subscribed or incomplete set), -1 on error
 */
type InflateTable = (
  tableType: TableType,
  codeLengths: Uint16Array,
  codeLengthsOffset: number,
  numCodes: number,
  table: Uint32Array,
  tableOffset: number,
  work: Uint16Array,
  state: InflateState
) => number;

declare const inflateTable: InflateTable;

export = inflateTable;