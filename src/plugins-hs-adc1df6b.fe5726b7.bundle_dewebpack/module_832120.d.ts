/**
 * Replace Roof Command Module
 * Handles the replacement of parametric roofs in the application
 */

/**
 * Metadata interface for roof replacement operations
 */
export interface RoofReplacementMeta {
  /** Roof configuration parameters */
  [key: string]: unknown;
}

/**
 * Request interface for transaction management
 */
export interface TransactionRequest<T = unknown> {
  /** The result of the request execution */
  result: T;
  /** Request type identifier */
  type: string;
  /** Request parameters */
  params: unknown[];
}

/**
 * Transaction Manager interface for handling operations
 */
export interface TransactionManager {
  /**
   * Creates a new transaction request
   * @param requestType - Type of the request to create
   * @param params - Parameters for the request
   * @returns Created transaction request
   */
  createRequest<T = unknown>(requestType: string, params: unknown[]): TransactionRequest<T>;
  
  /**
   * Commits a transaction request
   * @param request - The request to commit
   */
  commit(request: TransactionRequest): void;
}

/**
 * Command interface for command pattern implementation
 */
export interface Command {
  /** Type identifier for the command */
  type?: string;
  /** Command manager reference */
  mgr?: {
    /**
     * Completes a command execution
     * @param command - The command to complete
     */
    complete(command: Command): void;
  };
}

/**
 * Command Manager interface
 */
export interface CommandManager {
  /** Currently executing command */
  current?: Command | null;
}

/**
 * Application interface providing access to managers
 */
export interface Application {
  /** Transaction manager instance */
  transManager: TransactionManager;
  /** Command manager instance */
  cmdManager: CommandManager;
}

/**
 * Base Command class for command pattern
 */
export declare class BaseCommand {
  constructor();
  
  /**
   * Executes the command
   * @returns Execution result
   */
  onExecute(): unknown;
  
  /**
   * Gets the command description
   * @returns Command description string
   */
  getDescription(): string;
  
  /**
   * Gets the command category
   * @returns Command category identifier
   */
  getCategory(): string;
}

/**
 * Replace Roof Command
 * Handles the replacement of existing parametric roofs with new configurations
 */
export default class ReplaceRoofCommand extends BaseCommand {
  /** Reference to the old roof being replaced */
  private _oldRoof: unknown;
  
  /** Metadata containing new roof configuration */
  private _meta: RoofReplacementMeta;
  
  /** Transaction request for the replacement operation */
  private _request?: TransactionRequest;

  /**
   * Creates a new ReplaceRoofCommand instance
   * @param oldRoof - The existing roof to be replaced
   * @param meta - Metadata containing the new roof configuration parameters
   */
  constructor(oldRoof: unknown, meta: RoofReplacementMeta);

  /**
   * Executes the roof replacement operation
   * 
   * Creates a transaction request to replace the old roof with new parameters,
   * commits the transaction, and completes any active ReplaceRoof commands.
   * 
   * @returns The result of the roof replacement operation
   */
  onExecute(): unknown;

  /**
   * Gets the human-readable description of this command
   * @returns "替换参数化屋顶" (Replace Parametric Roof)
   */
  getDescription(): string;

  /**
   * Gets the log category for this command
   * @returns The hard operation log group type constant
   */
  getCategory(): string;
}

/**
 * Global namespace declarations
 */
declare global {
  namespace HSApp {
    namespace App {
      /**
       * Gets the current application instance
       * @returns Application instance
       */
      function getApp(): Application;
    }
    
    namespace Cmd {
      /**
       * Base Command class available in global namespace
       */
      export { BaseCommand as Command };
    }
  }

  namespace HSFPConstants {
    /**
     * Request type constants
     */
    namespace RequestType {
      /** Request type for roof replacement operations */
      const ReplaceRoof: string;
    }

    /**
     * Command type constants
     */
    namespace CommandType {
      /** Command type for roof replacement */
      const ReplaceRoof: string;
    }

    /**
     * Log group type constants for operation categorization
     */
    namespace LogGroupTypes {
      /** Category for hard/heavy operations */
      const HardOperation: string;
    }
  }
}

export {};