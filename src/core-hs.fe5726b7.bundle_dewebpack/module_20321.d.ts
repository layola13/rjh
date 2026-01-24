/**
 * Firefox version detection module
 * 
 * Detects if the current browser is Firefox and returns its major version number.
 * Returns false if not Firefox, or the major version number if it is Firefox.
 * 
 * @module FirefoxVersionDetector
 */

/**
 * User agent string or related browser detection utility
 * This would typically come from navigator.userAgent or a similar detection module
 */
import { userAgent } from './browser-detection';

/**
 * Firefox browser version number
 * - Returns `false` if the browser is not Firefox
 * - Returns the major version number (as a number) if Firefox is detected
 * 
 * @example
 * // If running on Firefox 115
 * firefoxVersion === 115
 * 
 * // If running on Chrome or other non-Firefox browser
 * firefoxVersion === false
 */
export const firefoxVersion: number | false = (() => {
  // Match Firefox user agent pattern and extract version number
  // Pattern: "firefox/115" -> captures "115"
  const firefoxMatch = userAgent.match(/firefox\/(\d+)/i);
  
  // Return false if no match, otherwise convert version string to number
  return firefoxMatch ? Number(firefoxMatch[1]) : false;
})();

export default firefoxVersion;