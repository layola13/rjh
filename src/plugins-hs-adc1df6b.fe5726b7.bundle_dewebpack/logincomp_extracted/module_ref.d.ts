/**
 * Module: module_ref
 * Reference module for fingerprint wrapper functionality
 */

/**
 * Fingerprint wrapper type
 * Used to wrap and manage fingerprint-related operations
 */
export type FpWrapper = unknown;

/**
 * Module exports interface
 * Defines the structure of the ref module's export object
 */
export interface ModuleExports {
  /**
   * Fingerprint wrapper instance
   * Stores the fingerprint wrapper function or object
   */
  fpWrapper: FpWrapper;
}

/**
 * Initializes the module with a fingerprint wrapper
 * @param wrapper - The fingerprint wrapper to be assigned
 */
declare function initializeModule(wrapper: FpWrapper): void;

export default initializeModule;