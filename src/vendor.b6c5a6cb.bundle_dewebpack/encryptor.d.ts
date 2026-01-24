/**
 * CryptoJS Cipher Module
 * Provides encryption and decryption capabilities with block and stream ciphers
 */

/**
 * Configuration object for cipher operations
 */
export interface CipherConfig {
  /** Cipher mode (e.g., CBC, ECB) */
  mode?: BlockCipherMode;
  /** Padding scheme (e.g., Pkcs7) */
  padding?: Padding;
  /** Initialization vector */
  iv?: WordArray;
  /** Key derivation function */
  kdf?: KDF;
  /** Formatter for serialization */
  format?: Formatter;
}

/**
 * Word array representing cryptographic data
 */
export interface WordArray {
  /** Array of 32-bit words */
  words: number[];
  /** Number of significant bytes */
  sigBytes: number;
  /** Concatenate another word array */
  concat(wordArray: WordArray): WordArray;
  /** Convert to string using encoder */
  toString(encoder?: Encoder): string;
  /** Create a slice of the word array */
  slice(start: number, end: number): WordArray;
}

/**
 * Base encoder/decoder interface
 */
export interface Encoder {
  /** Parse string to WordArray */
  parse(str: string): WordArray;
  /** Stringify WordArray to string */
  stringify(wordArray: WordArray): string;
}

/**
 * Cipher parameters containing encryption metadata
 */
export interface CipherParams {
  /** Encrypted data */
  ciphertext: WordArray;
  /** Encryption key */
  key?: WordArray;
  /** Initialization vector */
  iv?: WordArray;
  /** Salt used in key derivation */
  salt?: WordArray;
  /** Algorithm used */
  algorithm?: Cipher;
  /** Cipher mode */
  mode?: BlockCipherMode;
  /** Padding scheme */
  padding?: Padding;
  /** Block size in words */
  blockSize?: number;
  /** Formatter for serialization */
  formatter?: Formatter;
  /** Mix in properties from object */
  mixIn(params: Partial<CipherParams>): void;
  /** Convert to string representation */
  toString(formatter?: Formatter): string;
}

/**
 * Base cipher interface
 */
export interface Cipher {
  /** Configuration object */
  cfg: CipherConfig;
  /** Block size in 32-bit words (default: 4 = 128 bits) */
  blockSize: number;
  /** Key size in 32-bit words (default: 4 = 128 bits) */
  keySize: number;
  /** IV size in 32-bit words (default: 4 = 128 bits) */
  ivSize: number;

  /**
   * Create an encryptor instance
   * @param key - Encryption key
   * @param config - Cipher configuration
   */
  createEncryptor(key: WordArray, config?: CipherConfig): Cipher;

  /**
   * Create a decryptor instance
   * @param key - Decryption key
   * @param config - Cipher configuration
   */
  createDecryptor(key: WordArray, config?: CipherConfig): Cipher;

  /**
   * Initialize cipher with transform mode, key and config
   * @param xformMode - 1 for encryption, 2 for decryption
   * @param key - Cryptographic key
   * @param config - Configuration options
   */
  init(xformMode: number, key: WordArray, config?: CipherConfig): void;

  /** Reset cipher to initial state */
  reset(): void;

  /**
   * Process input data
   * @param data - Data to process
   */
  process(data: WordArray | string): WordArray;

  /**
   * Finalize encryption/decryption
   * @param data - Final data chunk
   */
  finalize(data?: WordArray | string): WordArray;
}

/**
 * Stream cipher implementation (processes data in single-word blocks)
 */
export interface StreamCipher extends Cipher {
  /** Block size is 1 word for stream ciphers */
  blockSize: 1;
}

/**
 * Block cipher implementation
 */
export interface BlockCipher extends Cipher {
  /** Block size in 32-bit words (typically 4 = 128 bits) */
  blockSize: 4;
  /**
   * Encrypt a single block
   * @param words - Word array
   * @param offset - Block offset
   */
  encryptBlock(words: number[], offset: number): void;
  /**
   * Decrypt a single block
   * @param words - Word array
   * @param offset - Block offset
   */
  decryptBlock(words: number[], offset: number): void;
}

/**
 * Block cipher mode interface
 */
export interface BlockCipherMode {
  /** Encryptor implementation */
  Encryptor: BlockCipherModeImpl;
  /** Decryptor implementation */
  Decryptor: BlockCipherModeImpl;
  /**
   * Create encryptor instance
   * @param cipher - Block cipher
   * @param iv - Initialization vector words
   */
  createEncryptor(cipher: BlockCipher, iv?: number[]): BlockCipherModeImpl;
  /**
   * Create decryptor instance
   * @param cipher - Block cipher
   * @param iv - Initialization vector words
   */
  createDecryptor(cipher: BlockCipher, iv?: number[]): BlockCipherModeImpl;
}

/**
 * Block cipher mode implementation
 */
export interface BlockCipherModeImpl {
  /**
   * Initialize mode
   * @param cipher - Block cipher instance
   * @param iv - Initialization vector words
   */
  init(cipher: BlockCipher, iv?: number[]): void;
  /**
   * Process a block
   * @param words - Word array
   * @param offset - Block offset
   */
  processBlock(words: number[], offset: number): void;
}

/**
 * CBC (Cipher Block Chaining) mode
 */
export interface CBCMode extends BlockCipherMode {}

/**
 * Padding scheme interface
 */
export interface Padding {
  /**
   * Pad data to block size
   * @param data - Data to pad
   * @param blockSize - Block size in 32-bit words
   */
  pad(data: WordArray, blockSize: number): void;
  /**
   * Remove padding from data
   * @param data - Padded data
   */
  unpad(data: WordArray): void;
}

/**
 * PKCS#7 padding scheme
 */
export interface Pkcs7Padding extends Padding {}

/**
 * Formatter for serializing cipher parameters
 */
export interface Formatter {
  /**
   * Stringify cipher parameters
   * @param cipherParams - Cipher parameters to serialize
   */
  stringify(cipherParams: CipherParams): string;
  /**
   * Parse string to cipher parameters
   * @param str - String to parse
   */
  parse(str: string): CipherParams;
}

/**
 * OpenSSL-compatible formatter
 */
export interface OpenSSLFormatter extends Formatter {}

/**
 * Serializable cipher for easy encryption/decryption
 */
export interface SerializableCipher {
  /** Configuration */
  cfg: { format: Formatter };
  /**
   * Encrypt data
   * @param cipher - Cipher algorithm
   * @param message - Message to encrypt
   * @param key - Encryption key
   * @param config - Configuration options
   */
  encrypt(
    cipher: Cipher,
    message: WordArray | string,
    key: WordArray,
    config?: CipherConfig
  ): CipherParams;
  /**
   * Decrypt data
   * @param cipher - Cipher algorithm
   * @param ciphertext - Encrypted data or serialized cipher params
   * @param key - Decryption key
   * @param config - Configuration options
   */
  decrypt(
    cipher: Cipher,
    ciphertext: CipherParams | string,
    key: WordArray,
    config?: CipherConfig
  ): WordArray;
}

/**
 * Key Derivation Function interface
 */
export interface KDF {
  /**
   * Execute key derivation
   * @param password - Password string or word array
   * @param keySize - Key size in 32-bit words
   * @param ivSize - IV size in 32-bit words
   * @param salt - Salt (optional, random if not provided)
   */
  execute(
    password: string | WordArray,
    keySize: number,
    ivSize: number,
    salt?: WordArray
  ): CipherParams;
}

/**
 * OpenSSL-compatible KDF using EvpKDF
 */
export interface OpenSSLKDF extends KDF {}

/**
 * Password-based cipher for easy password encryption
 */
export interface PasswordBasedCipher extends SerializableCipher {
  /** Configuration with KDF */
  cfg: { format: Formatter; kdf: KDF };
  /**
   * Encrypt with password
   * @param cipher - Cipher algorithm
   * @param message - Message to encrypt
   * @param password - Password string
   * @param config - Configuration options
   */
  encrypt(
    cipher: Cipher,
    message: WordArray | string,
    password: string,
    config?: CipherConfig
  ): CipherParams;
  /**
   * Decrypt with password
   * @param cipher - Cipher algorithm
   * @param ciphertext - Encrypted data or serialized params
   * @param password - Password string
   * @param config - Configuration options
   */
  decrypt(
    cipher: Cipher,
    ciphertext: CipherParams | string,
    password: string,
    config?: CipherConfig
  ): WordArray;
}

/**
 * CryptoJS library namespace
 */
export interface CryptoJS {
  lib: {
    Cipher: Cipher;
    StreamCipher: StreamCipher;
    BlockCipher: BlockCipher;
    CipherParams: CipherParams;
    WordArray: WordArray;
  };
  mode: {
    /** Cipher Block Chaining mode */
    CBC: CBCMode;
  };
  pad: {
    /** PKCS#7 padding */
    Pkcs7: Pkcs7Padding;
  };
  format: {
    /** OpenSSL format */
    OpenSSL: OpenSSLFormatter;
  };
  kdf: {
    /** OpenSSL KDF */
    OpenSSL: OpenSSLKDF;
  };
  /** Serializable cipher */
  SerializableCipher: SerializableCipher;
  /** Password-based cipher */
  PasswordBasedCipher: PasswordBasedCipher;
}

/**
 * Main module export - Encryptor class
 */
export class Encryptor implements Cipher {
  cfg: CipherConfig;
  blockSize: number;
  keySize: number;
  ivSize: number;
  createEncryptor(key: WordArray, config?: CipherConfig): Cipher;
  createDecryptor(key: WordArray, config?: CipherConfig): Cipher;
  init(xformMode: number, key: WordArray, config?: CipherConfig): void;
  reset(): void;
  process(data: WordArray | string): WordArray;
  finalize(data?: WordArray | string): WordArray;
}

/**
 * Main module export - Decryptor class
 */
export class Decryptor implements Cipher {
  cfg: CipherConfig;
  blockSize: number;
  keySize: number;
  ivSize: number;
  createEncryptor(key: WordArray, config?: CipherConfig): Cipher;
  createDecryptor(key: WordArray, config?: CipherConfig): Cipher;
  init(xformMode: number, key: WordArray, config?: CipherConfig): void;
  reset(): void;
  process(data: WordArray | string): WordArray;
  finalize(data?: WordArray | string): WordArray;
}