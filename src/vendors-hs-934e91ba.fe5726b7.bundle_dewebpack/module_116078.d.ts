/**
 * Global object reference that works across different JavaScript environments.
 * 
 * This module provides a unified way to access the global object whether running in:
 * - Node.js (global)
 * - Browser (window/self)
 * - Web Workers (self)
 * - Other JavaScript environments
 * 
 * @module GlobalObject
 */

/**
 * Type guard function to check if a value is an object type
 * @param value - The value to check
 * @returns The typeof string for the value
 */
type TypeOfCheck = (value: unknown) => string;

/**
 * Global object interface representing the root global scope
 */
interface GlobalObject {
  Object: ObjectConstructor;
  [key: string]: unknown;
}

/**
 * Self object available in browser and worker contexts
 */
interface SelfGlobal extends GlobalObject {
  self: SelfGlobal;
}

/**
 * Determines and returns the global object for the current JavaScript environment.
 * 
 * Priority order:
 * 1. Node.js global object (from module 639175)
 * 2. Browser/Worker self object
 * 3. Fallback using Function constructor
 * 
 * @returns The global object for the current environment
 */
declare function getGlobalObject(): GlobalObject;

/**
 * The resolved global object instance.
 * This is the primary export that provides access to the global scope.
 */
declare const globalObject: GlobalObject;

export default globalObject;
export { getGlobalObject, GlobalObject, SelfGlobal };