/**
 * Module: module_d
 * Provides abort functionality for asynchronous operations
 */

/**
 * Interface representing an abortable operation
 */
interface Abortable {
  /**
   * Aborts the ongoing operation
   */
  abort(): void;
}

/**
 * Aborts an operation on the given abortable object
 * @param o - The abortable object to abort
 */
declare function abortOperation(o: Abortable): void;

export { Abortable, abortOperation };