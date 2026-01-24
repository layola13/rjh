/**
 * Version comparison utility module
 * Provides methods for comparing semantic version strings
 */

/**
 * Comparison result
 * @returns -1 if first version is earlier, 1 if later, 0 if equal
 */
type ComparisonResult = -1 | 0 | 1;

/**
 * Version string in format "major.minor" (e.g., "1.2")
 */
type VersionString = string;

/**
 * Version utility interface for comparing semantic versions
 */
export interface Version {
  /**
   * Compares two version strings
   * @param firstVersion - First version string to compare (format: "major.minor")
   * @param secondVersion - Second version string to compare (format: "major.minor")
   * @returns -1 if firstVersion < secondVersion, 1 if firstVersion > secondVersion, 0 if equal
   * @throws Error if version format is invalid (via assert.error)
   */
  compare(firstVersion: VersionString, secondVersion: VersionString): ComparisonResult;

  /**
   * Checks if the first version is earlier than the second version
   * @param firstVersion - Version string to check (format: "major.minor")
   * @param secondVersion - Version string to compare against (format: "major.minor")
   * @returns true if firstVersion is earlier than secondVersion, false otherwise
   */
  isEarlierThan(firstVersion: VersionString | null | undefined, secondVersion: VersionString): boolean;

  /**
   * Checks if the first version is later than the second version
   * @param firstVersion - Version string to check (format: "major.minor")
   * @param secondVersion - Version string to compare against (format: "major.minor")
   * @returns true if firstVersion is later than secondVersion, false otherwise
   */
  isLaterThan(firstVersion: VersionString | null | undefined, secondVersion: VersionString): boolean;
}

/**
 * Version comparison utility
 */
export declare const Version: Version;