/**
 * Empty Observer - A no-op observer implementation
 * Provides default empty implementations for Observer interface methods
 */

/**
 * Configuration interface for deprecated synchronous error handling
 */
interface DeprecatedConfig {
  /**
   * Flag to enable deprecated synchronous error throwing behavior
   * @deprecated Use asynchronous error handling instead
   */
  useDeprecatedSynchronousErrorHandling: boolean;
}

/**
 * Observer interface for handling observable emissions
 * @template T The type of values emitted by the observable
 */
interface Observer<T = unknown> {
  /**
   * Indicates whether the observer is closed and no longer accepting values
   */
  closed: boolean;

  /**
   * Handles the next emitted value
   * @param value The emitted value
   */
  next(value: T): void;

  /**
   * Handles errors emitted by the observable
   * @param error The error that occurred
   */
  error(error: unknown): void;

  /**
   * Called when the observable completes successfully
   */
  complete(): void;
}

/**
 * Reports an error asynchronously to avoid breaking the call stack
 * @param error The error to report
 */
declare function reportUnhandledError(error: unknown): void;

/**
 * Empty observer implementation that performs no operations
 * Used as a default observer when no handlers are provided
 * 
 * @remarks
 * - `next`: No-op function, discards emitted values
 * - `error`: Throws synchronously if deprecated mode is enabled, otherwise reports asynchronously
 * - `complete`: No-op function, does nothing on completion
 * 
 * @example
 *