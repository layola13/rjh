/**
 * Promise.reject polyfill module
 * Implements the static Promise.reject method for environments that need it
 */

/**
 * Internal utilities for Promise implementation
 */
interface PromiseCapability<T> {
  /** The promise instance */
  promise: Promise<T>;
  /** Function to resolve the promise */
  resolve: (value: T | PromiseLike<T>) => void;
  /** Function to reject the promise */
  reject: (reason?: any) => void;
}

/**
 * Promise capability factory
 */
interface PromiseCapabilityFactory {
  /**
   * Creates a new promise capability object
   * @param constructor - The promise constructor to use
   * @returns A capability object with promise, resolve, and reject
   */
  f<T>(constructor: PromiseConstructor): PromiseCapability<T>;
}

/**
 * Promise constructor configuration options
 */
interface PromiseConstructorConfig {
  /** Whether the constructor polyfill is needed */
  CONSTRUCTOR: boolean;
}

/**
 * Export utilities for polyfills
 */
interface ExportOptions {
  /** The global target object to extend (e.g., "Promise") */
  target: string;
  /** Whether this is a static method */
  stat: boolean;
  /** Whether to force the polyfill even if native support exists */
  forced: boolean;
}

/**
 * Registers a polyfill for Promise.reject
 * @param options - Configuration for the polyfill export
 * @param methods - Object containing the polyfill implementations
 */
declare function registerPolyfill(
  options: ExportOptions,
  methods: Record<string, Function>
): void;

/**
 * Calls a function with specified context and arguments
 * @param fn - The function to call
 * @param context - The this context (void 0 = undefined)
 * @param args - Arguments to pass to the function
 */
declare function callFunction<T>(
  fn: Function,
  context: any,
  ...args: any[]
): T;

/**
 * Gets the promise constructor configuration
 */
declare const promiseConstructorConfig: PromiseConstructorConfig;

/**
 * Factory for creating promise capability objects
 */
declare const promiseCapabilityFactory: PromiseCapabilityFactory;

/**
 * Promise.reject polyfill implementation
 * Creates a Promise that is rejected with the given reason
 * @param reason - The reason why this Promise was rejected
 * @returns A Promise that is rejected with the given reason
 * @template T - The type of the Promise (typically never for rejected promises)
 */
declare function promiseReject<T = never>(this: PromiseConstructor, reason?: any): Promise<T>;

export {
  PromiseCapability,
  PromiseCapabilityFactory,
  PromiseConstructorConfig,
  ExportOptions,
  registerPolyfill,
  callFunction,
  promiseConstructorConfig,
  promiseCapabilityFactory,
  promiseReject
};