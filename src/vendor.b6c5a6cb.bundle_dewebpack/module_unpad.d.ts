/**
 * Unpadding function for cryptographic operations.
 * Removes padding bytes from the end of a padded data structure.
 * 
 * This function implements a standard unpadding scheme where the last byte
 * indicates the number of padding bytes to remove. Commonly used in block
 * cipher padding schemes like PKCS#7.
 * 
 * @remarks
 * The padding value is extracted from the last byte of the data, and the
 * significant byte count is reduced by that amount to reveal the original data.
 */

/**
 * Represents a word array structure used in cryptographic operations.
 * Contains both the data words and the count of significant bytes.
 */
interface WordArray {
  /**
   * Array of 32-bit words containing the actual data.
   * Each word holds 4 bytes in big-endian format.
   */
  words: number[];
  
  /**
   * Number of significant bytes in the word array.
   * This value may be less than words.length * 4 if the last word is partially filled.
   */
  sigBytes: number;
}

/**
 * Removes padding from a padded word array.
 * 
 * @param data - The padded word array to unpad
 * 
 * @example
 *