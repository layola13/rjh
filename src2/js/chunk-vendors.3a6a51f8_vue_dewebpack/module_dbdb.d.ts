/**
 * Core-JS shared storage module
 * Provides a global registry for storing and retrieving shared data across modules
 */

/**
 * Configuration information for a Core-JS version entry
 */
interface CoreJSVersionEntry {
  /** The version string of Core-JS */
  version: string;
  /** The mode in which Core-JS is running: "pure" or "global" */
  mode: 'pure' | 'global';
  /** Copyright notice */
  copyright: string;
}

/**
 * Shared storage object that holds various Core-JS data
 */
interface SharedStorage {
  /** Array of version entries */
  versions?: CoreJSVersionEntry[];
  /** Index signature for other dynamic properties */
  [key: string]: unknown;
}

/**
 * Global window/global object interface extension
 */
declare global {
  interface Window {
    /** Core-JS shared storage namespace */
    '__core-js_shared__'?: SharedStorage;
  }
}

/**
 * Gets or creates a shared storage entry
 * @param key - The key to retrieve or create in shared storage
 * @param defaultValue - Optional default value to set if key doesn't exist
 * @returns The stored value or the newly created default value
 */
export declare function getSharedStorage<T = unknown>(
  key: string,
  defaultValue?: T
): T;

/**
 * The global shared storage object
 */
export declare const sharedStorage: SharedStorage;

/**
 * Array of Core-JS version information entries
 */
export declare const versions: CoreJSVersionEntry[];