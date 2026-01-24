/**
 * Version information module
 * Contains the current version of the package/library
 */

/**
 * Version configuration object
 */
export interface VersionInfo {
  /** Semantic version string (e.g., "1.5.0") */
  version: string;
}

/**
 * Default export containing version information
 */
declare const versionInfo: VersionInfo;

export default versionInfo;

/**
 * Named export for direct access to version string
 */
export const version: string;