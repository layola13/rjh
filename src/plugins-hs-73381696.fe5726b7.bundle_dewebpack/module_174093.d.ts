/**
 * FPS (Frames Per Second) Monitor
 * 
 * Monitors application frame rate and triggers callbacks when FPS changes significantly.
 * Maintains a history of FPS values to detect performance degradation patterns.
 * 
 * @module FPSMonitor
 */

/**
 * Callback function type for FPS change notifications
 * @param fps - Current frames per second value
 */
type FPSListener = (fps: number) => void;

/**
 * Configuration options for initializing the FPS Monitor
 */
interface FPSMonitorConfig {
  /**
   * Signal hook for animation frame events from the application core
   */
  signalNewAnimationFrame?: unknown;
}

/**
 * SignalHook utility from HSCore framework
 * Manages event listening and signal dispatching
 */
declare namespace HSCore.Util {
  class SignalHook<T = unknown> {
    constructor(context: T);
    listen(signal: unknown, handler: () => void): void;
    dispose(): void;
  }
}

/**
 * FPS Monitor Class
 * 
 * Tracks rendering performance by counting frames per animation cycle.
 * Implements intelligent threshold detection to avoid excessive callbacks.
 * 
 * @example
 *