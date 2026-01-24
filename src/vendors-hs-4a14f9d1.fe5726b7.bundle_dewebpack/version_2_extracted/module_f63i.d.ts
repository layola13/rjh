/**
 * Browser-compatible process polyfill module
 * Provides a minimal implementation of Node.js process object for browser environments
 */

/**
 * Represents a task in the nextTick queue
 */
interface NextTickTask {
  /** The function to execute */
  fun: Function;
  /** Arguments to pass to the function */
  array: any[];
  /** Executes the queued task */
  run(): void;
}

/**
 * Environment variables object
 */
interface ProcessEnv {
  [key: string]: string | undefined;
}

/**
 * Version information for various dependencies
 */
interface ProcessVersions {
  [key: string]: string | undefined;
}

/**
 * Browser-compatible process object interface
 */
export interface Process {
  /**
   * Schedules a callback to be invoked in the next iteration of the event loop
   * @param callback - The function to call
   * @param args - Arguments to pass to the callback
   */
  nextTick(callback: Function, ...args: any[]): void;

  /** Platform title, always "browser" in this implementation */
  title: string;

  /** Flag indicating browser environment, always true */
  browser: boolean;

  /** Environment variables (empty in browser) */
  env: ProcessEnv;

  /** Command line arguments (empty in browser) */
  argv: string[];

  /** Process version string (empty in browser) */
  version: string;

  /** Dependency versions (empty in browser) */
  versions: ProcessVersions;

  /**
   * Registers an event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event handler
   */
  on(event: string, listener: Function): void;

  /**
   * Adds an event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event handler
   */
  addListener(event: string, listener: Function): void;

  /**
   * Registers a one-time event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event handler
   */
  once(event: string, listener: Function): void;

  /**
   * Removes an event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event handler
   */
  off(event: string, listener: Function): void;

  /**
   * Removes an event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event handler
   */
  removeListener(event: string, listener: Function): void;

  /**
   * Removes all event listeners (no-op in browser)
   * @param event - Optional event name
   */
  removeAllListeners(event?: string): void;

  /**
   * Emits an event (no-op in browser)
   * @param event - Event name
   * @param args - Event arguments
   */
  emit(event: string, ...args: any[]): void;

  /**
   * Prepends an event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event handler
   */
  prependListener(event: string, listener: Function): void;

  /**
   * Prepends a one-time event listener (no-op in browser)
   * @param event - Event name
   * @param listener - Event handler
   */
  prependOnceListener(event: string, listener: Function): void;

  /**
   * Returns registered listeners for an event (always empty in browser)
   * @param event - Event name
   * @returns Empty array
   */
  listeners(event: string): Function[];

  /**
   * Returns internal binding (not supported in browser)
   * @param name - Binding name
   * @throws Always throws error in browser environment
   */
  binding(name: string): never;

  /**
   * Returns current working directory (always "/" in browser)
   * @returns Root directory path
   */
  cwd(): string;

  /**
   * Changes current working directory (not supported in browser)
   * @param directory - Target directory
   * @throws Always throws error in browser environment
   */
  chdir(directory: string): never;

  /**
   * Returns file mode creation mask (always 0 in browser)
   * @returns Zero value
   */
  umask(): number;
}

declare const process: Process;
export default process;