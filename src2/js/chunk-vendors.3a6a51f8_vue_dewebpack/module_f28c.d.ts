/**
 * Process polyfill module for browser environments.
 * Provides a minimal implementation of Node.js process API.
 */

/**
 * Represents a task to be executed in the next tick.
 */
interface NextTickTask {
  /** The function to execute */
  fun: Function;
  /** Arguments to pass to the function */
  array: any[];
  /** Executes the task */
  run(): void;
}

/**
 * Environment variables object.
 */
interface ProcessEnv {
  [key: string]: string | undefined;
}

/**
 * Version information for Node.js and its dependencies.
 */
interface ProcessVersions {
  [key: string]: string | undefined;
}

/**
 * Browser-compatible process object that mimics Node.js process API.
 */
export interface Process {
  /**
   * The process.nextTick() method adds callback to the "next tick queue".
   * @param callback - The function to invoke on the next tick
   * @param args - Additional arguments to pass to the callback
   */
  nextTick(callback: Function, ...args: any[]): void;

  /** Platform title, always "browser" in this implementation */
  title: string;

  /** Indicates this is a browser environment */
  browser: boolean;

  /** Environment variables object (always empty in browser) */
  env: ProcessEnv;

  /** Command line arguments (always empty in browser) */
  argv: string[];

  /** Node.js version string (always empty in browser) */
  version: string;

  /** Version information for Node.js dependencies (always empty in browser) */
  versions: ProcessVersions;

  /**
   * Adds a listener for the specified event (no-op in browser).
   * @param event - The event name
   * @param listener - The callback function
   */
  on(event: string, listener: Function): void;

  /**
   * Alias for process.on().
   * @param event - The event name
   * @param listener - The callback function
   */
  addListener(event: string, listener: Function): void;

  /**
   * Adds a one-time listener for the specified event (no-op in browser).
   * @param event - The event name
   * @param listener - The callback function
   */
  once(event: string, listener: Function): void;

  /**
   * Removes a listener (no-op in browser).
   * @param event - The event name
   * @param listener - The callback function
   */
  off(event: string, listener: Function): void;

  /**
   * Removes a listener (no-op in browser).
   * @param event - The event name
   * @param listener - The callback function
   */
  removeListener(event: string, listener: Function): void;

  /**
   * Removes all listeners for the specified event (no-op in browser).
   * @param event - The event name (optional)
   */
  removeAllListeners(event?: string): void;

  /**
   * Emits an event (no-op in browser).
   * @param event - The event name
   * @param args - Arguments to pass to listeners
   */
  emit(event: string, ...args: any[]): void;

  /**
   * Adds a listener to the beginning of the listeners array (no-op in browser).
   * @param event - The event name
   * @param listener - The callback function
   */
  prependListener(event: string, listener: Function): void;

  /**
   * Adds a one-time listener to the beginning of the listeners array (no-op in browser).
   * @param event - The event name
   * @param listener - The callback function
   */
  prependOnceListener(event: string, listener: Function): void;

  /**
   * Returns an array of listeners for the specified event.
   * @param event - The event name
   * @returns Always returns an empty array in browser
   */
  listeners(event: string): Function[];

  /**
   * Returns bindings object (not supported in browser).
   * @param name - The binding name
   * @throws Always throws an error in browser
   */
  binding(name: string): never;

  /**
   * Returns the current working directory.
   * @returns Always returns "/" in browser
   */
  cwd(): string;

  /**
   * Changes the current working directory (not supported in browser).
   * @param directory - The target directory
   * @throws Always throws an error in browser
   */
  chdir(directory: string): never;

  /**
   * Returns the file mode creation mask.
   * @returns Always returns 0 in browser
   */
  umask(): number;
}

declare const process: Process;
export default process;