/**
 * Core-JS shared internal state module
 * 
 * This module exports the shared internal state object used across core-js polyfills.
 * The shared state allows different core-js modules to communicate and share data.
 * 
 * @module CoreJSShared
 */

/**
 * Shared internal state object for core-js
 * 
 * This object contains shared state and utilities used by various core-js polyfill implementations.
 * It is stored globally to ensure consistency across different module instances.
 */
declare const coreJsShared: unknown;

export = coreJsShared;