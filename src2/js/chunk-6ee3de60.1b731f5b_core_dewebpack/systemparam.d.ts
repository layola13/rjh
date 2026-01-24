/**
 * System parameters and device detection utilities
 * @module SystemParam
 */

/**
 * Provides system-level parameters and capabilities detection
 */
export declare class SystemParam {
  /**
   * Detects if the current device is a mobile device
   * 
   * Checks for:
   * - Mobile user agents (Android, iOS, BlackBerry, etc.)
   * - iPad/Macintosh devices with touch support
   * 
   * @returns {boolean} True if running on a mobile device, false otherwise
   */
  static get isMobileDevice(): boolean;

  /**
   * Detects if the browser supports passive event listeners
   * 
   * Passive event listeners improve scrolling performance by indicating
   * that the event handler will not call preventDefault()
   * 
   * @returns {boolean} True if passive event listeners are supported, false otherwise
   */
  static get supportsPassive(): boolean;
}