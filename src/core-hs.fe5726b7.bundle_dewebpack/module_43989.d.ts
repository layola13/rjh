/**
 * Enhanced parseFloat implementation with edge case handling
 * 
 * This module provides a parseFloat function that correctly handles:
 * - Negative zero ("-0" should return -0, not 0)
 * - Symbol.iterator compatibility checks
 * - String trimming before parsing
 * 
 * @module ParseFloatPolyfill
 */

/**
 * Parses a string argument and returns a floating point number.
 * 
 * This implementation ensures correct handling of edge cases:
 * - Returns -0 for the string "-0" (not 0)
 * - Trims whitespace before parsing
 * - Handles Symbol.iterator objects gracefully
 * 
 * @param value - The value to parse. If not a string, it will be converted to one.
 * @returns The parsed floating point number, or NaN if parsing fails
 * 
 * @example
 *