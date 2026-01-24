/**
 * RegExp.prototype.exec polyfill module
 * 
 * This module provides a standardized implementation of RegExp.prototype.exec
 * by ensuring consistent behavior across different environments.
 */

/**
 * Standard exec implementation imported from module 520a
 */
declare const standardExec: RegExp['exec'];

/**
 * Export configuration for polyfill registration
 * 
 * @param config - Polyfill configuration object
 * @param config.target - The target object to polyfill (e.g., "RegExp")
 * @param config.proto - Whether to polyfill the prototype
 * @param config.forced - Whether to force the polyfill even if method exists
 * @param methods - Object containing methods to polyfill
 */
declare function exportPolyfill(
  config: {
    target: string;
    proto: boolean;
    forced: boolean;
  },
  methods: {
    exec: RegExp['exec'];
  }
): void;

/**
 * Registers the standard exec implementation on RegExp.prototype
 * if the current environment's implementation differs from the standard.
 */
declare function registerRegExpExecPolyfill(): void;

export { standardExec, exportPolyfill, registerRegExpExecPolyfill };