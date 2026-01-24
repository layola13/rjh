/**
 * Polyfill for parseFloat that correctly handles negative zero.
 * 
 * Some JavaScript engines incorrectly parse "-0" as +0 instead of -0.
 * This module provides a corrected parseFloat implementation that preserves
 * the sign of zero values.
 * 
 * @module parseFloat
 */

/**
 * Trims whitespace from a string.
 * 
 * @param str - The string to trim
 * @param mode - Trim mode (1: left, 2: right, 3: both)
 * @returns The trimmed string
 */
declare function trim(str: string, mode: number): string;

/**
 * Native parseFloat function from the global object.
 */
declare const nativeParseFloat: typeof parseFloat;

/**
 * String used to test parseFloat behavior with negative zero.
 * Typically a whitespace string that when combined with "-0" tests the engine's parsing.
 */
declare const whitespaceString: string;

/**
 * Enhanced parseFloat that correctly handles negative zero.
 * 
 * If the native parseFloat incorrectly handles "-0" (returning +0 instead of -0),
 * this function provides a corrected implementation. Otherwise, it uses the native version.
 * 
 * @param value - The value to parse as a floating point number
 * @returns The parsed number, with correct handling of negative zero
 * 
 * @example
 *