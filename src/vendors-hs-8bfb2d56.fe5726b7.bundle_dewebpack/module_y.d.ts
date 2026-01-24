/**
 * Module: module_y
 * File descriptor stream operations with error handling
 */

/**
 * Represents a file system error with an associated errno code
 */
interface FSErrnoError extends Error {
  errno: number;
}

/**
 * File system operations namespace
 */
interface FileSystem {
  ErrnoError: new (errno: number) => FSErrnoError;
}

declare const FS: FileSystem | undefined;

/**
 * Stream and file descriptor operations module
 */
interface ModuleY {
  /**
   * Variable-length arguments storage
   */
  varargs: unknown;

  /**
   * Retrieves a stream from a file descriptor
   * @returns Stream instance or undefined
   */
  getStreamFromFD(): unknown;

  /**
   * Generic getter method for retrieving module state
   * @returns Retrieved value
   */
  get(): unknown;
}

/**
 * Error handler function (likely wt = write/throw)
 * @param error - The error to handle
 */
declare function wt(error: unknown): void;

/**
 * Processes file descriptor operations with error handling
 * 
 * @param moduleInstance - The module instance ($)
 * @param varargs - Variable-length arguments to process
 * @returns 0 on success, negative errno on failure
 * 
 * @remarks
 * This function:
 * 1. Stores varargs in the module instance
 * 2. Initializes a stream from a file descriptor
 * 3. Executes four sequential get operations
 * 4. Returns 0 on success
 * 5. Catches and handles FS.ErrnoError, returning negative errno
 */
export function processFileDescriptorOperations(
  moduleInstance: ModuleY,
  varargs: unknown
): number;