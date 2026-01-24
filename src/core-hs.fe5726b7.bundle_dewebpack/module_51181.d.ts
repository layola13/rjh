/**
 * Device Detection Module for iOS Pebble Support
 * 
 * This module detects whether the current device is an iOS device (iPad, iPhone, or iPod)
 * that has Pebble smartwatch SDK support enabled.
 * 
 * @module DeviceDetection
 */

/**
 * User agent string or similar device identifier
 * Imported from module 203
 */
declare const userAgentString: string;

/**
 * Pebble smartwatch SDK global object
 * Available when Pebble JavaScript framework is loaded on iOS devices
 */
declare const Pebble: unknown;

/**
 * Determines if the current device is an iOS device with Pebble support
 * 
 * Checks two conditions:
 * 1. User agent matches iPad, iPhone, or iPod (case-insensitive)
 * 2. Pebble SDK global object is defined in the environment
 * 
 * @returns `true` if running on iOS device with Pebble SDK available, `false` otherwise
 * 
 * @example
 *