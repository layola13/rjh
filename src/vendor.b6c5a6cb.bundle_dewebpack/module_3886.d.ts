/**
 * ISO/IEC 9797-1 Padding Method 2 implementation for CryptoJS
 * 
 * This padding scheme appends a single '1' bit (0x80 byte) followed by zero bits
 * to fill the block. It's commonly used in MAC (Message Authentication Code) algorithms.
 * 
 * @module Iso97971Padding
 */

import type { WordArray } from 'crypto-js';

/**
 * Padding configuration for ISO/IEC 9797-1 Method 2
 */
export interface Iso97971Padding {
  /**
   * Pads the data array to a multiple of block size using ISO 9797-1 padding.
   * Appends 0x80 (10000000 in binary) followed by zero padding.
   * 
   * @param data - The word array to pad
   * @param blockSize - The block size in words (32-bit units)
   */
  pad(data: WordArray, blockSize: number): void;

  /**
   * Removes ISO 9797-1 padding from the data array.
   * Strips zero padding and the trailing 0x80 byte.
   * 
   * @param data - The padded word array to unpad
   */
  unpad(data: WordArray): void;
}

/**
 * ISO/IEC 9797-1 Padding Method 2 algorithm
 */
export const Iso97971: Iso97971Padding;