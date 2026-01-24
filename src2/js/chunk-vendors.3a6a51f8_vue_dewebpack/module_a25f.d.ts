/**
 * User Agent Detector Module
 * 
 * Provides safe access to the browser's user agent string.
 * Returns an empty string if navigator or userAgent is unavailable.
 * 
 * @module UserAgentDetector
 */

/**
 * Global object type containing navigator
 */
interface GlobalObject {
  navigator?: Navigator;
}

/**
 * Navigator interface with userAgent property
 */
interface Navigator {
  userAgent?: string;
}

/**
 * Retrieves the global object (window in browsers, global in Node.js)
 * 
 * @returns The global object containing navigator
 */
declare function getGlobalObject(): GlobalObject;

/**
 * The user agent string from the browser's navigator object.
 * Falls back to an empty string if navigator or userAgent is not available.
 * 
 * @example
 *