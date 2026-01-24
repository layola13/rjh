/**
 * Core-JS shared storage module.
 * 
 * This module provides access to the global shared state used by Core-JS polyfills.
 * It ensures a single shared storage space across all Core-JS modules by either
 * retrieving an existing instance or creating a new one.
 * 
 * @module CoreJSShared
 */

/**
 * The global key used to store the shared Core-JS state.
 * @internal
 */
declare const SHARED_KEY: "__core-js_shared__";

/**
 * Shared storage object used by Core-JS polyfills.
 * Contains internal state and data shared across all Core-JS modules.
 */
interface CoreJSShared {
  [key: string]: unknown;
}

/**
 * Global object (window in browser, global in Node.js).
 */
interface GlobalObject {
  [key: string]: unknown;
  __core_js_shared__?: CoreJSShared;
}

/**
 * Defines a property on the global object.
 * 
 * @param key - The property key to define
 * @param value - The value to assign to the property
 * @returns The value that was set
 */
declare function defineGlobalProperty(
  key: string,
  value: CoreJSShared
): CoreJSShared;

/**
 * Retrieves the global object (cross-platform).
 * 
 * @returns The global object (window, global, or globalThis)
 */
declare function getGlobalObject(): GlobalObject;

/**
 * The shared Core-JS storage instance.
 * 
 * This is either retrieved from the global object if it already exists,
 * or created and registered globally if it doesn't exist yet.
 * 
 * @example
 *