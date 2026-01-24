/**
 * Readonly check task for document access validation.
 * Verifies if the current user has write permissions for the document.
 * @module ReadonlyCheckTask
 */

/**
 * Status enumeration for task execution results
 */
export type TaskStatus = 'success' | 'cancel';

/**
 * Task execution context interface
 */
export interface TaskContext {
  [key: string]: unknown;
}

/**
 * Task execution options interface
 */
export interface TaskOptions {
  [key: string]: unknown;
}

/**
 * Result data for readonly check
 */
export interface ReadonlyCheckData {
  /** Indicates whether the document is in readonly mode */
  readonly: boolean;
}

/**
 * Success result of task execution
 */
export interface TaskSuccessResult {
  status: 'success';
  data: ReadonlyCheckData;
}

/**
 * Cancellation result of task execution
 */
export interface TaskCancelResult {
  status: 'cancel';
}

/**
 * Union type for all possible task results
 */
export type TaskResult = TaskSuccessResult | TaskCancelResult;

/**
 * Task that validates document readonly status and user permissions.
 * Prevents save operations when the document is readonly and the current user
 * is not the document owner.
 * 
 * @example
 *