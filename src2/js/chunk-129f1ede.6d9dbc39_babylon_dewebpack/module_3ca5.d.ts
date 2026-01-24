/**
 * Polyfill for parseInt that handles octal and hexadecimal strings correctly
 * across different JavaScript environments.
 * 
 * This module provides a cross-browser compatible parseInt implementation that:
 * - Trims whitespace from input strings
 * - Correctly detects hexadecimal notation (0x/0X prefix)
 * - Defaults to base 10 for decimal numbers
 * - Defaults to base 16 for hexadecimal notation
 * 
 * @module ParseIntPolyfill
 */

/**
 * Cross-browser compatible parseInt function.
 * 
 * @param value - The string value to parse as an integer
 * @param radix - The base/radix to use for parsing (2-36). If not specified or 0,
 *                defaults to 10 for decimal numbers or 16 for hex notation (0x prefix)
 * @returns The parsed integer value
 * 
 * @example
 *