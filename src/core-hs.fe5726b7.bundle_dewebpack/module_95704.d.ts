/**
 * webOS Browser Detection Module
 * 
 * This module detects whether the current environment is running on a webOS browser
 * (excluding Chrome-based webOS browsers).
 * 
 * @module webos-detection
 * @see Module ID: 95704
 */

/**
 * User agent string from the browser or runtime environment.
 * Typically imported from a user agent detection utility module.
 */
declare const userAgent: string;

/**
 * Regular expression pattern to detect webOS browsers.
 * Matches "web0s" (case-insensitive) but excludes matches that also contain "chrome".
 * Uses a negative lookahead (?!.*chrome) to ensure Chrome-based webOS browsers are excluded.
 * 
 * @example
 * // Matches:
 * "Mozilla/5.0 (Web0S; Linux) ..."
 * 
 * // Does not match:
 * "Mozilla/5.0 (Web0S; Linux) Chrome/..."
 */
declare const WEBOS_DETECTION_PATTERN: RegExp;

/**
 * Determines if the current environment is a webOS browser (excluding Chrome-based versions).
 * 
 * @returns `true` if the user agent string indicates a webOS browser without Chrome,
 *          `false` otherwise
 * 
 * @example
 *