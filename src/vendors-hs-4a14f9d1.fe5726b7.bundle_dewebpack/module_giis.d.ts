/**
 * SetImmediate Polyfill Type Definitions
 * Provides cross-platform asynchronous execution scheduling
 * 
 * This polyfill implements setImmediate for environments that don't natively support it.
 * It automatically selects the most efficient scheduling mechanism available:
 * - Node.js process.nextTick
 * - postMessage (browsers with message channel support)
 * - MessageChannel API
 * - Script onreadystatechange (legacy IE)
 * - setTimeout fallback
 */

/**
 * Callback function type that can be scheduled with setImmediate
 */
type ImmediateCallback = (...args: unknown[]) => void;

/**
 * Represents a handle (numeric identifier) for a scheduled immediate task
 */
type ImmediateHandle = number;

/**
 * Internal task object structure for queued immediate callbacks
 */
interface ImmediateTask {
  /** The callback function to execute */
  callback: ImmediateCallback;
  /** Arguments to pass to the callback when executed */
  args: unknown[];
}

/**
 * Global namespace augmentation for setImmediate/clearImmediate
 */
declare global {
  /**
   * Schedules a callback to execute asynchronously after the current event loop phase
   * 
   * @param callback - The function to execute
   * @param args - Optional arguments to pass to the callback
   * @returns A numeric handle that can be used with clearImmediate to cancel execution
   * 
   * @example
   * const handle = setImmediate(() => {
   *   console.log('Executed asynchronously');
   * });
   * 
   * @example
   * setImmediate((msg: string, count: number) => {
   *   console.log(msg, count);
   * }, 'Hello', 42);
   */
  function setImmediate(
    callback: ImmediateCallback,
    ...args: unknown[]
  ): ImmediateHandle;

  /**
   * Cancels a scheduled immediate callback before it executes
   * 
   * @param handle - The handle returned by setImmediate
   * 
   * @example
   * const handle = setImmediate(() => console.log('This will not run'));
   * clearImmediate(handle);
   */
  function clearImmediate(handle: ImmediateHandle): void;

  interface Window {
    /**
     * Window-scoped setImmediate function
     * @see setImmediate
     */
    setImmediate?: typeof setImmediate;

    /**
     * Window-scoped clearImmediate function
     * @see clearImmediate
     */
    clearImmediate?: typeof clearImmediate;
  }
}

/**
 * Module exports (when used as a CommonJS/ES module)
 */
export {};