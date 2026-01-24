/**
 * Creates a debounced function that delays invoking the provided function until after
 * `wait` milliseconds have elapsed since the last time the debounced function was invoked.
 * 
 * The debounced function comes with a `cancel` method to cancel delayed invocations
 * and a `flush` method to immediately invoke them.
 * 
 * @module Debounce
 */

/**
 * Options for configuring the debounce behavior
 */
export interface DebounceOptions {
  /**
   * Specify invoking on the leading edge of the timeout.
   * @defaultValue false
   */
  leading?: boolean;

  /**
   * The maximum time the function is allowed to be delayed before it's invoked.
   * If specified, the function will be invoked at most once per `maxWait` milliseconds.
   */
  maxWait?: number;

  /**
   * Specify invoking on the trailing edge of the timeout.
   * @defaultValue true
   */
  trailing?: boolean;
}

/**
 * A debounced function with additional control methods
 * 
 * @template T - The type of the original function
 */
export interface DebouncedFunction<T extends (...args: any[]) => any> {
  /**
   * Invokes the debounced function
   */
  (...args: Parameters<T>): ReturnType<T> | undefined;

  /**
   * Cancels any pending invocations of the debounced function
   */
  cancel(): void;

  /**
   * Immediately invokes any pending invocation of the debounced function
   * @returns The result of the last invocation
   */
  flush(): ReturnType<T> | undefined;
}

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was invoked.
 * 
 * @template T - The type of the function to debounce
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param options - The options object to configure debounce behavior
 * @returns Returns the new debounced function
 * @throws {TypeError} Throws if `func` is not a function
 * 
 * @example
 *