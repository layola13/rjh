/**
 * Core module version information
 * @module CoreVersion
 */

/**
 * Version configuration interface
 */
export interface VersionConfig {
  /**
   * Semantic version string (e.g., "2.6.5")
   */
  version: string;
}

/**
 * Core module exports
 * Provides version information for the library
 */
declare const versionModule: VersionConfig;

export default versionModule;