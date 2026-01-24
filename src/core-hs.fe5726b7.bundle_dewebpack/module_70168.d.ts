/**
 * Cross-platform timer implementation module
 * Provides setImmediate and clearImmediate polyfills for environments that don't natively support them.
 * This module implements various fallback strategies depending on the available platform APIs.
 */

/**
 * Global object reference (window in browsers, global in Node.js)
 */
declare const globalObject: Window & typeof globalThis;

/**
 * Callback function type that can be executed by setImmediate
 */
type ImmediateCallback = (...args: unknown[]) => void;

/**
 * Handle returned by setImmediate, used to cancel scheduled callbacks
 */
type ImmediateHandle = number;

/**
 * Map storing pending immediate callbacks indexed by their handle ID
 */
interface ImmediateCallbackRegistry {
  [handle: number]: () => void;
}

/**
 * Location object from the global scope (browser environments)
 */
interface LocationInfo {
  protocol: string;
  host: string;
}

/**
 * Schedules a callback to be executed asynchronously as soon as possible.
 * This is similar to setTimeout(fn, 0) but with better performance characteristics.
 * 
 * @param callback - The function to be executed
 * @param args - Optional arguments to pass to the callback
 * @returns A handle that can be used to cancel the scheduled callback
 * 
 * @example
 * const handle = setImmediate(() => {
 *   console.log('Executed asynchronously');
 * });
 */
export function set(callback: ImmediateCallback, ...args: unknown[]): ImmediateHandle;

/**
 * Cancels a callback that was scheduled with setImmediate.
 * If the callback has already been executed or the handle is invalid, this is a no-op.
 * 
 * @param handle - The handle returned by setImmediate
 * 
 * @example
 * const handle = setImmediate(() => {
 *   console.log('This will not execute');
 * });
 * clear(handle);
 */
export function clear(handle: ImmediateHandle): void;

/**
 * Internal: Registry of callbacks waiting to be executed
 * @internal
 */
declare const callbackRegistry: ImmediateCallbackRegistry;

/**
 * Internal: Counter for generating unique handle IDs
 * @internal
 */
declare let handleCounter: number;

/**
 * Internal: Location information (browser environments only)
 * @internal
 */
declare let locationInfo: LocationInfo | undefined;

/**
 * Internal: Function reference to schedule immediate execution
 * This variable holds the actual scheduling implementation chosen based on available platform APIs:
 * - process.nextTick (Node.js)
 * - Dispatch.now (IE)
 * - MessageChannel (modern browsers)
 * - postMessage (browsers with cross-origin messaging)
 * - onreadystatechange (legacy IE)
 * - setTimeout (ultimate fallback)
 * @internal
 */
declare let scheduleImmediate: (handle: ImmediateHandle) => void;

/**
 * Internal: Executes and removes a callback from the registry
 * @internal
 */
declare function runCallback(handle: ImmediateHandle): void;

/**
 * Internal: Creates a closure that executes a specific callback
 * @internal
 */
declare function makeCallbackRunner(handle: ImmediateHandle): () => void;

/**
 * Internal: Message event handler for postMessage-based implementation
 * @internal
 */
declare function handleMessage(event: MessageEvent): void;

/**
 * Internal: postMessage-based scheduler (browser environments)
 * @internal
 */
declare function scheduleViaPostMessage(handle: ImmediateHandle): void;

/**
 * Module exports
 * Provides set (setImmediate) and clear (clearImmediate) functions
 */
declare const exports: {
  /** Alias for setImmediate */
  set: typeof set;
  /** Alias for clearImmediate */
  clear: typeof clear;
};

export default exports;