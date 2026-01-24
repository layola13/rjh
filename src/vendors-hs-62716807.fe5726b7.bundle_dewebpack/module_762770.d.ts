/**
 * Cross-browser requestAnimationFrame polyfill with cancellation support.
 * Provides a unified interface for requesting animation frames across different browsers.
 * Falls back to setTimeout-based implementation if native requestAnimationFrame is unavailable.
 * @module AnimationFrame
 */

/**
 * Type definition for the animation frame request function.
 * @param callback - The function to call when it's time to update your animation for the next repaint
 * @returns A unique identifier for the animation frame request
 */
type RequestAnimationFrameFn = (callback: FrameRequestCallback) => number;

/**
 * Type definition for the animation frame cancellation function.
 * @param id - The identifier returned by the corresponding requestAnimationFrame call
 */
type CancelAnimationFrameFn = (id: number) => void;

/**
 * Combined animation frame utility with request and cancel capabilities.
 */
interface AnimationFrameUtil extends RequestAnimationFrameFn {
  /**
   * Cancels an animation frame request previously scheduled through this utility.
   * @param id - The identifier returned by the request call
   */
  cancel: CancelAnimationFrameFn;
}

/**
 * The name of the cancel function to use (e.g., 'cancelAnimationFrame', 'clearTimeout').
 * Determined at runtime based on browser support.
 */
declare let cancelMethodName: string;

/**
 * The function used to request animation frames.
 * Either native requestAnimationFrame or a setTimeout-based fallback.
 */
declare let requestAnimationFrameImpl: RequestAnimationFrameFn;

/**
 * Timestamp of the last animation frame request (used for throttling in fallback mode).
 */
declare let lastFrameTime: number;

/**
 * Fallback implementation using setTimeout with ~60fps throttling.
 * @param callback - The function to execute on the next frame
 * @returns Timeout identifier
 */
declare function setTimeoutFallback(callback: FrameRequestCallback): number;

/**
 * Generates vendor-prefixed method names for animation frame APIs.
 * @param prefix - Vendor prefix (e.g., 'webkit', 'moz', '')
 * @param method - Base method name ('request' or 'cancel')
 * @returns Full method name (e.g., 'webkitRequestAnimationFrame')
 */
declare function createMethodName(prefix: string, method: string): string;

/**
 * Cross-browser animation frame request utility.
 * Automatically detects and uses the best available method:
 * - Native requestAnimationFrame (unprefixed or vendor-prefixed)
 * - setTimeout fallback with 16ms delay (~60fps)
 * 
 * @example
 *