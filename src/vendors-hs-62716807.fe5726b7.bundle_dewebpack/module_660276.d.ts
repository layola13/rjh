/**
 * Promise.prototype.catch polyfill module
 * 
 * This module provides a polyfill for the Promise.prototype.catch method,
 * ensuring compatibility across different environments and Promise implementations.
 * 
 * @module PromiseCatchPolyfill
 */

/**
 * Callback function to handle rejected promises
 * 
 * @template TResult
 * @param reason - The rejection reason
 * @returns A value or promise to resolve with
 */
type RejectionHandler<TResult = any> = (reason: any) => TResult | PromiseLike<TResult>;

/**
 * Extended Promise interface with catch method
 * 
 * @template T - The type of the promise resolution value
 */
interface PromiseWithCatch<T> {
  /**
   * Attaches a callback for only the rejection of the Promise.
   * 
   * @template TResult - The type of the result from the rejection handler
   * @param onRejected - The callback to execute when the Promise is rejected
   * @returns A Promise for the completion of the callback
   */
  catch<TResult = never>(
    onRejected?: RejectionHandler<TResult> | null | undefined
  ): Promise<T | TResult>;
}

/**
 * Options for redefining property behavior
 */
interface PropertyRedefinitionOptions {
  /** If true, allows unsafe property redefinition */
  unsafe?: boolean;
}

/**
 * Module exports interface for polyfill registration
 */
interface PolyfillExportOptions {
  /** The target object or constructor to polyfill */
  target: string;
  /** If true, adds methods to the prototype */
  proto?: boolean;
  /** If true, forces polyfill even if native implementation exists */
  forced?: boolean;
  /** If true, marks this as a real/standard feature */
  real?: boolean;
}

/**
 * Type definition for the export registration function
 */
type ExportFunction = (
  options: PolyfillExportOptions,
  methods: Record<string, Function>
) => void;

/**
 * Type definition for the get built-in function
 */
type GetBuiltInFunction = (name: string) => any;

/**
 * Type definition for the redefine function
 */
type RedefineFunction = (
  target: any,
  key: string,
  value: any,
  options?: PropertyRedefinitionOptions
) => void;

/**
 * Type definition for callable check function
 */
type IsCallableFunction = (value: any) => value is Function;

/**
 * Configuration flags for Promise constructor state
 */
interface PromiseConstructorConfig {
  /** Indicates if the Promise constructor needs polyfilling */
  CONSTRUCTOR: boolean;
}

export {};