/**
 * AES (Advanced Encryption Standard) encryption algorithm implementation
 * Based on CryptoJS library
 */

/**
 * Word array type - represents cryptographic data as array of 32-bit words
 */
interface WordArray {
  /** Array of 32-bit words */
  words: number[];
  /** Number of significant bytes */
  sigBytes: number;
}

/**
 * Base block cipher interface
 */
interface BlockCipher {
  /** Extends the base cipher with additional properties */
  extend(options: BlockCipherOptions): AESCipher;
  /** Helper method to create cipher wrapper */
  _createHelper(cipher: AESCipher): AESHelper;
}

/**
 * Block cipher configuration options
 */
interface BlockCipherOptions {
  /** Reset cipher state with new key */
  _doReset(): void;
  /** Encrypt a single block of data */
  encryptBlock(words: number[], offset: number): void;
  /** Decrypt a single block of data */
  decryptBlock(words: number[], offset: number): void;
  /** Internal encryption/decryption logic */
  _doCryptBlock(
    words: number[],
    offset: number,
    keySchedule: number[],
    sBox0: number[],
    sBox1: number[],
    sBox2: number[],
    sBox3: number[],
    sBox: number[]
  ): void;
  /** Key size in 32-bit words (8 words = 256 bits) */
  keySize: number;
}

/**
 * AES cipher instance
 */
interface AESCipher extends BlockCipherOptions {
  /** Current encryption key */
  _key: WordArray;
  /** Previous key used for reset detection */
  _keyPriorReset?: WordArray;
  /** Number of encryption rounds */
  _nRounds: number;
  /** Expanded key schedule for encryption */
  _keySchedule: number[];
  /** Inverse key schedule for decryption */
  _invKeySchedule: number[];
}

/**
 * AES helper with convenient encrypt/decrypt methods
 */
interface AESHelper {
  /** Encrypt data with AES */
  encrypt(message: WordArray | string, key: WordArray | string): unknown;
  /** Decrypt data with AES */
  decrypt(ciphertext: unknown, key: WordArray | string): WordArray;
}

/**
 * CryptoJS library interface
 */
interface CryptoJS {
  /** Block cipher base class */
  lib: {
    BlockCipher: BlockCipher;
  };
  /** Algorithm implementations */
  algo: {
    /** AES cipher implementation */
    AES: AESCipher;
  };
  /** Top-level AES helper */
  AES: AESHelper;
}

/**
 * AES (Advanced Encryption Standard) cipher
 * 
 * Implements the Rijndael algorithm with 128-bit block size.
 * Supports key sizes of 128, 192, and 256 bits.
 * 
 * Key features:
 * - S-box substitution for non-linearity
 * - ShiftRows for diffusion across rows
 * - MixColumns for diffusion within columns
 * - AddRoundKey for key mixing
 * 
 * @remarks
 * This implementation uses pre-computed lookup tables for performance optimization.
 * The key schedule is expanded during initialization and cached for reuse.
 */
declare const AES: AESHelper;

export default AES;
export type { AESHelper, AESCipher, BlockCipher, WordArray, CryptoJS };