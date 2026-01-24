/**
 * Library version information module.
 * Exports the current version of the library.
 */

/**
 * Version export interface.
 * Contains the semantic version string of the library.
 */
export interface VersionInfo {
  /**
   * The semantic version string in format "major.minor.patch"
   * @example "2.6.12"
   */
  version: string;
}

/**
 * Library version information.
 * Current version: 2.6.12
 */
export const versionInfo: VersionInfo;

/**
 * The current semantic version of the library.
 * @deprecated Use versionInfo.version instead for better type safety
 */
export const version: string;