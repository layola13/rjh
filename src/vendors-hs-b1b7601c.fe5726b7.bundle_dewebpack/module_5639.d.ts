/**
 * Global object reference that works across different JavaScript environments.
 * 
 * @remarks
 * This module provides a consistent way to access the global object across:
 * - Node.js (global)
 * - Browser (self/window)
 * - Web Workers (self)
 * - Any other environment
 * 
 * The resolution follows this priority:
 * 1. Previously resolved global from module 1957
 * 2. Browser/Worker self object
 * 3. Fallback using Function constructor
 * 
 * @module GlobalObjectResolver
 */

/**
 * Type guard to check if a value is an object with Object constructor
 */
type GlobalCandidate = {
  Object: ObjectConstructor;
  [key: string]: unknown;
};

/**
 * Determines if the given value is a valid global object candidate
 * 
 * @param value - The value to check
 * @returns True if value is an object with Object property matching the native Object constructor
 */
declare function isValidGlobalObject(value: unknown): value is GlobalCandidate;

/**
 * The global object reference from another module (fallback priority 1)
 */
declare const previousGlobal: typeof globalThis | undefined;

/**
 * Browser/Worker self reference (fallback priority 2)
 */
declare const selfGlobal: (typeof globalThis & { Object: ObjectConstructor }) | undefined;

/**
 * The resolved global object that works across all JavaScript environments
 * 
 * @public
 */
declare const globalObject: typeof globalThis;

export = globalObject;