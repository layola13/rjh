/**
 * Version configuration module
 * Exports the current version of the application/library
 */

/**
 * Version information object
 */
export interface VersionInfo {
  /**
   * Semantic version string in format "major.minor.patch"
   * @example "1.5.0"
   */
  version: string;
}

/**
 * Current version configuration
 */
declare const versionInfo: VersionInfo;

export default versionInfo;