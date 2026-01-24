/**
 * Detects if the current device is a mobile device based on user agent string.
 * 
 * This module exports a function that performs mobile device detection by analyzing
 * the user agent string against comprehensive regex patterns covering various mobile
 * devices, tablets, and mobile browsers.
 * 
 * @module MobileDetection
 */

/**
 * Checks whether the current environment is a mobile device.
 * 
 * Performs detection by:
 * 1. Checking if running in a browser environment (navigator and window exist)
 * 2. Extracting user agent string from navigator.userAgent, navigator.vendor, or window.opera
 * 3. Testing against two comprehensive regex patterns:
 *    - First pattern: Matches common mobile OS and device keywords in full UA string
 *    - Second pattern: Matches device-specific prefixes in first 4 characters of UA
 * 
 * Supported devices include: Android, iOS (iPhone/iPad/iPod), BlackBerry, Windows Phone,
 * Opera Mobile, Kindle, Symbian, and many legacy mobile devices.
 * 
 * @returns {boolean} True if the device is detected as mobile, false otherwise
 * 
 * @example
 *