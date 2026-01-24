/**
 * RegExp flags polyfill module
 * Ensures the `flags` property is available on RegExp.prototype
 * for environments that don't support it natively
 */

import { defineProperty } from './object-define-property';
import { getRegExpFlags } from './regexp-flags-getter';

/**
 * Checks if the environment supports Object.defineProperty
 */
declare const hasDefineProperty: boolean;

/**
 * Polyfills the RegExp.prototype.flags property if:
 * 1. Object.defineProperty is supported
 * 2. The native implementation is missing or incorrect (doesn't include 'g' flag)
 * 
 * The flags property returns a string containing all active flags of a RegExp instance.
 * Expected flags: 'g' (global), 'i' (ignoreCase), 'm' (multiline), 'u' (unicode), 
 * 'y' (sticky), 's' (dotAll)
 */
declare module 'regexp-flags-polyfill' {
  /**
   * Defines the 'flags' getter on RegExp.prototype
   * This getter returns a string representation of all active RegExp flags
   */
  export function installFlagsPolyfill(): void;
}

/**
 * RegExp.prototype augmentation
 */
declare global {
  interface RegExp {
    /**
     * Returns a string consisting of the flags of the current regular expression.
     * The flags are sorted alphabetically.
     * 
     * @example
     * const regex = /foo/gi;
     * console.log(regex.flags); // "gi"
     */
    readonly flags: string;
  }
}

export {};