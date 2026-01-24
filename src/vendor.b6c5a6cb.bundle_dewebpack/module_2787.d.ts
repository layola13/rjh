/**
 * CryptoJS Hex Format Module
 * Provides hex string encoding/decoding for cipher parameters
 */

/**
 * Cipher parameters interface containing encryption results
 */
interface CipherParams {
  /** The encrypted ciphertext as a WordArray */
  ciphertext: WordArray;
  /** Optional key used for encryption */
  key?: WordArray;
  /** Optional initialization vector */
  iv?: WordArray;
  /** Optional salt value */
  salt?: WordArray;
  /** Optional algorithm name */
  algorithm?: string;
  /** Optional block size */
  blockSize?: number;
  /** Optional formatter */
  formatter?: Formatter;
}

/**
 * Word array interface representing binary data
 */
interface WordArray {
  /** Array of 32-bit words */
  words: number[];
  /** Number of significant bytes */
  sigBytes: number;
  /**
   * Converts the word array to a string using the specified encoder
   * @param encoder - The encoder to use for conversion
   * @returns The encoded string
   */
  toString(encoder: Encoder): string;
}

/**
 * Encoder interface for converting between WordArray and string representations
 */
interface Encoder {
  /**
   * Parses a string into a WordArray
   * @param str - The string to parse
   * @returns The parsed WordArray
   */
  parse(str: string): WordArray;
  /**
   * Converts a WordArray to a string
   * @param wordArray - The WordArray to stringify
   * @returns The string representation
   */
  stringify(wordArray: WordArray): string;
}

/**
 * Formatter interface for serializing/deserializing cipher parameters
 */
interface Formatter {
  /**
   * Converts cipher parameters to a string
   * @param cipherParams - The cipher parameters to stringify
   * @returns The string representation
   */
  stringify(cipherParams: CipherParams): string;
  /**
   * Parses a string into cipher parameters
   * @param str - The string to parse
   * @returns The parsed cipher parameters
   */
  parse(str: string): CipherParams;
}

/**
 * CryptoJS library interface
 */
interface CryptoJSLib {
  /** Library utilities */
  lib: {
    /** CipherParams constructor */
    CipherParams: {
      /**
       * Creates a new CipherParams instance
       * @param params - Initial parameters
       * @returns New CipherParams instance
       */
      create(params: Partial<CipherParams>): CipherParams;
    };
  };
  /** Encoders for various formats */
  enc: {
    /** Hexadecimal encoder */
    Hex: Encoder;
  };
  /** Formatters for cipher output */
  format: {
    /** Hex format formatter */
    Hex?: Formatter;
  };
}

/**
 * Hex Format implementation for CryptoJS
 * Serializes cipher parameters as hexadecimal strings containing only the ciphertext
 */
declare const HexFormat: Formatter;

export default HexFormat;
export { Formatter, CipherParams, WordArray, Encoder, CryptoJSLib };