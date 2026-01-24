/**
 * Browser vendor prefix utilities for CSS properties
 * @module BrowserPrefix
 */

/**
 * Supported browser vendor prefixes
 */
export type VendorPrefix = 'Moz' | 'Webkit' | 'O' | 'ms' | '';

/**
 * Converts a CSS property name to camelCase with vendor prefix
 * @param propertyName - CSS property name (e.g., 'transform', 'box-shadow')
 * @param prefix - Vendor prefix (e.g., 'Webkit', 'Moz')
 * @returns Prefixed property name in camelCase (e.g., 'WebkitTransform')
 * @example
 *