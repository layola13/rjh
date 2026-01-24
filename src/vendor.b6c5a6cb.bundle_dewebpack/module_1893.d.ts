/**
 * CFB (Cipher Feedback) block cipher mode of operation.
 * This module implements CFB mode for CryptoJS encryption library.
 * 
 * CFB mode turns a block cipher into a stream cipher, where each plaintext
 * block is XORed with the encrypted previous ciphertext block (or IV for the first block).
 * 
 * @module CFB
 */

import type { BlockCipher, BlockCipherMode, WordArray } from 'crypto-js';

/**
 * Configuration interface for CFB mode cipher operations.
 */
interface CFBModeConfig {
  /** The initialization vector used for the first block */
  _iv?: WordArray;
  /** The previous ciphertext block used for XOR operations */
  _prevBlock?: WordArray;
  /** The underlying block cipher instance */
  _cipher: BlockCipher;
}

/**
 * Base interface for CFB mode, extending BlockCipherMode.
 */
interface CFBMode extends BlockCipherMode {
  /** CFB Encryptor implementation */
  Encryptor: CFBEncryptorConstructor;
  /** CFB Decryptor implementation */
  Decryptor: CFBDecryptorConstructor;
}

/**
 * Constructor type for CFB Encryptor.
 */
interface CFBEncryptorConstructor {
  new(): CFBEncryptor;
}

/**
 * Constructor type for CFB Decryptor.
 */
interface CFBDecryptorConstructor {
  new(): CFBDecryptor;
}

/**
 * CFB mode encryptor.
 * Encrypts data by XORing plaintext with encrypted IV/previous ciphertext block.
 */
interface CFBEncryptor extends CFBModeConfig {
  /**
   * Processes a block of data for encryption.
   * 
   * @param words - The data words array to encrypt
   * @param offset - The offset into the words array where the block starts
   */
  processBlock(words: number[], offset: number): void;
}

/**
 * CFB mode decryptor.
 * Decrypts data by XORing ciphertext with encrypted IV/previous ciphertext block.
 */
interface CFBDecryptor extends CFBModeConfig {
  /**
   * Processes a block of data for decryption.
   * 
   * @param words - The data words array to decrypt
   * @param offset - The offset into the words array where the block starts
   */
  processBlock(words: number[], offset: number): void;
}

/**
 * CryptoJS library namespace.
 */
declare namespace CryptoJS {
  namespace mode {
    /**
     * CFB (Cipher Feedback) mode implementation.
     * 
     * @example
     *