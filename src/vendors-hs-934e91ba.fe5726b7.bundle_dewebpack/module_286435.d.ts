/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked. The debounced function
 * comes with a `cancel` method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them.
 * 
 * This is a throttle implementation that uses debounce with maxWait option.
 * 
 * @module Throttle
 */

/**
 * Options for configuring throttle behavior
 */
export interface ThrottleOptions {
  /**
   * Specify invoking on the leading edge of the timeout.
   * @default true
   */
  leading?: boolean;
  
  /**
   * Specify invoking on the trailing edge of the timeout.
   * @default true
   */
  trailing?: boolean;
}

/**
 * Debounced function with additional control methods
 */
export interface DebouncedFunc<T extends (...args: any[]) => any> {
  /**
   * Call the original function with debounce applied
   */
  (...args: Parameters<T>): ReturnType<T> | undefined;
  
  /**
   * Cancel any pending function invocations
   */
  cancel(): void;
  
  /**
   * Immediately invoke any pending function invocations
   */
  flush(): ReturnType<T> | undefined;
}

/**
 * Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds.
 * The throttled function comes with a `cancel` method to cancel delayed `func` invocations and a
 * `flush` method to immediately invoke them.
 * 
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to
 * @param options - The options object
 * @param options.leading - Specify invoking on the leading edge of the timeout (default: true)
 * @param options.trailing - Specify invoking on the trailing edge of the timeout (default: true)
 * @returns Returns the new throttled function
 * @throws {TypeError} Throws if `func` is not a function
 * 
 * @example
 * // Throttle window resize handler
 * const throttledResize = throttle(handleResize, 300);
 * window.addEventListener('resize', throttledResize);
 * 
 * @example
 * // Throttle with options
 * const throttled = throttle(saveData, 1000, { leading: false, trailing: true });
 */
export default function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: ThrottleOptions
): DebouncedFunc<T>;