/**
 * Global scope accessor module
 * 
 * This module provides a safe way to access the global object across different JavaScript environments
 * (browser, Node.js, Web Workers, etc.). It attempts multiple strategies to obtain the global scope.
 * 
 * @module GlobalScope
 */

/**
 * Represents the global object in the current JavaScript runtime environment.
 * 
 * In browsers: window
 * In Node.js: global
 * In Web Workers: self
 * In modern environments: globalThis
 */
declare const globalScope: typeof globalThis;

export = globalScope;

/**
 * Type definition for the global scope object
 * 
 * @remarks
 * This type represents the unified global object that exists in all JavaScript environments.
 * The actual implementation tries three methods to access it:
 * 1. Direct `this` reference (works in non-strict mode)
 * 2. Function constructor evaluation (fallback method)
 * 3. Window object (browser-specific fallback)
 * 
 * @example
 *