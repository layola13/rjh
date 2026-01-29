/**
 * Version comparison utility module
 * Provides methods to compare semantic version strings
 */

/**
 * Comparison result type
 * -1: first version is earlier
 *  0: versions are equal
 *  1: first version is later
 */
type ComparisonResult = -1 | 0 | 1;

/**
 * Version utility interface for comparing semantic version strings
 */
export interface Version {
  /**
   * Compares two version strings in semantic versioning format (e.g., "1.0", "2.5")
   * @param firstVersion - The first version string to compare
   * @param secondVersion - The second version string to compare
   * @returns -1 if firstVersion < secondVersion, 0 if equal, 1 if firstVersion > secondVersion
   * @throws Error if version format is invalid (not in X.Y format)
   */
  compare(firstVersion: string, secondVersion: string): ComparisonResult;

  /**
   * Checks if the first version is earlier than the second version
   * @param firstVersion - The version to check (must be truthy)
   * @param secondVersion - The version to compare against
   * @returns true if firstVersion exists and is earlier than secondVersion, false otherwise
   */
  isEarlierThan(firstVersion: string | null | undefined, secondVersion: string): boolean;

  /**
   * Checks if the first version is later than the second version
   * @param firstVersion - The version to check (must be truthy)
   * @param secondVersion - The version to compare against
   * @returns true if firstVersion exists and is later than secondVersion, false otherwise
   */
  isLaterThan(firstVersion: string | null | undefined, secondVersion: string): boolean;
}

/**
 * Version utility singleton instance
 */
export const Version: Version;