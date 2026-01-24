/**
 * CryptoJS x64 Word Module
 * 
 * This module provides 64-bit word functionality for cryptographic operations.
 * It extends the base library with x64-specific Word and WordArray implementations.
 * 
 * @module CryptoJS.x64
 */

declare module 'crypto-js/x64-core' {
  import { LibWordArray, Base } from 'crypto-js/core';

  /**
   * Represents a 64-bit word composed of high and low 32-bit parts
   */
  export interface X64Word extends Base {
    /**
     * The high 32 bits of the 64-bit word
     */
    high: number;

    /**
     * The low 32 bits of the 64-bit word
     */
    low: number;

    /**
     * Initializes a 64-bit word
     * 
     * @param high - The high 32 bits
     * @param low - The low 32 bits
     */
    init(high: number, low: number): void;

    /**
     * Creates a deep copy of this X64Word instance
     * 
     * @returns A cloned X64Word instance
     */
    clone(): X64Word;
  }

  /**
   * Static constructor for X64Word
   */
  export interface X64WordStatic extends Base {
    /**
     * Creates a new 64-bit word
     * 
     * @param high - The high 32 bits (default: 0)
     * @param low - The low 32 bits (default: 0)
     * @returns A new X64Word instance
     */
    create(high?: number, low?: number): X64Word;

    new(high?: number, low?: number): X64Word;
  }

  /**
   * Represents an array of 64-bit words
   */
  export interface X64WordArray extends Base {
    /**
     * The array of 64-bit words
     */
    words: X64Word[];

    /**
     * The number of significant bytes in this word array
     */
    sigBytes: number;

    /**
     * Initializes a 64-bit word array
     * 
     * @param words - Array of X64Word instances (default: empty array)
     * @param sigBytes - Number of significant bytes (default: 8 * words.length)
     */
    init(words?: X64Word[], sigBytes?: number): void;

    /**
     * Converts this 64-bit word array to a 32-bit word array
     * 
     * This method splits each 64-bit word into its high and low 32-bit parts,
     * creating a standard WordArray that can be used with 32-bit algorithms.
     * 
     * @returns A 32-bit WordArray representation
     */
    toX32(): LibWordArray;

    /**
     * Creates a deep copy of this X64WordArray instance
     * 
     * Each X64Word in the array is also cloned to ensure complete independence.
     * 
     * @returns A cloned X64WordArray instance
     */
    clone(): X64WordArray;
  }

  /**
   * Static constructor for X64WordArray
   */
  export interface X64WordArrayStatic extends Base {
    /**
     * Creates a new 64-bit word array
     * 
     * @param words - Array of X64Word instances
     * @param sigBytes - Number of significant bytes
     * @returns A new X64WordArray instance
     */
    create(words?: X64Word[], sigBytes?: number): X64WordArray;

    new(words?: X64Word[], sigBytes?: number): X64WordArray;
  }

  /**
   * The x64 namespace containing 64-bit word implementations
   */
  export interface X64Static {
    /**
     * 64-bit word constructor
     */
    Word: X64WordStatic;

    /**
     * 64-bit word array constructor
     */
    WordArray: X64WordArrayStatic;
  }

  /**
   * x64 module namespace
   */
  export const x64: X64Static;
}

declare module 'crypto-js' {
  export interface CryptoJSStatic {
    /**
     * x64 word functionality for 64-bit cryptographic operations
     */
    x64: import('crypto-js/x64-core').X64Static;
  }
}

export {};