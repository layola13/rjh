/**
 * Module: DesignEditStateTask
 * 
 * This module provides a task that checks the current design edit state.
 * It verifies whether the application is in EDIT mode before allowing
 * operations to proceed.
 */

import { HSApp } from './HSApp';

/**
 * Represents the result of a task execution.
 */
interface TaskExecutionResult {
  /** Indicates whether the task succeeded or was cancelled */
  status: 'success' | 'cancel';
}

/**
 * Context object passed to task execution.
 * Can be extended with specific properties as needed.
 */
interface TaskContext {
  [key: string]: unknown;
}

/**
 * Additional parameters for task execution.
 * Can be extended with specific properties as needed.
 */
interface TaskParameters {
  [key: string]: unknown;
}

/**
 * DesignEditStateTask checks if the application is in edit mode.
 * 
 * This task acts as a guard to ensure that certain operations only
 * proceed when the user is actively editing a design. If the edit
 * status is not in EDIT mode, the task returns a cancelled status.
 * 
 * @example
 *