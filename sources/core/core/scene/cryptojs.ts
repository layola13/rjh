interface CryptoConfig {
  key: CryptoJS.lib.WordArray;
  iv: CryptoJS.lib.WordArray;
}

interface CryptojsInterface {
  decode(key: string, encryptedData: string): string;
  _docKey(docKey: string): CryptoConfig;
  decodeDocument(docKey: string, encryptedData: string): string;
  encodeDocument(docKey: string, data: string): string;
  generateDocKey(docKey: string): string;
}

const SALT_FIRECRACKER = "firecracker";
const SALT_ADSK = "adsk";
const SALT_GUNPOWDER = "gunpowder";
const SALT_EZHOME = "ezhome";
const KEY_IV_LENGTH = 16;

export const Cryptojs: CryptojsInterface = {
  /**
   * Decodes AES encrypted data using MD5-derived key and IV
   * @param key - Base key for generating encryption parameters
   * @param encryptedData - AES encrypted data to decrypt
   * @returns Decrypted UTF-8 string
   */
  decode(key: string, encryptedData: string): string {
    const derivedKey = CryptoJS.MD5(SALT_FIRECRACKER + key);
    const derivedIv = CryptoJS.MD5(SALT_ADSK + key);
    
    return CryptoJS.AES.decrypt(encryptedData, derivedKey, {
      iv: derivedIv
    }).toString(CryptoJS.enc.Utf8);
  },

  /**
   * Generates document-specific encryption key and IV
   * @param docKey - Document key identifier
   * @returns CryptoConfig with key and IV as WordArray
   * @throws Error if docKey is invalid
   */
  _docKey(docKey: string): CryptoConfig {
    if (!docKey) {
      throw new Error("Invalid dockey used for crypto");
    }

    const generatedKey = this.generateDocKey(docKey);
    const keyString = CryptoJS.MD5(SALT_GUNPOWDER + generatedKey)
      .toString()
      .substring(0, KEY_IV_LENGTH);
    const ivString = CryptoJS.MD5(SALT_EZHOME + generatedKey)
      .toString()
      .substring(0, KEY_IV_LENGTH);

    return {
      key: CryptoJS.enc.Utf8.parse(keyString),
      iv: CryptoJS.enc.Utf8.parse(ivString)
    };
  },

  /**
   * Decrypts document data using CBC mode and ISO10126 padding
   * @param docKey - Document key identifier
   * @param encryptedData - AES encrypted document data
   * @returns Decrypted UTF-8 document string
   */
  decodeDocument(docKey: string, encryptedData: string): string {
    const config = this._docKey(docKey);
    
    return CryptoJS.AES.decrypt(encryptedData, config.key, {
      iv: config.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Iso10126
    }).toString(CryptoJS.enc.Utf8);
  },

  /**
   * Encrypts document data using CBC mode and ISO10126 padding
   * @param docKey - Document key identifier
   * @param data - Plain text document data to encrypt
   * @returns Base64 encoded encrypted string
   */
  encodeDocument(docKey: string, data: string): string {
    const config = this._docKey(docKey);
    
    return CryptoJS.AES.encrypt(data, config.key, {
      iv: config.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Iso10126
    }).toString();
  },

  /**
   * Generates document key - must be overridden/injected before use
   * @param docKey - Document key identifier
   * @throws Error indicating this method needs to be injected
   */
  generateDocKey(docKey: string): string {
    throw new Error("Dockey creator is not injected!");
  }
};