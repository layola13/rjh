/**
 * ECB (Electronic Codebook) block cipher mode implementation for CryptoJS.
 * 
 * ECB mode encrypts/decrypts each block independently without chaining.
 * Note: ECB mode is generally not recommended for production use due to security concerns,
 * as identical plaintext blocks produce identical ciphertext blocks.
 * 
 * @module mode-ecb
 */

import { lib, mode } from 'crypto-js';

/**
 * ECB block cipher mode interface
 */
export interface ECBMode extends lib.BlockCipherMode {
  /**
   * ECB Encryptor - encrypts blocks independently
   */
  Encryptor: ECBEncryptor;
  
  /**
   * ECB Decryptor - decrypts blocks independently
   */
  Decryptor: ECBDecryptor;
}

/**
 * ECB Encryptor implementation
 */
export interface ECBEncryptor extends lib.BlockCipherMode {
  /**
   * The underlying cipher instance used for encryption
   */
  _cipher: lib.BlockCipher;
  
  /**
   * Process a single block of data by encrypting it.
   * 
   * @param words - The data words array to process
   * @param offset - The offset into the words array where the block starts
   */
  processBlock(words: number[], offset: number): void;
}

/**
 * ECB Decryptor implementation
 */
export interface ECBDecryptor extends lib.BlockCipherMode {
  /**
   * The underlying cipher instance used for decryption
   */
  _cipher: lib.BlockCipher;
  
  /**
   * Process a single block of data by decrypting it.
   * 
   * @param words - The data words array to process
   * @param offset - The offset into the words array where the block starts
   */
  processBlock(words: number[], offset: number): void;
}

/**
 * ECB mode namespace
 */
declare module 'crypto-js' {
  namespace mode {
    /**
     * Electronic Codebook (ECB) block cipher mode.
     * Each block is encrypted/decrypted independently.
     */
    const ECB: ECBMode;
  }
}

export default mode.ECB;