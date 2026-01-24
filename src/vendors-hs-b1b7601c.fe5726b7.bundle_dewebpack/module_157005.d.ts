/**
 * Crypto utilities module providing UUID generation functionality.
 * 
 * This module wraps the native Web Crypto API's randomUUID method,
 * providing a consistent interface for generating RFC 4122 version 4 UUIDs.
 * 
 * @module CryptoUtils
 */

/**
 * Checks if the crypto.randomUUID API is available in the current environment
 * and returns a bound reference to it if available, otherwise undefined.
 */
declare const randomUUID: (() => string) | undefined;

/**
 * Default export containing crypto utility functions.
 */
interface CryptoUtils {
  /**
   * Generates a RFC 4122 version 4 UUID string.
   * 
   * This function wraps the native `crypto.randomUUID()` method if available
   * in the current environment (modern browsers and Node.js 16.7.0+).
   * 
   * @returns A randomly generated UUID string in the format:
   *          xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
   *          Returns undefined if crypto.randomUUID is not supported.
   * 
   * @example
   *