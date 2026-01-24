/**
 * Promise.prototype.finally polyfill module
 * 
 * Adds the `finally` method to the Promise prototype, ensuring cleanup logic
 * can execute regardless of promise settlement (fulfilled or rejected).
 * 
 * @module PromiseFinallyPolyfill
 */

/**
 * Type definition for the export function that registers the Promise.finally polyfill
 */
declare module 'promise-finally-polyfill' {
  /**
   * Registers the Promise.finally method on the Promise prototype
   * 
   * @param exportTarget - The export/module system target object
   * @param moduleExports - The module exports object
   * @param requireFn - The module require function
   */
  export default function registerPromiseFinally(
    exportTarget: unknown,
    moduleExports: unknown,
    requireFn: (moduleId: string) => unknown
  ): void;
}

/**
 * Export utility function type (from module 5ca1)
 * Used to attach methods to constructors with specific flags
 */
interface ExportUtility {
  /**
   * Prototype flag - adds method to prototype
   */
  readonly P: number;
  
  /**
   * Forced/Replace flag - forces polyfill even if method exists
   */
  readonly R: number;
  
  /**
   * Export function that attaches methods to target
   * 
   * @param flags - Combination of export flags (P, R, S, F, G)
   * @param targetName - Name of the global constructor (e.g., 'Promise')
   * @param methods - Object containing methods to attach
   */
  (flags: number, targetName: string, methods: Record<string, unknown>): void;
}

/**
 * Core-js utilities object (from module 8378)
 */
interface CoreJSUtilities {
  /**
   * Reference to the Promise constructor
   */
  Promise?: PromiseConstructor;
}

/**
 * Species constructor resolver (from module ebd6)
 * Gets the appropriate constructor considering Symbol.species
 * 
 * @param instance - The instance to get the constructor from
 * @param defaultConstructor - Fallback constructor if species is not defined
 * @returns The resolved constructor function
 */
type SpeciesConstructor = <T>(
  instance: unknown,
  defaultConstructor: new (...args: unknown[]) => T
) => new (...args: unknown[]) => T;

/**
 * Promise resolution utility (from module bcaa)
 * Wraps a value in a promise using the specified constructor
 * 
 * @param constructor - The Promise constructor to use
 * @param value - The value to wrap or promise-returning function
 * @returns A new promise
 */
type PromiseResolve = <T>(
  constructor: PromiseConstructor,
  value: T | PromiseLike<T>
) => Promise<T>;

/**
 * Callback function for Promise.finally
 * Executes regardless of promise outcome (fulfilled or rejected)
 */
type FinallyCallback = () => void | PromiseLike<void>;

/**
 * Extended Promise interface with the finally method
 */
declare global {
  interface Promise<T> {
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected).
     * The resolved value or rejection reason cannot be modified from the callback.
     * 
     * @param onFinally - Callback to execute when the Promise settles
     * @returns A new Promise that resolves or rejects with the original value/reason
     * 
     * @example
     *