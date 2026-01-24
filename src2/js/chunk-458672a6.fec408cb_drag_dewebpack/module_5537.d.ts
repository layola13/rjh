/**
 * Core-JS shared state module
 * Manages a global registry for storing shared data across Core-JS modules
 */

/**
 * Core-JS version information
 */
interface CoreJSVersion {
  /** Current version of Core-JS */
  version: string;
  /** Operating mode: 'pure' (no global pollution) or 'global' (polyfills globals) */
  mode: 'pure' | 'global';
  /** Copyright notice */
  copyright: string;
}

/**
 * Shared state registry
 * Stores data that needs to be shared across different Core-JS modules
 */
interface SharedRegistry {
  /** Version history of Core-JS instances */
  versions?: CoreJSVersion[];
  /** Additional shared data indexed by key */
  [key: string]: unknown;
}

/**
 * Retrieves or initializes a shared value in the global Core-JS registry
 * 
 * @template T - Type of the stored value
 * @param key - Registry key to access
 * @param defaultValue - Default value to set if key doesn't exist
 * @returns The stored or newly initialized value
 */
export declare function getSharedState<T = unknown>(
  key: string,
  defaultValue?: T
): T;

/**
 * Global shared state object
 * Attached to the global object (window/global) to persist across module boundaries
 */
export declare const CORE_JS_SHARED: SharedRegistry;

/**
 * Registry key name used in the global object
 */
export declare const SHARED_KEY = '__core-js_shared__';

/**
 * Current Core-JS version metadata
 */
export declare const versionInfo: CoreJSVersion;