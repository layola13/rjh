/**
 * String whitespace trimming utilities
 * Provides functions to trim whitespace from start, end, or both ends of a string
 */

/**
 * Trims whitespace from the start of a string
 * @param value - The string to trim
 * @returns The string with leading whitespace removed
 */
export function start(value: string): string;

/**
 * Trims whitespace from the end of a string
 * @param value - The string to trim
 * @returns The string with trailing whitespace removed
 */
export function end(value: string): string;

/**
 * Trims whitespace from both start and end of a string
 * @param value - The string to trim
 * @returns The string with leading and trailing whitespace removed
 */
export function trim(value: string): string;