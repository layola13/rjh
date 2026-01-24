/**
 * User Agent Module
 * 
 * Provides access to the browser's user agent string.
 * This module extracts the userAgent from the navigator object,
 * falling back to an empty string if unavailable.
 * 
 * @module UserAgent
 */

/**
 * Navigator interface from the browser environment
 * Contains browser and system information
 */
interface Navigator {
  /** The user agent string identifying the browser and platform */
  userAgent?: string;
  [key: string]: unknown;
}

/**
 * Module that exports navigator and related browser APIs
 */
interface NavigatorModule {
  /** The browser's Navigator object, may be undefined in non-browser environments */
  navigator?: Navigator;
}

/**
 * The user agent string from the browser's navigator.
 * Returns an empty string if navigator or userAgent is unavailable.
 * 
 * Common use cases:
 * - Browser detection
 * - Feature detection fallback
 * - Analytics and logging
 * 
 * @example
 * // Typical value in Chrome:
 * // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
 */
declare const userAgent: string;

export default userAgent;