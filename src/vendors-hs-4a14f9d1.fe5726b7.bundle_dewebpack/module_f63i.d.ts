/**
 * Browser-compatible process shim module
 * Provides a minimal process object for browser environments
 */

/**
 * Timeout callback function type
 */
type TimeoutCallback = () => void;

/**
 * Timeout handle type (number in browsers, object in Node.js)
 */
type TimeoutHandle = ReturnType<typeof setTimeout>;

/**
 * Task queue item containing a function and its arguments
 */
interface QueuedTask {
  /** The function to execute */
  fun: (...args: any[]) => void;
  /** Arguments to pass to the function */
  array: any[];
}

/**
 * Event listener function type
 */
type EventListener = (...args: any[]) => void;

/**
 * Process environment variables
 */
interface ProcessEnv {
  [key: string]: string | undefined;
}

/**
 * Process versions object
 */
interface ProcessVersions {
  [key: string]: string | undefined;
}

/**
 * Browser-compatible process object interface
 * Mimics Node.js process API for cross-platform compatibility
 */
export interface BrowserProcess {
  /**
   * Schedule a callback to execute on the next tick of the event loop
   * @param callback - Function to execute
   * @param args - Optional arguments to pass to the callback
   */
  nextTick(callback: (...args: any[]) => void, ...args: any[]): void;

  /** Platform title (always "browser" in this implementation) */
  title: string;

  /** Indicates this is a browser environment */
  browser: boolean;

  /** Environment variables object (empty in browser) */
  env: ProcessEnv;

  /** Command line arguments (empty in browser) */
  argv: string[];

  /** Node.js version string (empty in browser) */
  version: string;

  /** Dependency versions object (empty in browser) */
  versions: ProcessVersions;

  /**
   * Register an event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event listener function
   */
  on(event: string, listener: EventListener): void;

  /**
   * Add an event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event listener function
   */
  addListener(event: string, listener: EventListener): void;

  /**
   * Register a one-time event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event listener function
   */
  once(event: string, listener: EventListener): void;

  /**
   * Remove an event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event listener function
   */
  off(event: string, listener: EventListener): void;

  /**
   * Remove an event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event listener function
   */
  removeListener(event: string, listener: EventListener): void;

  /**
   * Remove all event listeners (no-op in browser)
   * @param event - Optional event name
   */
  removeAllListeners(event?: string): void;

  /**
   * Emit an event (no-op in browser)
   * @param event - Event name
   * @param args - Event arguments
   */
  emit(event: string, ...args: any[]): void;

  /**
   * Prepend an event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event listener function
   */
  prependListener(event: string, listener: EventListener): void;

  /**
   * Prepend a one-time event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event listener function
   */
  prependOnceListener(event: string, listener: EventListener): void;

  /**
   * Get registered listeners for an event
   * @param event - Event name
   * @returns Empty array in browser environment
   */
  listeners(event: string): EventListener[];

  /**
   * Bind to internal C++ module (not supported in browser)
   * @param name - Module name
   * @throws Always throws error in browser environment
   */
  binding(name: string): never;

  /**
   * Get current working directory
   * @returns Always returns "/" in browser environment
   */
  cwd(): string;

  /**
   * Change current working directory (not supported in browser)
   * @param directory - Target directory
   * @throws Always throws error in browser environment
   */
  chdir(directory: string): never;

  /**
   * Get file creation mask
   * @returns Always returns 0 in browser environment
   */
  umask(): number;
}

declare const browserProcess: BrowserProcess;

export default browserProcess;