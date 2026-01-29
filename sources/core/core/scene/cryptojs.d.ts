/**
 * CryptoJS wrapper module for document encryption/decryption
 * Provides AES encryption with MD5-based key derivation
 */

/**
 * Key and IV pair for AES encryption
 */
interface CryptoKeyPair {
  /** AES encryption key */
  key: CryptoJS.lib.WordArray;
  /** Initialization vector for AES */
  iv: CryptoJS.lib.WordArray;
}

/**
 * Cryptography utility for encrypting and decrypting documents
 */
export interface Cryptojs {
  /**
   * Decodes encrypted content using a simple key-based decryption
   * @param key - The decryption key
   * @param encryptedContent - The encrypted content to decode
   * @returns Decrypted plain text string
   */
  decode(key: string, encryptedContent: string): string;

  /**
   * Internal method to generate document-specific encryption key and IV
   * @param docKey - Document key used for key derivation
   * @returns Key-IV pair for AES encryption
   * @throws Error if docKey is invalid or empty
   * @internal
   */
  _docKey(docKey: string): CryptoKeyPair;

  /**
   * Decrypts document content using document-specific key
   * @param docKey - Document key for decryption
   * @param encryptedContent - Encrypted document content
   * @returns Decrypted document content as plain text
   */
  decodeDocument(docKey: string, encryptedContent: string): string;

  /**
   * Encrypts document content using document-specific key
   * @param docKey - Document key for encryption
   * @param plainContent - Plain text content to encrypt
   * @returns Encrypted content as base64 string
   */
  encodeDocument(docKey: string, plainContent: string): string;

  /**
   * Generates a document key from input
   * @param input - Input string to generate key from
   * @returns Generated document key
   * @throws Error if dockey creator is not injected (must be implemented)
   */
  generateDocKey(input: string): string;
}

/**
 * CryptoJS utility instance
 * @remarks Requires CryptoJS library to be available globally
 */
export declare const Cryptojs: Cryptojs;