/**
 * Core module export configuration
 * Defines the version identifier for the module system
 */

/**
 * Module version information
 * @description Represents the current version of the module
 */
export interface ModuleExport {
  /**
   * Semantic version string
   * @example "2.6.5"
   */
  version: string;
}

/**
 * Module configuration object
 * Contains version and other core module metadata
 */
declare const moduleExport: ModuleExport;

export default moduleExport;

/**
 * Global module counter (if defined)
 * Used by the module system for tracking loaded modules
 */
declare global {
  var __e: ModuleExport | number | undefined;
}