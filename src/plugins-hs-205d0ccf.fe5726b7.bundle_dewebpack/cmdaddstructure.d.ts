/**
 * Command for adding a structure to the application.
 * Manages the transaction lifecycle for structure addition operations.
 * @module CmdAddStructure
 */

import { Command } from 'HSApp/Cmd/Command';

/**
 * Request object returned by the transaction manager
 */
interface TransactionRequest {
  /** Unique identifier for the transaction request */
  id?: string;
  /** Current status of the request */
  status?: string;
}

/**
 * Transaction manager interface for handling structure operations
 */
interface TransactionManager {
  /**
   * Creates a new transaction request
   * @param requestType - The type of request to create
   * @param params - Parameters for the request
   * @returns The created transaction request
   */
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  
  /**
   * Commits a pending transaction request
   * @param request - The request to commit
   */
  commit(request: TransactionRequest): void;
  
  /**
   * Aborts a pending transaction request
   * @param request - The request to abort
   */
  abort(request: TransactionRequest): void;
}

/**
 * Structure object to be added
 */
interface Structure {
  /** Unique identifier for the structure */
  id?: string;
  /** Structure type or category */
  type?: string;
  /** Additional structure properties */
  [key: string]: unknown;
}

/**
 * Command class for adding structures to the application.
 * Handles the complete lifecycle of structure addition including
 * execution, completion, and cancellation.
 * @extends Command
 */
export declare class CmdAddStructure extends Command {
  /**
   * The structure to be added
   */
  readonly structure: Structure;
  
  /**
   * Transaction manager instance for handling requests
   */
  readonly transMgr: TransactionManager;
  
  /**
   * Internal transaction request object
   * @private
   */
  private _request: TransactionRequest;
  
  /**
   * Creates a new CmdAddStructure command instance
   * @param structure - The structure object to add
   */
  constructor(structure: Structure);
  
  /**
   * Executes the add structure command
   * Creates a transaction request with the structure and additional parameters
   * @param params - Additional execution parameters
   */
  onExecute(params: unknown): void;
  
  /**
   * Completes the add structure operation
   * Commits the transaction request to finalize the structure addition
   */
  onComplete(): void;
  
  /**
   * Cancels the add structure operation
   * Aborts the transaction request and rolls back any changes
   */
  onCancel(): void;
}