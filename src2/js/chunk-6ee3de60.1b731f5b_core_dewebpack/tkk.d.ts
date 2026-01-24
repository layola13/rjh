/**
 * Token validation and encryption module
 * Provides token verification, encoding/decoding, and signature generation
 */

/**
 * Decoded token payload structure
 */
interface DecodedToken {
  /** Token signature identifier */
  sig: string;
  /** Start time - when token becomes valid */
  stm: string;
  /** Expiration time - when token expires */
  exp: string;
  /** Lite/mini mode flag */
  lite: boolean;
  /** Error message: token invalid */
  e1: string;
  /** Error message: token not started */
  e2: string;
  /** Error message: token expired */
  e3: string;
  /** Error message: unauthorized */
  e4: string;
}

/**
 * MD5 hash function type
 */
type MD5Hash = (input: string) => string;

/**
 * Token validation and management class
 * Handles token decoding, validation, encoding, and signature generation
 */
export declare class Tkk {
  /** Raw token string */
  private readonly tk: string;
  
  /** Base64 encoded configuration data */
  private readonly data: string;
  
  /** Decoded token payload */
  private readonly dec?: DecodedToken;

  /**
   * Creates a new Tkk instance
   * @param token - The token string to validate and manage
   */
  constructor(token: string);

  /**
   * Validates the token
   * @throws {Error} When token is invalid, not started, or expired
   */
  tv(): void;

  /**
   * Gets the mini/lite mode flag
   * @returns Whether lite mode is enabled
   */
  get mini(): boolean;

  /**
   * Gets the unauthorized error message
   * @returns Error message for unauthorized access
   */
  get e4(): string;

  /**
   * Parses and decodes a base64-encoded token
   * @param encodedToken - Base64 encoded token string
   * @returns Decoded token object
   */
  private pb(encodedToken: string): DecodedToken;

  /**
   * Verifies token signature
   * @returns Whether the signature is valid
   */
  private vs(): boolean;

  /**
   * Encodes an object into a signed token string
   * @param payload - Object to encode
   * @returns Encoded token with signature
   */
  encode(payload: unknown): string;

  /**
   * Generates signature for given input
   * @param input - Input string to sign
   * @returns Generated signature hash
   */
  private sg(input: string): string;

  /**
   * Gets the parsed configuration data
   * @returns Decoded configuration object
   */
  private get pt(): DecodedToken;
}

/**
 * MD5 hash implementation
 * @param input - String to hash
 * @returns MD5 hash as hexadecimal string
 */
export declare function md5(input: string): string;

/**
 * MD5 hash with encoding options
 * @param key - Key for HMAC
 * @param data - Data to hash
 * @param raw - If true, return raw binary string; otherwise return hex
 * @returns MD5 hash result
 */
export declare function md5(key: string, data: string, raw: boolean): string;

export default md5;