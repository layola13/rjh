/**
 * Module: module_z
 * 
 * Provides access to uncaught exception tracking functionality.
 * This module exposes a getter function for retrieving uncaught exceptions
 * from the browser tracking system.
 */

/**
 * Interface representing the browser tracking system
 */
interface BrowserTracker {
  /**
   * Collection or registry of uncaught exceptions
   * Could be an array of errors, a counter, or a configuration object
   */
  uncaught_exceptions: unknown;
}

/**
 * Retrieves the uncaught exceptions from the browser tracker
 * 
 * @returns The uncaught exceptions data structure from the tracking system
 * @remarks
 * The exact type of the return value depends on the implementation of
 * the browser tracker. Common types include:
 * - Error[] - array of exception objects
 * - number - count of uncaught exceptions
 * - UncaughtExceptionConfig - configuration object
 */
declare function getUncaughtExceptions(): unknown;

declare const bt: BrowserTracker;

export { getUncaughtExceptions, BrowserTracker };