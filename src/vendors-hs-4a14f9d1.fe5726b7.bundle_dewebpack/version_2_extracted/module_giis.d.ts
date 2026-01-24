/**
 * setImmediate polyfill module
 * Provides cross-platform implementation of setImmediate and clearImmediate
 */

/**
 * Task to be executed by setImmediate
 */
interface ImmediateTask {
  /** The callback function to execute */
  callback: Function;
  /** Arguments to pass to the callback */
  args: any[];
}

/**
 * Global context (window in browsers, global in Node.js)
 */
declare const globalContext: Window & typeof globalThis;

/**
 * Schedules a function to be executed immediately after the current event loop
 * @param callback - Function to execute
 * @param args - Optional arguments to pass to the callback
 * @returns Handle that can be used to cancel the immediate with clearImmediate
 */
export function setImmediate(
  callback: (...args: any[]) => void,
  ...args: any[]
): number;

/**
 * Cancels an immediate previously scheduled with setImmediate
 * @param handle - The handle returned by setImmediate
 */
export function clearImmediate(handle: number): void;

/**
 * Global augmentation for Window interface
 */
declare global {
  interface Window {
    /**
     * Schedules a function to be executed immediately after the current event loop
     * @param callback - Function to execute
     * @param args - Optional arguments to pass to the callback
     * @returns Handle that can be used to cancel the immediate with clearImmediate
     */
    setImmediate?(
      callback: (...args: any[]) => void,
      ...args: any[]
    ): number;

    /**
     * Cancels an immediate previously scheduled with setImmediate
     * @param handle - The handle returned by setImmediate
     */
    clearImmediate?(handle: number): void;

    /**
     * Legacy support for postMessage without ES modules
     */
    importScripts?: (...urls: string[]) => void;
  }

  /**
   * Node.js process object
   */
  interface Process {
    /**
     * Next tick scheduling (Node.js specific)
     * @param callback - Function to execute on next tick
     */
    nextTick(callback: () => void): void;
  }

  /**
   * Node.js global namespace
   */
  namespace NodeJS {
    interface Global {
      setImmediate?(
        callback: (...args: any[]) => void,
        ...args: any[]
      ): number;
      clearImmediate?(handle: number): void;
    }
  }
}

export {};