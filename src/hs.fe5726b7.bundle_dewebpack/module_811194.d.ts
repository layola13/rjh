/**
 * NWTK Module Type Definitions
 * 
 * This module re-exports the NWTK library and attaches it to the global scope.
 * Original module ID: 811194
 * Dependency module ID: 988396
 */

/**
 * NWTK - Network Toolkit or similar library
 * 
 * Note: Without access to the actual implementation (module 988396),
 * this is a placeholder type definition. Replace 'unknown' with the
 * actual type/interface of the NWTK module once available.
 */
declare const NWTK: unknown;

/**
 * Global augmentation to include NWTK on the global object
 */
declare global {
  /**
   * Global NWTK instance
   */
  const NWTK: typeof import('./module_988396');
}

/**
 * Module exports the NWTK library
 */
export = NWTK;

/**
 * Alternative named export
 */
export as namespace NWTK;