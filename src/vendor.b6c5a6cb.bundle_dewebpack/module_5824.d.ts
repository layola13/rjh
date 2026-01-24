/**
 * CryptoJS DES and Triple DES (3DES) encryption algorithms
 * Provides block cipher implementations for DES and TripleDES
 */

/**
 * Word array type representing binary data as an array of 32-bit words
 */
export interface WordArray {
  words: number[];
  sigBytes: number;
  concat(wordArray: WordArray): this;
  clamp(): void;
  clone(): WordArray;
  toString(encoder?: any): string;
}

/**
 * Base interface for block cipher algorithms
 */
export interface BlockCipher {
  /**
   * Encrypts a single block of data
   * @param dataWords - The data words to encrypt
   * @param offset - The offset into the data words array
   */
  encryptBlock(dataWords: number[], offset: number): void;

  /**
   * Decrypts a single block of data
   * @param dataWords - The data words to decrypt
   * @param offset - The offset into the data words array
   */
  decryptBlock(dataWords: number[], offset: number): void;

  /**
   * Key size in words (32-bit units)
   */
  keySize: number;

  /**
   * Initialization vector size in words (32-bit units)
   */
  ivSize: number;

  /**
   * Block size in words (32-bit units)
   */
  blockSize: number;

  /**
   * Creates a cipher helper for simplified encryption/decryption
   */
  _createHelper(cipher: any): CipherHelper;
}

/**
 * Cipher helper interface providing high-level encryption/decryption methods
 */
export interface CipherHelper {
  encrypt(message: WordArray | string, key: WordArray | string, cfg?: any): CipherParams;
  decrypt(ciphertext: CipherParams | string, key: WordArray | string, cfg?: any): WordArray;
}

/**
 * Cipher parameters containing encrypted data and metadata
 */
export interface CipherParams {
  ciphertext: WordArray;
  key?: WordArray;
  iv?: WordArray;
  salt?: WordArray;
  algorithm?: any;
  mode?: any;
  padding?: any;
  blockSize?: number;
  formatter?: any;
  toString(formatter?: any): string;
}

/**
 * DES (Data Encryption Standard) cipher implementation
 * A symmetric-key block cipher with 64-bit blocks and 56-bit effective key size
 */
export interface DESCipher extends BlockCipher {
  /**
   * The encryption key
   */
  _key: WordArray;

  /**
   * Pre-computed subkeys for encryption rounds
   */
  _subKeys: number[][];

  /**
   * Pre-computed subkeys for decryption (inverse order)
   */
  _invSubKeys: number[][];

  /**
   * Left block working variable
   */
  _lBlock: number;

  /**
   * Right block working variable
   */
  _rBlock: number;

  /**
   * Initializes the cipher with the provided key
   * Generates 16 subkeys for encryption rounds using the DES key schedule
   */
  _doReset(): void;

  /**
   * Internal method performing the core DES cryptographic transformation
   * @param dataWords - The data words to process
   * @param offset - The offset into the data words array
   * @param subKeys - The subkeys to use (encryption or decryption)
   */
  _doCryptBlock(dataWords: number[], offset: number, subKeys: number[][]): void;

  /**
   * Key size: 2 words (64 bits, 56 effective bits)
   */
  keySize: 2;

  /**
   * IV size: 2 words (64 bits)
   */
  ivSize: 2;

  /**
   * Block size: 2 words (64 bits)
   */
  blockSize: 2;

  /**
   * Creates an encryptor instance
   * @param key - The encryption key
   * @param cfg - Optional configuration
   */
  createEncryptor(key: WordArray, cfg?: any): DESCipher;

  /**
   * Creates a decryptor instance
   * @param key - The decryption key
   * @param cfg - Optional configuration
   */
  createDecryptor(key: WordArray, cfg?: any): DESCipher;
}

/**
 * Triple DES (3DES) cipher implementation
 * Applies DES three times with different keys for enhanced security
 * Uses encrypt-decrypt-encrypt (EDE) mode
 */
export interface TripleDESCipher extends BlockCipher {
  /**
   * The encryption key (192 bits / 6 words)
   */
  _key: WordArray;

  /**
   * First DES cipher instance (encryption)
   */
  _des1: DESCipher;

  /**
   * Second DES cipher instance (decryption)
   */
  _des2: DESCipher;

  /**
   * Third DES cipher instance (encryption)
   */
  _des3: DESCipher;

  /**
   * Initializes the cipher by creating three DES instances with key segments
   * Key is split into three 64-bit (2-word) segments
   */
  _doReset(): void;

  /**
   * Key size: 6 words (192 bits)
   */
  keySize: 6;

  /**
   * IV size: 2 words (64 bits)
   */
  ivSize: 2;

  /**
   * Block size: 2 words (64 bits)
   */
  blockSize: 2;
}

/**
 * CryptoJS algorithm module interface
 */
export interface CryptoAlgo {
  /**
   * DES cipher constructor
   */
  DES: DESCipher;

  /**
   * Triple DES cipher constructor
   */
  TripleDES: TripleDESCipher;
}

/**
 * Main CryptoJS DES module export
 */
export interface CryptoJSDES {
  /**
   * Direct access to DES cipher helper
   */
  DES: CipherHelper;

  /**
   * Direct access to Triple DES cipher helper
   */
  TripleDES: CipherHelper;

  /**
   * Library components
   */
  lib: {
    WordArray: typeof WordArray;
    BlockCipher: typeof BlockCipher;
  };

  /**
   * Algorithm implementations
   */
  algo: CryptoAlgo;
}

/**
 * DES cipher helper for simplified encryption and decryption operations
 */
export const DES: CipherHelper;

/**
 * Triple DES cipher helper for simplified encryption and decryption operations
 */
export const TripleDES: CipherHelper;

export default CryptoJSDES;