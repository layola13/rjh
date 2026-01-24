/**
 * CRC-32 (Cyclic Redundancy Check) calculation module
 * 
 * This module provides a function to compute the CRC-32 checksum of a byte array,
 * commonly used for data integrity verification in compression algorithms and file formats.
 */

/**
 * Pre-computed CRC-32 lookup table for polynomial 0xEDB88320
 * This table is generated once and reused for all CRC calculations
 */
declare const CRC32_TABLE: Uint32Array;

/**
 * Calculate CRC-32 checksum for a byte array
 * 
 * @param initialCrc - Initial CRC value (typically 0 for new calculations, or previous CRC for incremental updates)
 * @param buffer - The byte array to calculate CRC for
 * @param length - Number of bytes to process from the buffer
 * @param offset - Starting position in the buffer (0-based index)
 * @returns The computed CRC-32 checksum as a 32-bit unsigned integer
 * 
 * @example
 *