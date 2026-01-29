/**
 * Redo operation control for the application's transaction management system.
 * Handles redo operations triggered by user commands or AI interactions.
 * @module OpRedoControl
 */

import { OperationId, BaseOperation } from './base-operation';
import { TransactionManager } from './transaction-manager';
import { ResourceManager } from './resource-manager';

/**
 * Parameters passed to the execute method of the operation.
 */
interface ExecuteParameters {
  /**
   * Indicates whether the command was issued as a question (0 = command, 1 = question)
   */
  isQuestionTone: number;
  
  /**
   * Reply message to be sent back to the user
   */
  reply: string;
  
  /**
   * Flag indicating whether the function execution is complete
   */
  isFuncDone?: boolean;
  
  /**
   * List of recommended operation types to suggest to the user
   */
  recommendedOperationTypes?: OperationId[];
}

/**
 * Application context interface providing access to transaction manager
 */
interface ApplicationContext {
  /**
   * Transaction manager for handling undo/redo operations
   */
  transManager: TransactionManager;
}

/**
 * Operation control class for handling redo functionality.
 * Extends the base operation class to provide redo-specific behavior.
 * 
 * @example
 *