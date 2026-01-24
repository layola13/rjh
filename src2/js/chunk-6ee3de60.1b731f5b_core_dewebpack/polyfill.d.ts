/**
 * Polyfill utility for adding missing JavaScript features to older environments.
 * Provides polyfills for modern array methods and other ECMAScript features.
 * 
 * @module Polyfill
 */

/**
 * Polyfill class that detects and applies necessary polyfills for missing native features.
 * Currently supports Array.prototype.flat polyfill.
 */
export declare class Polyfill {
  /**
   * Singleton instance of the Polyfill class.
   * @private
   */
  private static instance?: Polyfill;

  /**
   * Initializes the Polyfill singleton instance.
   * Creates a new instance only if one doesn't already exist.
   * This applies all polyfills automatically upon initialization.
   * 
   * @static
   * @returns {void}
   */
  static initialize(): void;

  /**
   * Creates a new Polyfill instance and applies all polyfills.
   * @constructor
   */
  constructor();

  /**
   * Detects if Array.prototype.flat is missing and adds a polyfill implementation.
   * The polyfill recursively flattens nested arrays up to the specified depth.
   * 
   * @private
   * @returns {void}
   */
  private flatDetect(): void;
}

/**
 * Global augmentation for Array.prototype to include the flat method.
 */
declare global {
  interface Array<T> {
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively
     * up to the specified depth.
     * 
     * @param depth - The depth level specifying how deep a nested array structure
     *                should be flattened. Defaults to 1.
     * @returns A new array with the sub-array elements flattened.
     * 
     * @example
     *