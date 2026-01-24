/**
 * Iterator Protocol Implementation
 * 
 * This module provides a polyfill for the Iterator protocol,
 * ensuring consistent behavior across different JavaScript environments.
 * It handles Safari's buggy iterator implementation.
 */

/**
 * The standard iterator prototype object.
 * Serves as the base prototype for all iterators in the system.
 */
export const IteratorPrototype: object;

/**
 * Flag indicating whether the environment has Safari's buggy iterator implementation.
 * 
 * Safari has known issues with iterator protocol:
 * - Array iterator prototype chain is broken
 * - Iterator methods may not return the correct context
 * 
 * @remarks
 * This flag is set to `true` if:
 * - Array.prototype.keys() exists but doesn't have a "next" property in its prototype chain
 * 
 * @example
 *