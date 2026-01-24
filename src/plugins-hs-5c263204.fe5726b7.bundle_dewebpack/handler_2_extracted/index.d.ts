/**
 * Webpack Bundle Index - Type Definitions
 * 
 * This module provides type declarations for a webpack bundle containing
 * utility functions for getting and managing values.
 */

/**
 * Retrieves a value from a data source.
 * 
 * @template T - The type of the value to retrieve
 * @param key - The key or identifier for the value
 * @param defaultValue - Optional default value if key is not found
 * @returns The retrieved value or default value
 */
export declare function get<T = unknown>(
  key: string,
  defaultValue?: T
): T | undefined;

/**
 * Manages or retrieves a stored value.
 * 
 * @template T - The type of the value
 * @param key - The key or identifier for the value
 * @returns The stored value
 */
export declare function value<T = unknown>(key: string): T | undefined;

/**
 * Configuration options for the bundle modules
 */
export interface BundleOptions {
  /** Enable caching for retrieved values */
  cache?: boolean;
  /** Strict mode for type checking */
  strict?: boolean;
}

/**
 * Bundle module namespace containing all exported functionality
 */
declare namespace Bundle {
  export { get, value };
  export type { BundleOptions };
}

export default Bundle;