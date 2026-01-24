/**
 * Uncaught exception handler module
 * Increments the global uncaught exception counter and re-throws the error
 */

/**
 * Global statistics object tracking uncaught exceptions
 */
interface GlobalStats {
  /** Counter for the number of uncaught exceptions that have occurred */
  uncaught_exceptions?: number;
}

/**
 * Global statistics tracker
 */
declare const bt: GlobalStats;

/**
 * Handles uncaught exceptions by incrementing a global counter and re-throwing
 * 
 * @param error - The exception/error that was caught
 * @param _moduleExports - Webpack module exports object (unused)
 * @param _require - Webpack require function (unused)
 * @throws Always re-throws the original error after recording it
 */
declare function handleUncaughtException(
  error: unknown,
  _moduleExports: unknown,
  _require: unknown
): never;

export { handleUncaughtException, GlobalStats };