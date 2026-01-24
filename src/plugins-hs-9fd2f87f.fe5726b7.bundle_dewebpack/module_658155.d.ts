/**
 * Command for deleting a customized model molding.
 * This module provides functionality to remove molding objects from the customized modeling system.
 * @module hsw.plugin.customizedmodeling.cmd
 */

/**
 * Represents a molding object in the customized modeling system.
 * Contains properties and methods related to 3D model molding.
 */
export interface ICustomizedModelMolding {
  /** Unique identifier for the molding */
  id?: string;
  /** Molding configuration data */
  data?: unknown;
  /** Additional molding properties */
  [key: string]: unknown;
}

/**
 * Transaction manager interface for handling requests and commits.
 */
export interface ITransactionManager {
  /**
   * Creates a new request for the transaction system.
   * @param requestType - The type of request to create
   * @param args - Arguments for the request
   * @returns The created request object
   */
  createRequest(requestType: string | number, args: unknown[]): ITransactionRequest;
  
  /**
   * Commits a request to the transaction system.
   * @param request - The request to commit
   */
  commit(request: ITransactionRequest): void;
}

/**
 * Represents a transaction request in the system.
 */
export interface ITransactionRequest {
  /** Request type identifier */
  type: string | number;
  /** Request arguments */
  args: unknown[];
  /** Additional request properties */
  [key: string]: unknown;
}

/**
 * Command execution context containing shared resources.
 */
export interface ICommandContext {
  /** Transaction manager for handling requests */
  transManager: ITransactionManager;
  /** Additional context properties */
  [key: string]: unknown;
}

/**
 * Command manager interface for command lifecycle management.
 */
export interface ICommandManager {
  /**
   * Marks a command as completed.
   * @param command - The command that has completed execution
   */
  complete(command: unknown): void;
}

/**
 * Base command class from HSApp framework.
 */
export declare class Command {
  /** Command execution context */
  protected context: ICommandContext;
  
  /** Command manager instance */
  protected mgr?: ICommandManager;
  
  /**
   * Executes the command logic.
   * Subclasses must implement this method.
   */
  onExecute(): void;
}

/**
 * Command for deleting a customized model molding from the system.
 * Handles the transaction request creation and commit process.
 * 
 * @extends Command
 * 
 * @example
 *