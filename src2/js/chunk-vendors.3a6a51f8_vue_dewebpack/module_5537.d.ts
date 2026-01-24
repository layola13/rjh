/**
 * Core-JS shared storage module
 * Provides a global registry for storing and retrieving shared data across core-js modules
 */

import type { CoreJSVersion } from './module_8378';

/**
 * Shared storage object interface
 * Contains all shared data registered by core-js modules
 */
interface SharedStorage {
  [key: string]: unknown;
  versions?: VersionEntry[];
}

/**
 * Version entry stored in the shared registry
 */
interface VersionEntry {
  /** Core-JS version string */
  version: string;
  /** Module mode: "pure" for isolated usage, "global" for global polyfills */
  mode: 'pure' | 'global';
  /** Copyright notice */
  copyright: string;
}

/**
 * Retrieves or initializes a value in the shared storage
 * @param key - Storage key to access
 * @param defaultValue - Default value to set if key doesn't exist
 * @returns The stored or newly set value
 */
type GetOrSetShared = <T = unknown>(key: string, defaultValue?: T) => T;

/**
 * Global shared storage key
 */
const SHARED_STORAGE_KEY = '__core-js_shared__';

/**
 * Global object reference (window in browsers, global in Node.js)
 */
declare const global: typeof globalThis;

/**
 * Gets or creates the global shared storage
 */
const sharedStorage: SharedStorage = global[SHARED_STORAGE_KEY] ?? (global[SHARED_STORAGE_KEY] = {});

/**
 * Core-JS shared storage accessor
 * @param key - The storage key
 * @param defaultValue - Optional default value if key doesn't exist
 * @returns The stored value or default
 */
export const getOrSetShared: GetOrSetShared = <T = unknown>(
  key: string,
  defaultValue?: T
): T => {
  return (sharedStorage[key] as T) ?? (sharedStorage[key] = defaultValue ?? ({} as T)) as T;
};

/**
 * Core-JS version information
 */
import { version as coreJSVersion } from './module_8378';
import { isPureMode } from './module_2d00';

const versions = getOrSetShared<VersionEntry[]>('versions', []);

versions.push({
  version: coreJSVersion,
  mode: isPureMode ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

export default getOrSetShared;