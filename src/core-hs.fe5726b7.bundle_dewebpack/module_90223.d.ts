/**
 * Polyfill detection module for ArrayBuffer extensibility.
 * 
 * This module checks if ArrayBuffer objects can have properties defined on them.
 * It's used to detect environments where Object.defineProperty fails on ArrayBuffer instances.
 * 
 * @module ArrayBufferExtensibilityCheck
 */

/**
 * Function type that performs the ArrayBuffer extensibility check.
 * Returns true if the check fails (polyfill is needed), false otherwise.
 */
type PolyfillCheckFunction = () => boolean;

/**
 * Higher-order function that wraps polyfill detection logic.
 * Typically used by polyfill frameworks to conditionally apply fixes.
 * 
 * @param checkFn - The function that performs the actual polyfill check
 * @returns The result of the polyfill check, or undefined if no polyfill is needed
 */
declare function polyfillWrapper(checkFn: PolyfillCheckFunction): boolean | undefined;

/**
 * Checks if ArrayBuffer instances can be extended with custom properties.
 * 
 * This detection is important for environments where:
 * - ArrayBuffer may be a host object with restricted property assignment
 * - Object.defineProperty might throw on certain built-in types
 * 
 * @returns True if a polyfill is needed (property definition failed), false otherwise
 */
declare const arrayBufferExtensibilityCheck: boolean | undefined;

export = arrayBufferExtensibilityCheck;