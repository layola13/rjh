/**
 * Re-export module that forwards all exports from module 9362
 * This module uses interop helpers to handle ES modules and CommonJS compatibility
 */

/**
 * Default export from the underlying module (module 9362)
 * The actual type depends on what module 9362 exports
 */
declare const _default: any;
export default _default;

/**
 * Named exports are re-exported from module 9362
 * All properties except 'default' and '__esModule' are forwarded
 */
export * from './module_9362';

/**
 * Type definition for the interop require function
 * Handles importing modules with proper ES module and CommonJS compatibility
 * 
 * @template T - The module type being imported
 * @param module - The module to import
 * @param useDefault - Whether to use the default export cache
 * @returns The imported module with proper structure
 */
type InteropRequireWildcard<T = any> = (
  module: T,
  useDefault?: boolean
) => T & { default: T };

/**
 * Type definition for the WeakMap cache factory
 * Creates separate caches for default and named exports
 * 
 * @param useDefault - Whether to return the default export cache
 * @returns A WeakMap for caching module references
 */
type GetWeakMapCache = (useDefault: boolean) => WeakMap<any, any> | null;

/**
 * ES Module marker
 * Indicates this module uses ES module syntax
 */
export const __esModule: true;