/**
 * ZStream - Data structure for zlib compression/decompression stream state.
 * This interface represents the core state object used in zlib operations,
 * tracking input/output buffers, processing positions, and stream metadata.
 */
export interface ZStream {
  /**
   * Input buffer containing data to be compressed or decompressed.
   * Typically a Uint8Array or Buffer.
   */
  input: Uint8Array | null;

  /**
   * Current position (index) in the input buffer for the next read operation.
   */
  next_in: number;

  /**
   * Number of bytes available for reading in the input buffer starting from next_in.
   */
  avail_in: number;

  /**
   * Total number of bytes processed from the input stream so far.
   */
  total_in: number;

  /**
   * Output buffer where compressed or decompressed data is written.
   * Typically a Uint8Array or Buffer.
   */
  output: Uint8Array | null;

  /**
   * Current position (index) in the output buffer for the next write operation.
   */
  next_out: number;

  /**
   * Number of bytes available for writing in the output buffer starting from next_out.
   */
  avail_out: number;

  /**
   * Total number of bytes written to the output stream so far.
   */
  total_out: number;

  /**
   * Error or informational message from the last operation.
   * Empty string indicates no error.
   */
  msg: string;

  /**
   * Internal state object for the compression/decompression algorithm.
   * Structure varies depending on the specific algorithm implementation.
   */
  state: unknown;

  /**
   * Data type hint for the compressor.
   * Common values:
   * - 0: Binary data
   * - 1: Text data
   * - 2: Unknown (default)
   */
  data_type: number;

  /**
   * Adler-32 checksum of the uncompressed data.
   * Used for data integrity verification.
   */
  adler: number;
}

/**
 * Constructor function that creates a new ZStream instance.
 * Initializes all stream properties to their default values.
 * 
 * @returns A new ZStream object with initialized properties
 * 
 * @example
 *