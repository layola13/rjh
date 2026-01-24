/**
 * Shared store management module
 * 
 * Provides a centralized storage mechanism for managing shared data across the application.
 * This module maintains a versions array that tracks core-js library metadata.
 */

/**
 * Global shared store interface
 * Used to store and retrieve shared data across modules
 */
interface SharedStore {
  [key: string]: unknown;
  versions?: VersionInfo[];
}

/**
 * Version information for core-js library
 */
interface VersionInfo {
  /** Semantic version number */
  version: string;
  /** Build mode: "pure" for modular builds, "global" for global namespace pollution */
  mode: "pure" | "global";
  /** Copyright notice */
  copyright: string;
  /** License identifier and URL */
  license: string;
  /** Source code repository URL */
  source: string;
}

/**
 * Retrieves or initializes a value in the shared store
 * 
 * @param key - The key to lookup in the shared store
 * @param defaultValue - Default value to set if key doesn't exist
 * @returns The stored value or the newly set default value
 */
export declare function getSharedStoreValue<T = unknown>(
  key: string,
  defaultValue?: T
): T;

/**
 * Checks if the environment is running in "pure" mode
 * Pure mode indicates a modular build without global namespace pollution
 */
export declare const IS_PURE: boolean;

/**
 * Global shared store instance
 * Contains all shared data including the versions array
 */
export declare const sharedStore: SharedStore;

/**
 * Array of version information objects
 * Tracks metadata for different core-js versions loaded in the application
 */
export declare const versions: VersionInfo[];