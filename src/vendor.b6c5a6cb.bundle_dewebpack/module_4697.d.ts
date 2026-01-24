/**
 * CryptoJS Module Aggregator
 * 
 * This module serves as the main entry point for the CryptoJS library,
 * importing and re-exporting all cryptographic algorithms, modes, and utilities.
 * 
 * @module crypto-js
 */

// Core
import * as CryptoCore from './core';
import * as X64Core from './x64-core';
import * as LibTypedarrays from './lib-typedarrays';

// Hashing Algorithms
import * as MD5 from './md5';
import * as SHA1 from './sha1';
import * as SHA256 from './sha256';
import * as SHA224 from './sha224';
import * as SHA512 from './sha512';
import * as SHA384 from './sha384';
import * as SHA3 from './sha3';
import * as RIPEMD160 from './ripemd160';

// HMAC
import * as HmacMD5 from './hmac-md5';
import * as HmacSHA1 from './hmac-sha1';
import * as HmacSHA256 from './hmac-sha256';
import * as HmacSHA224 from './hmac-sha224';
import * as HmacSHA512 from './hmac-sha512';
import * as HmacSHA384 from './hmac-sha384';
import * as HmacSHA3 from './hmac-sha3';
import * as HmacRIPEMD160 from './hmac-ripemd160';

// Password-Based Key Derivation
import * as PBKDF2 from './pbkdf2';

// Ciphers
import * as AES from './aes';
import * as TripleDES from './tripledes';
import * as RC4 from './rc4';
import * as Rabbit from './rabbit';
import * as RabbitLegacy from './rabbit-legacy';

// Cipher Modes
import * as ModeCFB from './mode-cfb';
import * as ModeCTR from './mode-ctr';
import * as ModeCTRGladman from './mode-ctr-gladman';
import * as ModeOFB from './mode-ofb';
import * as ModeECB from './mode-ecb';

// Padding Schemes
import * as PadAnsix923 from './pad-ansix923';
import * as PadISO10126 from './pad-iso10126';
import * as PadISO97971 from './pad-iso97971';
import * as PadZeroPadding from './pad-zeropadding';
import * as PadNoPadding from './pad-nopadding';

// Encodings
import * as EncLatin1 from './enc-latin1';
import * as EncUtf8 from './enc-utf8';
import * as EncHex from './enc-hex';
import * as EncUtf16 from './enc-utf16';
import * as EncBase64 from './enc-base64';
import * as EncBase64url from './enc-base64url';

/**
 * Main CryptoJS namespace containing all cryptographic functions
 */
export interface CryptoJS {
  // Core utilities
  lib: typeof CryptoCore;
  x64: typeof X64Core;
  
  // Hash functions
  MD5: typeof MD5;
  SHA1: typeof SHA1;
  SHA256: typeof SHA256;
  SHA224: typeof SHA224;
  SHA512: typeof SHA512;
  SHA384: typeof SHA384;
  SHA3: typeof SHA3;
  RIPEMD160: typeof RIPEMD160;
  
  // HMAC functions
  HmacMD5: typeof HmacMD5;
  HmacSHA1: typeof HmacSHA1;
  HmacSHA256: typeof HmacSHA256;
  HmacSHA224: typeof HmacSHA224;
  HmacSHA512: typeof HmacSHA512;
  HmacSHA384: typeof HmacSHA384;
  HmacSHA3: typeof HmacSHA3;
  HmacRIPEMD160: typeof HmacRIPEMD160;
  
  // Key derivation
  PBKDF2: typeof PBKDF2;
  
  // Encryption algorithms
  AES: typeof AES;
  TripleDES: typeof TripleDES;
  RC4: typeof RC4;
  Rabbit: typeof Rabbit;
  RabbitLegacy: typeof RabbitLegacy;
  
  // Cipher modes
  mode: {
    CFB: typeof ModeCFB;
    CTR: typeof ModeCTR;
    CTRGladman: typeof ModeCTRGladman;
    OFB: typeof ModeOFB;
    ECB: typeof ModeECB;
  };
  
  // Padding schemes
  pad: {
    Ansix923: typeof PadAnsix923;
    Iso10126: typeof PadISO10126;
    Iso97971: typeof PadISO97971;
    ZeroPadding: typeof PadZeroPadding;
    NoPadding: typeof PadNoPadding;
  };
  
  // Encodings
  enc: {
    Latin1: typeof EncLatin1;
    Utf8: typeof EncUtf8;
    Hex: typeof EncHex;
    Utf16: typeof EncUtf16;
    Base64: typeof EncBase64;
    Base64url: typeof EncBase64url;
  };
}

/**
 * Default export of the complete CryptoJS library
 */
declare const cryptoJS: CryptoJS;

export default cryptoJS;