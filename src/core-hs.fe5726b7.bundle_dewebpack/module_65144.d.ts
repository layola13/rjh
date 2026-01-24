/**
 * Core-JS shared storage module
 * 
 * Provides access to the global shared state object used by core-js polyfills.
 * This module either retrieves an existing shared storage from the global object
 * or creates a new one if it doesn't exist.
 * 
 * @module CoreJSShared
 */

/**
 * The name of the global property used to store core-js shared state
 */
declare const CORE_JS_SHARED_KEY = "__core-js_shared__";

/**
 * Represents the global object (window in browsers, global in Node.js)
 */
declare const globalObject: typeof globalThis;

/**
 * Creates and initializes a shared storage object on the global scope
 * 
 * @param key - The property name to set on the global object
 * @param value - The initial value to assign to the shared storage
 * @returns The shared storage object
 */
declare function defineSharedStorage(key: string, value: Record<string, unknown>): Record<string, unknown>;

/**
 * The core-js shared storage object.
 * Contains shared state and utilities used across core-js polyfills.
 */
declare const coreJSShared: Record<string, unknown>;

export = coreJSShared;