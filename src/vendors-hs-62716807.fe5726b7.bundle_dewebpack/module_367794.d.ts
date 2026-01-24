/**
 * Shared store module for core-js version information
 * Manages a versioned registry of library metadata
 */

/**
 * Library version metadata
 */
interface VersionInfo {
  /** Semantic version string */
  version: string;
  /** Build mode: "pure" for modular builds, "global" for global pollution */
  mode: 'pure' | 'global';
  /** Copyright notice */
  copyright: string;
  /** SPDX license identifier or URL */
  license: string;
  /** Source repository URL */
  source: string;
}

/**
 * Shared store interface for storing global state
 */
interface SharedStore {
  /** Version history array */
  versions?: VersionInfo[];
  [key: string]: unknown;
}

/**
 * Module dependencies (external)
 */
declare const IS_PURE: boolean; // from module 700846
declare const SHARED_STORE: SharedStore; // from module 497886

/**
 * Retrieves or initializes a shared store entry by key
 * 
 * @param key - The store key to access
 * @param defaultValue - Default value if key doesn't exist
 * @returns The stored value or newly created default
 */
declare function getSharedEntry<T>(key: string, defaultValue: T): T;

/**
 * Registers the current core-js version metadata in the shared versions array
 * 
 * @returns Array of all registered version metadata entries
 */
declare function registerVersion(): VersionInfo[];

export type { VersionInfo, SharedStore };
export { getSharedEntry, registerVersion };