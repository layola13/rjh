/**
 * Object.assign polyfill module
 * Based on object-assign by Sindre Sorhus
 * @license MIT
 */

/**
 * Polyfill for Object.assign that safely merges properties from source objects to a target object.
 * If native Object.assign is available and working correctly, it will be used instead.
 * 
 * @param target - The target object to copy properties to
 * @param sources - One or more source objects to copy properties from
 * @returns The target object with properties merged from all sources
 * 
 * @example
 *