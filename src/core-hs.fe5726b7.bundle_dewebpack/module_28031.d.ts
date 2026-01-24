/**
 * User Agent Detection Utility
 * 
 * Detects if the current browser is Internet Explorer (MSIE) or uses the Trident engine.
 * This module performs a regex test against the user agent string.
 * 
 * @module BrowserDetection
 * @returns {boolean} True if the browser is Internet Explorer or uses Trident engine, false otherwise
 */

/**
 * Regular expression pattern that matches Internet Explorer user agent strings.
 * - MSIE: Matches Internet Explorer 10 and earlier
 * - Trident: Matches Internet Explorer 11 and later
 */
declare const IE_DETECTION_PATTERN: RegExp;

/**
 * Indicates whether the current browser is Internet Explorer.
 * Checks for both "MSIE" (IE 10 and below) and "Trident" (IE 11) in the user agent string.
 */
declare const isInternetExplorer: boolean;

export default isInternetExplorer;
export { IE_DETECTION_PATTERN };