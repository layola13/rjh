/**
 * Promise.all Constructor Feature Detection
 * 
 * Detects whether the environment properly supports Promise.all with constructor behavior.
 * Tests if Promise.all correctly handles rejection callbacks.
 * 
 * @module PromiseAllConstructorDetection
 */

/**
 * Promise utilities interface
 * Provides core Promise static methods
 */
interface PromiseUtils {
  /**
   * Creates a Promise that resolves when all of the provided promises resolve,
   * or rejects with the reason of the first promise that rejects
   * 
   * @param values - An iterable of promises or values
   * @returns A new Promise
   */
  all<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]>;
}

/**
 * Feature detection utility
 * Tests whether a callback function throws an error or exhibits unexpected behavior
 * 
 * @param callback - The test function to execute
 * @returns true if the callback fails/throws, false if it succeeds
 */
type FeatureDetector = (callback: (testValue: any) => void) => boolean;

/**
 * Constructor configuration object
 * Contains flags indicating whether certain constructor patterns are supported
 */
interface ConstructorConfig {
  /**
   * Indicates whether the CONSTRUCTOR pattern is available/supported
   * in the current environment
   */
  readonly CONSTRUCTOR: boolean;
}

/**
 * Exported module result
 * 
 * Returns true if:
 * - CONSTRUCTOR flag is explicitly set, OR
 * - Promise.all properly handles rejection with empty callbacks
 * 
 * Returns false if Promise.all fails the feature detection test
 */
declare const promiseAllConstructorSupported: boolean;

export = promiseAllConstructorSupported;