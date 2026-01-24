/**
 * Utility functions for query string parsing and encoding
 * @module QueryStringUtils
 */

/**
 * Options for controlling object creation and merging behavior
 */
export interface ParseOptions {
  /**
   * Create objects without prototype chain
   */
  plainObjects?: boolean;
  
  /**
   * Allow properties from Object.prototype to be set
   */
  allowPrototypes?: boolean;
}

/**
 * Supported character encoding formats
 */
export type Charset = 'iso-8859-1' | 'utf-8';

/**
 * RFC format specification for URL encoding
 */
export enum RFC {
  RFC1738 = 'RFC1738',
  RFC3986 = 'RFC3986'
}

/**
 * Converts an array to an object, preserving array indices as keys
 * @param array - Source array to convert
 * @param options - Optional configuration for object creation
 * @returns Object with numeric keys corresponding to array indices
 */
export function arrayToObject<T>(
  array: T[],
  options?: ParseOptions
): Record<number, T>;

/**
 * Assigns all properties from source object to target object
 * @param target - Object to receive properties
 * @param source - Object providing properties
 * @returns Target object with assigned properties
 */
export function assign<T extends object, U extends object>(
  target: T,
  source: U
): T & U;

/**
 * Concatenates two arrays or array-like values
 * @param left - First value to combine
 * @param right - Second value to combine
 * @returns Combined array
 */
export function combine<T>(left: T | T[], right: T | T[]): T[];

/**
 * Removes undefined values from nested objects and arrays
 * @param value - Object or array to compact
 * @returns Compacted value with undefined entries removed
 */
export function compact<T>(value: T): T;

/**
 * Decodes a URI-encoded string with specified charset
 * @param encoded - String to decode
 * @param decoder - Decoding function (unused parameter for compatibility)
 * @param charset - Character encoding to use for decoding
 * @returns Decoded string
 */
export function decode(
  encoded: string,
  decoder?: unknown,
  charset?: Charset
): string;

/**
 * Encodes a value to URI-safe string with specified charset
 * @param value - Value to encode (string, symbol, or other primitive)
 * @param defaultEncoder - Default encoding function (unused parameter)
 * @param charset - Character encoding to use
 * @param kind - Type of value being encoded (unused parameter)
 * @param format - RFC format specification for encoding rules
 * @returns URI-encoded string
 */
export function encode(
  value: string | symbol | number | boolean,
  defaultEncoder?: unknown,
  charset?: Charset,
  kind?: unknown,
  format?: RFC
): string;

/**
 * Checks if a value is a Buffer instance
 * @param obj - Value to check
 * @returns True if value is a Buffer
 */
export function isBuffer(obj: unknown): obj is Buffer;

/**
 * Checks if a value is a RegExp instance
 * @param obj - Value to check
 * @returns True if value is a RegExp
 */
export function isRegExp(obj: unknown): obj is RegExp;

/**
 * Maps a transformation function over a value or array of values
 * @param value - Single value or array to transform
 * @param fn - Transformation function to apply
 * @returns Transformed value or array
 */
export function maybeMap<T, U>(
  value: T | T[],
  fn: (item: T) => U
): U | U[];

/**
 * Deep merges two values with customizable behavior
 * Handles arrays, objects, and primitive values
 * @param target - Target value to merge into
 * @param source - Source value to merge from
 * @param options - Options controlling merge behavior
 * @returns Merged result
 */
export function merge<T>(
  target: T,
  source: unknown,
  options?: ParseOptions
): T;

/**
 * Default export containing all utility functions
 */
declare const utils: {
  arrayToObject: typeof arrayToObject;
  assign: typeof assign;
  combine: typeof combine;
  compact: typeof compact;
  decode: typeof decode;
  encode: typeof encode;
  isBuffer: typeof isBuffer;
  isRegExp: typeof isRegExp;
  maybeMap: typeof maybeMap;
  merge: typeof merge;
};

export default utils;