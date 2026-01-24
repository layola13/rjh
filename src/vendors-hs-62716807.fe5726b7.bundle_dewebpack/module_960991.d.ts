/**
 * User agent string containing browser/device information
 * @remarks This is typically imported from a UA detection module
 */
declare const userAgent: string;

/**
 * Detects if the current device is a Pebble smartwatch running on iOS
 * 
 * @remarks
 * This module checks two conditions:
 * 1. The user agent string matches iPad, iPhone, or iPod (case-insensitive)
 * 2. The global Pebble object is defined (indicates Pebble smartwatch environment)
 * 
 * @returns `true` if the device is an iOS device with Pebble SDK available, `false` otherwise
 * 
 * @example
 *