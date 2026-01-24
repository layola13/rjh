/**
 * ANSI X9.23 padding strategy for block cipher modes.
 * 
 * ANSI X9.23 pads data by appending zeros followed by a byte indicating
 * the number of padding bytes added (including itself).
 * 
 * Example: If 5 bytes of padding are needed:
 * [...data, 0x00, 0x00, 0x00, 0x00, 0x05]
 */

/**
 * Represents a word array used in cryptographic operations.
 * Words are 32-bit integers, and sigBytes tracks the significant byte count.
 */
export interface WordArray {
  /** Array of 32-bit words representing the data */
  words: number[];
  
  /** Number of significant bytes in the word array */
  sigBytes: number;
  
  /** Clamps the word array to the number of significant bytes */
  clamp(): void;
}

/**
 * Padding strategy interface for block cipher modes.
 */
export interface PaddingStrategy {
  /**
   * Pads the given word array to align with block size.
   * 
   * @param data - The word array to pad
   * @param blockSizeInWords - The block size in 32-bit words (e.g., 4 for AES = 128 bits)
   */
  pad(data: WordArray, blockSizeInWords: number): void;
  
  /**
   * Removes padding from the given word array.
   * 
   * @param data - The padded word array
   */
  unpad(data: WordArray): void;
}

/**
 * CryptoJS namespace containing padding strategies.
 */
export interface CryptoJS {
  pad: {
    /** ANSI X9.23 padding strategy */
    AnsiX923: PaddingStrategy;
    
    /** Alias for AnsiX923 (alternative capitalization) */
    Ansix923: PaddingStrategy;
  };
}

/**
 * ANSI X9.23 padding implementation.
 * 
 * This padding scheme fills with zeros (0x00) and appends the padding length
 * as the final byte.
 */
export const AnsiX923: PaddingStrategy;

/**
 * Alias for AnsiX923 with alternative capitalization.
 */
export const Ansix923: PaddingStrategy;

export default AnsiX923;