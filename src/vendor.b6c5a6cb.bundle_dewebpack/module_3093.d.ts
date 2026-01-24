/**
 * CryptoJS WordArray extension for typed array support
 * Extends the WordArray class to handle ArrayBuffer and typed array inputs
 */

/**
 * Represents a word array with 32-bit words
 */
interface WordArray {
  /**
   * Initializes the word array
   * @param words - Array of 32-bit words
   * @param sigBytes - Number of significant bytes
   */
  init(words: number[], sigBytes: number): void;
  
  /**
   * Prototype reference
   */
  prototype: WordArray;
}

/**
 * CryptoJS library namespace
 */
interface CryptoJSLib {
  /**
   * WordArray class for handling binary data
   */
  WordArray: WordArray;
}

/**
 * CryptoJS main interface
 */
interface CryptoJS {
  /**
   * Core library containing cryptographic primitives
   */
  lib: CryptoJSLib;
}

/**
 * Typed array types supported for conversion
 */
type TypedArray = 
  | Int8Array 
  | Uint8Array 
  | Uint8ClampedArray 
  | Int16Array 
  | Uint16Array 
  | Int32Array 
  | Uint32Array 
  | Float32Array 
  | Float64Array;

/**
 * Input types accepted by the enhanced WordArray constructor
 */
type WordArrayInput = ArrayBuffer | TypedArray | number[];

/**
 * Enhances WordArray to support ArrayBuffer and typed arrays
 * @param cryptoJS - The CryptoJS instance to extend
 * @returns The enhanced WordArray class
 */
declare function extendWordArrayWithTypedArraySupport(cryptoJS: CryptoJS): WordArray;

export = extendWordArrayWithTypedArraySupport;