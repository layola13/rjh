/**
 * Iterator Protocol Implementation Module
 * Provides polyfill for iterator protocol with Safari bug workarounds
 */

/**
 * The base iterator prototype object used across all iterators
 */
export const IteratorPrototype: object;

/**
 * Flag indicating whether Safari has buggy iterator implementation
 * Safari bug: Array iterator's prototype chain is broken
 */
export const BUGGY_SAFARI_ITERATORS: boolean;

/**
 * Module exports
 */
export interface IteratorPolyfill {
  /**
   * The prototype object that all iterators should inherit from
   */
  IteratorPrototype: object;
  
  /**
   * Whether the current environment has Safari's iterator bugs
   */
  BUGGY_SAFARI_ITERATORS: boolean;
}

declare const iteratorPolyfill: IteratorPolyfill;
export default iteratorPolyfill;