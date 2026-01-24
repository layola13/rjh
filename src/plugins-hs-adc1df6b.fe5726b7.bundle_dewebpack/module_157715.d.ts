/**
 * 距顶高度修改命令
 * Command for modifying the molding offset (distance from top) of face entities
 * @module ChangeMoldingOffsetCommand
 */

declare namespace HSApp.Cmd {
  /**
   * Base command class
   */
  class Command {
    /**
     * Execute the command
     */
    onExecute(): void;

    /**
     * Receive command input/events
     * @param eventType - Type of event received
     * @param data - Event data payload
     * @returns Whether the event was handled
     */
    onReceive(eventType: string, data: unknown): boolean;

    /**
     * Complete the command execution
     * @param result - Command execution result
     */
    onComplete(result: unknown): void;

    /**
     * Get human-readable description of the command
     * @returns Command description
     */
    getDescription(): string;

    /**
     * Get the category/group this command belongs to
     * @returns Command category
     */
    getCategory(): HSFPConstants.LogGroupTypes;
  }
}

declare namespace HSFPConstants {
  /**
   * Types of transaction requests
   */
  enum RequestType {
    /** Request to change molding offset */
    ChangeMoldingOffset = 'ChangeMoldingOffset',
    // ... other request types
  }

  /**
   * Log grouping categories for operations
   */
  enum LogGroupTypes {
    /** Operations performed on faces */
    FaceOperation = 'FaceOperation',
    // ... other log group types
  }
}

declare namespace HSApp {
  /**
   * Transaction session for managing multiple related operations
   */
  interface TransactionSession {
    /**
     * Commit all operations in this session
     */
    commit(): void;
  }

  /**
   * Transaction request representing a single operation
   */
  interface TransactionRequest {
    /**
     * Receive input for this request
     * @param eventType - Type of event
     * @param data - Event data
     */
    receive(eventType: string, data: unknown): void;
  }

  /**
   * Manager for handling transactions and undo/redo
   */
  interface TransactionManager {
    /**
     * Start a new transaction session
     * @returns New transaction session
     */
    startSession(): TransactionSession;

    /**
     * Create a new transaction request
     * @param requestType - Type of request to create
     * @param entities - Entities to operate on
     * @returns New transaction request
     */
    createRequest(
      requestType: HSFPConstants.RequestType,
      entities: unknown[]
    ): TransactionRequest;

    /**
     * Commit a transaction request
     * @param request - Request to commit
     */
    commit(request: TransactionRequest): void;
  }

  /**
   * Main application singleton
   */
  interface Application {
    /**
     * Get the transaction manager instance
     */
    readonly transManager: TransactionManager;
  }

  namespace App {
    /**
     * Get the application singleton instance
     * @returns Application instance
     */
    function getApp(): Application;
  }
}

/**
 * Entity type representing a geometry element
 */
type Entity = unknown;

/**
 * Face type representing a surface in 3D geometry
 */
type Face = unknown;

/**
 * Command for changing the molding offset (distance from top) of face entities
 * 
 * @example
 *