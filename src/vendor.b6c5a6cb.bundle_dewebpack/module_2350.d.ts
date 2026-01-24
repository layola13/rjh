/**
 * Polyfill module for missing browser APIs and features
 * Provides compatibility shims for Promise, Object.assign, performance API,
 * requestAnimationFrame, Math.sign, Number.isInteger, and TypedArrays
 * 
 * @module polyfill
 * @version 5.2.4
 * @license MIT
 */

/**
 * Global context type (window, globalThis, self, or global)
 */
type GlobalContext = typeof globalThis & {
  performance?: Performance;
  requestAnimationFrame?: (callback: FrameRequestCallback) => number;
  cancelAnimationFrame?: (handle: number) => void;
  Promise?: PromiseConstructor;
  ArrayBuffer?: ArrayBufferConstructor;
  Float32Array?: Float32ArrayConstructor;
  Uint32Array?: Uint32ArrayConstructor;
  Uint16Array?: Uint16ArrayConstructor;
  Uint8Array?: Uint8ArrayConstructor;
  Int32Array?: Int32ArrayConstructor;
};

/**
 * Performance API interface
 */
interface Performance {
  /**
   * Returns high-resolution timestamp in milliseconds
   */
  now(): number;
}

/**
 * Polyfill for Promise if not natively supported
 */
export declare const PromisePolyfill: PromiseConstructor;

/**
 * Polyfill for Object.assign if not natively supported
 * Copies properties from source objects to target object
 * 
 * @param target - The target object to copy properties to
 * @param sources - Source objects to copy properties from
 * @returns The target object with merged properties
 */
export declare function objectAssignPolyfill<T, U>(
  target: T,
  source: U
): T & U;
export declare function objectAssignPolyfill<T, U, V>(
  target: T,
  source1: U,
  source2: V
): T & U & V;
export declare function objectAssignPolyfill<T, U, V, W>(
  target: T,
  source1: U,
  source2: V,
  source3: W
): T & U & V & W;
export declare function objectAssignPolyfill(
  target: object,
  ...sources: unknown[]
): unknown;

/**
 * Polyfill for Date.now() if not natively supported
 * Returns current timestamp in milliseconds
 */
export declare function dateNowPolyfill(): number;

/**
 * Polyfill for performance.now() if not natively supported
 * Returns high-resolution time relative to page load
 */
export declare function performanceNowPolyfill(): number;

/**
 * Callback function for requestAnimationFrame
 * @param time - High-resolution timestamp in milliseconds
 */
type FrameRequestCallback = (time: number) => void;

/**
 * Polyfill for requestAnimationFrame if not natively supported
 * Schedules a callback to be executed before the next repaint
 * 
 * @param callback - Function to call before next repaint
 * @returns Request ID that can be used to cancel the callback
 * @throws {TypeError} If callback is not a function
 */
export declare function requestAnimationFramePolyfill(
  callback: FrameRequestCallback
): number;

/**
 * Polyfill for cancelAnimationFrame if not natively supported
 * Cancels a scheduled animation frame request
 * 
 * @param handle - The ID returned by requestAnimationFrame
 */
export declare function cancelAnimationFramePolyfill(handle: number): void;

/**
 * Polyfill for Math.sign() if not natively supported
 * Returns the sign of a number (-1, 0, or 1)
 * 
 * @param x - A numeric value
 * @returns -1 if negative, 1 if positive, 0 or NaN if zero or NaN
 */
export declare function mathSignPolyfill(x: number): number;

/**
 * Polyfill for Number.isInteger() if not natively supported
 * Determines whether the passed value is an integer
 * 
 * @param value - The value to test
 * @returns true if value is an integer, false otherwise
 */
export declare function isIntegerPolyfill(value: unknown): value is number;

/**
 * Vendor prefixes used for browser-specific APIs
 */
export declare const VENDOR_PREFIXES: readonly ["ms", "moz", "webkit", "o"];

/**
 * Default frame time in milliseconds (16ms ≈ 60fps)
 */
export declare const DEFAULT_FRAME_TIME: 16;

/**
 * Initialize all polyfills for the current environment
 * This function is automatically executed when the module loads
 */
export declare function initializePolyfills(): void;