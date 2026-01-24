/**
 * Promise.resolve polyfill module
 * 
 * Implements the Promise.resolve static method with proper species constructor handling.
 * This module provides a polyfill for environments lacking native Promise.resolve support
 * or where the CONSTRUCTOR flag indicates a broken implementation.
 * 
 * @module PromiseResolve
 */

/**
 * Options for exporting a polyfill to the global environment
 */
interface ExportOptions {
  /** Target object or constructor to attach the method to (e.g., "Promise") */
  target: string;
  /** Whether this is a static method */
  stat: boolean;
  /** Whether to force override existing implementation */
  forced: boolean;
}

/**
 * Descriptor for methods being polyfilled
 */
interface MethodDescriptor {
  /** The resolve method implementation */
  resolve: (value: unknown) => Promise<unknown>;
}

/**
 * Promise constructor type with proper typing
 */
interface PromiseConstructor {
  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: unknown) => void) => void): Promise<T>;
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

/**
 * Exports a polyfill method to the global scope
 * 
 * @param options - Configuration for the export
 * @param methods - Object containing the methods to export
 */
declare function exportPolyfill(options: ExportOptions, methods: MethodDescriptor): void;

/**
 * Gets a native constructor by name
 * 
 * @param name - The constructor name to retrieve
 * @returns The constructor function
 */
declare function getNativeConstructor(name: string): PromiseConstructor;

/**
 * Checks if the environment needs the polyfill
 * 
 * @returns true if Promise.resolve is missing or broken
 */
declare function needsPolyfill(): boolean;

/**
 * Checks if the CONSTRUCTOR flag is set (indicating broken implementation)
 * 
 * @returns true if the constructor is broken
 */
declare function hasConstructorFlag(): boolean;

/**
 * Creates a promise resolved with the given value using the appropriate constructor
 * 
 * @param constructor - The Promise constructor to use
 * @param value - The value to resolve with
 * @returns A promise resolved with the value
 */
declare function promiseResolve<T>(constructor: PromiseConstructor, value: T | PromiseLike<T>): Promise<T>;

/**
 * Native Promise constructor reference
 */
declare const NativePromise: PromiseConstructor;

/**
 * Whether to use native constructor directly (polyfill needed and not broken constructor)
 */
declare const useNativeDirectly: boolean;

/**
 * Promise.resolve polyfill implementation
 * 
 * Resolves a value to a Promise, with proper handling of the species constructor.
 * If called on the native Promise constructor in a working environment, uses the
 * optimized path. Otherwise, uses the provided constructor (this value).
 * 
 * @param this - The constructor to use (Promise or subclass)
 * @param value - The value to resolve
 * @returns A Promise resolved with the given value
 * 
 * @example
 *