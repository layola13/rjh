/**
 * iOS Device Detection Module
 * 
 * Detects whether the current user agent string indicates an iOS device
 * (iPad, iPhone, or iPod) with WebKit browser engine.
 * 
 * @module iosDeviceDetection
 */

/**
 * Boolean flag indicating if the current device is an iOS device
 * (iPad, iPhone, or iPod) running WebKit-based browser.
 * 
 * This value is determined by testing the user agent string against
 * the pattern: /(?:ipad|iphone|ipod).*applewebkit/i
 * 
 * @example
 *