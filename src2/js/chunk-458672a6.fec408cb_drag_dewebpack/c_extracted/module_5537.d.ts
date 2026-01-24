/**
 * Shared storage module for core-js library
 * Provides a global registry for storing and retrieving shared data across modules
 * @module SharedStorage
 */

/**
 * Version information interface
 */
interface VersionInfo {
  /** The version string of core-js */
  version: string;
  /** The mode of operation: 'pure' or 'global' */
  mode: 'pure' | 'global';
  /** Copyright information */
  copyright: string;
}

/**
 * Shared storage object type
 */
interface SharedStorage {
  [key: string]: unknown;
  versions?: VersionInfo[];
}

/**
 * Core-js version configuration
 */
interface CoreJsVersion {
  /** The version string */
  version: string;
}

/**
 * Global window/global object interface
 */
declare const globalObject: Window & typeof globalThis & {
  __core_js_shared__?: SharedStorage;
};

/**
 * Storage key constant for the shared registry
 */
const CORE_JS_SHARED_KEY = '__core-js_shared__';

/**
 * Retrieves or creates a shared storage entry
 * @param key - The key to retrieve from shared storage
 * @param defaultValue - The default value to set if the key doesn't exist
 * @returns The stored value or the default value
 */
declare function getSharedStorage<T = unknown>(
  key: string,
  defaultValue?: T
): T;

/**
 * Shared storage registry
 * Initializes the global shared storage if it doesn't exist
 */
declare const sharedStorage: SharedStorage;

/**
 * Exports the shared storage getter function and initializes version information
 * @param coreJsVersion - The core-js version object
 * @param isPureMode - Whether core-js is running in pure mode
 */
export { getSharedStorage, SharedStorage, VersionInfo, CORE_JS_SHARED_KEY };