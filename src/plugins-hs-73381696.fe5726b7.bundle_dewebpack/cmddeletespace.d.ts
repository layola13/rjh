/**
 * Command module for deleting a space in the application.
 * This command handles the deletion of floor spaces within the HSApp framework.
 * 
 * @module CmdDeleteSpace
 * @since 508019
 */

/**
 * Interface representing a Floor object in the application.
 * Contains methods for managing floor-related operations.
 */
interface IFloor {
  /**
   * Retrieves the master object associated with this floor.
   * @returns The master object that owns or controls this floor
   */
  getMaster(): unknown;
}

/**
 * Interface for the command context containing application state and managers.
 */
interface ICommandContext {
  /**
   * Transaction manager responsible for handling data operations
   * and maintaining transaction integrity.
   */
  transManager: ITransactionManager;
}

/**
 * Interface for managing transactions in the application.
 * Handles creation, execution and commit of data operations.
 */
interface ITransactionManager {
  /**
   * Creates a new transaction request with specified type and parameters.
   * 
   * @param requestType - The type of request from HSFPConstants.RequestType
   * @param params - Array of parameters for the request [master, floor]
   * @returns A transaction request object ready to be committed
   */
  createRequest(requestType: string, params: unknown[]): ITransactionRequest;
  
  /**
   * Commits a transaction request to execute the operation.
   * 
   * @param request - The transaction request to commit
   */
  commit(request: ITransactionRequest): void;
}

/**
 * Interface representing a transaction request.
 * Encapsulates data and metadata for a pending transaction.
 */
interface ITransactionRequest {
  // Transaction request implementation details
}

/**
 * Interface for command manager operations.
 * Controls command lifecycle and completion state.
 */
interface ICommandManager {
  /**
   * Marks the current command as complete and triggers cleanup.
   */
  complete(): void;
}

/**
 * Base command class from HSApp framework.
 * All commands in the application extend this base class.
 */
declare class Command {
  /**
   * The command execution context containing application state.
   */
  protected context: ICommandContext;
  
  /**
   * Command manager instance for controlling command lifecycle.
   */
  protected mgr: ICommandManager;
  
  /**
   * Cleanup method called when command is destroyed.
   * Should be overridden to perform command-specific cleanup.
   */
  protected onCleanup(): void;
}

/**
 * HSApp global namespace containing command infrastructure.
 */
declare namespace HSApp {
  namespace Cmd {
    export { Command };
  }
}

/**
 * Constants namespace for HSFPConstants containing request types.
 */
declare namespace HSFPConstants {
  /**
   * Enumeration of available request types for transactions.
   */
  enum RequestType {
    /**
     * Request type for deleting a space/floor.
     */
    DeleteSpace = "DeleteSpace"
  }
}

/**
 * Command class for deleting a space/floor in the application.
 * 
 * This command handles the deletion of floor spaces by:
 * 1. Retrieving the master object associated with the floor
 * 2. Creating a DeleteSpace transaction request
 * 3. Committing the transaction through the transaction manager
 * 4. Marking the command as complete
 * 
 * @remarks
 * This command cannot be undone or redone once executed.
 * 
 * @example
 *