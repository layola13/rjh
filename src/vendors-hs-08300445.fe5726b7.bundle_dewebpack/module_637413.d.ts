/**
 * Firefox browser detection utility
 * 
 * Detects whether the current browser is Firefox by checking the navigator.userAgent string.
 * This check is performed at module load time and the result is cached.
 * 
 * @module FirefoxDetection
 * @returns {boolean} True if the current browser is Firefox, false otherwise
 */

/**
 * Determines if the current environment is running Firefox browser
 * 
 * Detection logic:
 * 1. Checks if navigator object exists and is of type "object"
 * 2. Tests the userAgent string for "Firefox" pattern (case-insensitive)
 * 
 * @example
 *