/**
 * Zero Padding strategy for cryptographic operations.
 * Pads data blocks by appending zero bytes to reach the required block size.
 * Used in block cipher modes where padding is necessary.
 */

/**
 * Represents a word array structure used in cryptographic operations.
 */
interface WordArray {
  /**
   * Array of 32-bit words containing the data.
   */
  words: number[];

  /**
   * The number of significant bytes in the word array.
   */
  sigBytes: number;

  /**
   * Clamps the word array to remove excess data beyond sigBytes.
   */
  clamp(): void;
}

/**
 * Padding strategy interface.
 */
interface PaddingStrategy {
  /**
   * Pads the word array to a multiple of the block size.
   * @param data - The word array to pad
   * @param blockSize - The block size in words (32-bit units)
   */
  pad(data: WordArray, blockSize: number): void;

  /**
   * Removes padding from the word array.
   * @param data - The padded word array
   */
  unpad(data: WordArray): void;
}

/**
 * Crypto library interface with padding strategies.
 */
interface CryptoLib {
  pad: {
    ZeroPadding: PaddingStrategy;
  };
}

/**
 * Zero Padding implementation.
 * Pads data with zero bytes to align to block boundaries.
 */
export declare const ZeroPadding: PaddingStrategy;

/**
 * Extends the crypto library with ZeroPadding strategy.
 * @param crypto - The crypto library instance to extend
 * @returns The ZeroPadding strategy
 */
export default function(crypto: CryptoLib): PaddingStrategy;