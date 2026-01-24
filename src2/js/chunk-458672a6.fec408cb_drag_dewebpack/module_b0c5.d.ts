/**
 * RegExp.prototype.exec polyfill module
 * 
 * This module patches the RegExp prototype to ensure consistent exec behavior
 * across different JavaScript environments by providing a standardized implementation.
 * 
 * @module RegExpExecPolyfill
 * @dependencies
 *   - RegExpExecImplementation (module 520a): Core exec implementation
 *   - PolyfillExporter (module 5ca1): Utility for conditionally exporting polyfills
 */

/**
 * Core RegExp exec implementation function
 * Provides the standardized behavior for RegExp.prototype.exec
 */
export type RegExpExecImplementation = (this: RegExp, string: string) => RegExpExecArray | null;

/**
 * Configuration options for the polyfill exporter
 */
export interface PolyfillConfig {
  /**
   * The target object or constructor to patch (e.g., "RegExp")
   */
  target: string;
  
  /**
   * Whether to patch the prototype of the target
   * @default false
   */
  proto?: boolean;
  
  /**
   * Whether to force the polyfill even if a native implementation exists
   * Comparison is made against the default implementation (/./.exec)
   * @default false
   */
  forced?: boolean;
}

/**
 * Methods to be added or patched on the target
 */
export interface PolyfillMethods {
  /**
   * The exec method implementation for RegExp
   * Executes a search for a match in a specified string
   * 
   * @param string - The string to search
   * @returns An array containing the matched results or null if no match found
   */
  exec: RegExpExecImplementation;
}

/**
 * Polyfill exporter function
 * Conditionally exports methods to a target object based on configuration
 * 
 * @param config - Configuration specifying the target and patching behavior
 * @param methods - Methods to be exported to the target
 */
export type PolyfillExporter = (config: PolyfillConfig, methods: PolyfillMethods) => void;

/**
 * Module initialization
 * Exports the exec polyfill to RegExp.prototype if the current implementation
 * differs from the standard /./.exec behavior
 */
declare const initRegExpExecPolyfill: () => void;

export default initRegExpExecPolyfill;