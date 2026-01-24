/**
 * Promise.prototype.finally polyfill module
 * 
 * Adds the `finally` method to Promise prototype, allowing cleanup operations
 * that execute regardless of promise resolution or rejection.
 * 
 * @module PromiseFinallyPolyfill
 * @dependencies
 * - 63b6: Core export utilities
 * - 584a: Global object reference
 * - e53d: Fallback Promise implementation
 * - f201: Species constructor resolver
 * - cd78: Promise resolver utility
 */

/**
 * Core export utility for polyfills
 */
declare module "63b6" {
  export interface ExportTarget {
    /** Prototype method flag */
    P: number;
    /** Runtime/required flag */
    R: number;
  }
  
  /**
   * Exports a method to a target constructor
   * @param flags - Export configuration flags
   * @param target - Target constructor name
   * @param methods - Methods to export
   */
  export default function exportPolyfill(
    flags: number,
    target: string,
    methods: Record<string, unknown>
  ): void;
}

/**
 * Global object with native constructors
 */
declare module "584a" {
  export interface GlobalObject {
    Promise?: PromiseConstructor;
  }
  
  export const global: GlobalObject;
}

/**
 * Fallback Promise implementation
 */
declare module "e53d" {
  export const Promise: PromiseConstructor;
}

/**
 * Resolves the species constructor for a given instance
 */
declare module "f201" {
  /**
   * Gets the constructor for creating derived promises
   * @param instance - Promise instance
   * @param defaultConstructor - Fallback constructor
   * @returns Constructor to use for creating new promises
   */
  export default function speciesConstructor<T>(
    instance: Promise<T>,
    defaultConstructor: PromiseConstructor
  ): PromiseConstructor;
}

/**
 * Promise resolver utility
 */
declare module "cd78" {
  /**
   * Resolves a value using the given promise constructor
   * @param constructor - Promise constructor to use
   * @param value - Value or promise to resolve
   * @returns A promise resolving to the value
   */
  export default function promiseResolve<T>(
    constructor: PromiseConstructor,
    value: T | PromiseLike<T>
  ): Promise<T>;
}

/**
 * Extends Promise.prototype with the finally method
 */
declare global {
  interface Promise<T> {
    /**
     * Executes a callback when the promise settles (resolves or rejects),
     * regardless of the outcome. The callback receives no arguments.
     * 
     * @param onFinally - Callback invoked when promise settles
     * @returns A new promise that resolves/rejects with the original value/reason
     * 
     * @example
     *