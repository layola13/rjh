/**
 * User Agent Detection Module
 * 
 * Provides a safe way to access the browser's user agent string.
 * Returns an empty string in non-browser environments (e.g., Node.js, SSR).
 * 
 * @module UserAgent
 * @returns {string} The user agent string if available, otherwise an empty string
 */

/**
 * The user agent string from the browser's navigator object.
 * Falls back to an empty string if navigator is not available (e.g., server-side rendering).
 * 
 * @example
 *