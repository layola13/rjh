/**
 * RegExp.prototype.exec polyfill module
 * 
 * This module ensures that RegExp.prototype.exec uses the standard implementation
 * across all environments, fixing inconsistencies in older JavaScript engines.
 * 
 * @module regexp-exec-polyfill
 */

/**
 * Configuration options for installing a polyfill or feature
 */
interface PolyfillInstallOptions {
  /**
   * The target object or constructor to patch (e.g., "RegExp", "Array", "String")
   */
  target: string;

  /**
   * Whether to patch the prototype of the target instead of static methods
   * @default false
   */
  proto?: boolean;

  /**
   * Force the polyfill to be installed even if a native implementation exists
   * @default false
   */
  forced?: boolean;
}

/**
 * Installs a polyfill or patches a built-in object with new methods
 * 
 * @param options - Configuration specifying what to patch and how
 * @param methods - An object containing the methods to add/override on the target
 * 
 * @example
 *