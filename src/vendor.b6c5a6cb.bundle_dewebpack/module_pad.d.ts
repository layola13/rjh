/**
 * PKCS7 padding strategy for block cipher modes.
 * Pads the data block by appending bytes, where each byte value equals the number of padding bytes.
 * 
 * @example
 * // If block size is 16 bytes and data is 10 bytes, pad with 6 bytes of value 0x06
 * // Data: [0x01, 0x02, ..., 0x0A]
 * // Padded: [0x01, 0x02, ..., 0x0A, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06]
 */

/**
 * Represents a word array used in cryptographic operations.
 */
interface WordArray {
  /** The array of 32-bit words */
  words: number[];
  /** The number of significant bytes */
  sigBytes: number;
  /** Concatenates another word array to this one */
  concat(wordArray: WordArray): this;
}

/**
 * Factory for creating WordArray instances.
 */
interface WordArrayStatic {
  /**
   * Creates a new word array.
   * @param words - Array of 32-bit words
   * @param sigBytes - The number of significant bytes
   * @returns A new WordArray instance
   */
  create(words: number[], sigBytes: number): WordArray;
}

/**
 * Applies PKCS7 padding to a data block.
 * 
 * @param data - The word array to pad
 * @param blockSizeInWords - The block size in 32-bit words (typically 4 for 128-bit blocks)
 * 
 * @remarks
 * This padding scheme adds N bytes of value N to fill the block.
 * The padding length is calculated as: blockSize - (dataSize % blockSize)
 */
declare function pad(data: WordArray, blockSizeInWords: number): void;

export { pad, WordArray, WordArrayStatic };