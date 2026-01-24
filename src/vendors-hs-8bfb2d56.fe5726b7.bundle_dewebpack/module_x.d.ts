/**
 * File descriptor stream operations module
 * Handles stream retrieval and error handling for file descriptors
 */

/**
 * Global file system interface
 * Provides access to file system operations and error types
 */
declare const FS: FileSystem | undefined;

/**
 * File system interface definition
 */
interface FileSystem {
  /**
   * File system specific error type
   * Contains errno property for error code identification
   */
  ErrnoError: ErrorConstructor;
}

/**
 * Error constructor for file system errors
 */
interface ErrorConstructor {
  new (message?: string): ErrnoError;
  (message?: string): ErrnoError;
  readonly prototype: ErrnoError;
}

/**
 * File system error object
 * Extends standard Error with errno property
 */
interface ErrnoError extends Error {
  /**
   * Error number indicating the specific error type
   * Positive value representing the errno constant
   */
  errno: number;
}

/**
 * Global module context object
 * Contains stream operations and configuration
 */
declare const $: ModuleContext;

/**
 * Module context interface
 * Provides stream retrieval and variable arguments handling
 */
interface ModuleContext {
  /**
   * Variable arguments passed to the module
   * Can be of any type depending on invocation context
   */
  varargs: unknown;

  /**
   * Retrieves a stream from a file descriptor
   * @returns The stream object associated with the file descriptor
   * @throws {ErrnoError} If the file descriptor is invalid or stream cannot be retrieved
   */
  getStreamFromFD(): unknown;
}

/**
 * Error reporting function
 * Processes and reports non-FS errors
 * @param error - The error object to be reported
 */
declare function wt(error: Error): void;

/**
 * Module initialization function
 * Sets up module with variable arguments and attempts stream retrieval
 * @param moduleExports - The module's export object
 * @param variableArgs - Variable arguments to be processed by the module
 * @returns 0 on success, negated errno on failure
 */
declare function module_x(
  moduleExports: unknown,
  variableArgs: unknown
): number;