/**
 * UUID v1 Generation Module
 * 
 * Generates RFC4122 version 1 UUIDs (time-based) using MAC address and timestamp.
 * Version 1 UUIDs are constructed from a timestamp, clock sequence, and node ID (MAC address).
 */

/**
 * Options for UUID v1 generation
 */
export interface UuidV1Options {
  /**
   * Node ID as a 6-byte array. If not provided, a random node ID will be generated.
   * The multicast bit (least significant bit of first octet) is set to 1 for random node IDs.
   */
  node?: number[];

  /**
   * Clock sequence (0-0x3fff). A 14-bit value to help avoid duplicates when
   * the system clock is set backwards or the node ID changes.
   */
  clockseq?: number;

  /**
   * Timestamp in milliseconds since Unix epoch. Defaults to current time.
   */
  msecs?: number;

  /**
   * Additional nanoseconds (0-9999) for sub-millisecond precision.
   */
  nsecs?: number;

  /**
   * Random number generator function. Should return an array of 16 random bytes.
   */
  random?: number[];

  /**
   * Alternative to `random`. Custom RNG function.
   */
  rng?: () => number[];

  /**
   * Internal flag for v6 UUID compatibility
   * @internal
   */
  _v6?: boolean;
}

/**
 * Generates a RFC4122 version 1 (time-based) UUID
 * 
 * @param options - Configuration options for UUID generation
 * @param buffer - Optional byte array to write the UUID into (must be at least 16 bytes)
 * @param offset - Starting position in the buffer to write the UUID (default: 0)
 * @returns The generated UUID as a string, or the buffer if provided
 * @throws {Error} When attempting to generate more than 10 million UUIDs per second
 * 
 * @example
 *