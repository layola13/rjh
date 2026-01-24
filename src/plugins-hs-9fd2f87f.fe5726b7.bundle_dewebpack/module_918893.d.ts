/**
 * Transaction manager interface for managing command requests
 */
interface TransactionManager {
  /**
   * Creates a new request with the specified type and arguments
   * @param requestType - The type of request to create
   * @param args - Arguments for the request
   * @returns The created request object
   */
  createRequest(requestType: number, args: unknown[]): TransactionRequest;
  
  /**
   * Commits a request to execute it
   * @param request - The request to commit
   */
  commit(request: TransactionRequest): void;
}

/**
 * Transaction request object
 */
interface TransactionRequest {
  // Request implementation details
}

/**
 * Execution context for commands
 */
interface CommandContext {
  /** Transaction manager for creating and executing requests */
  transManager: TransactionManager;
}

/**
 * Constants for HSF protocol request types
 */
declare namespace HSFPConstants {
  /** Available request types in the HSF protocol */
  enum RequestType {
    /** Request type for toggling self-host light band state */
    ToggleSelfHostLightBand = 0
  }
}

/**
 * HSApp namespace containing application core types
 */
declare namespace HSApp {
  namespace Cmd {
    /**
     * Base command class for executing operations
     */
    class Command {
      /** Execution context containing transaction manager and other utilities */
      protected context: CommandContext;
      
      /**
       * Executes the command operation
       * Should be overridden by subclasses to implement specific behavior
       */
      onExecute(): void;
    }
  }
}

/**
 * Command for toggling the state of a self-hosted light band
 * @extends HSApp.Cmd.Command
 */
declare class ToggleSelfHostLightBandCommand extends HSApp.Cmd.Command {
  /** The light slot identifier to toggle */
  private _lightSlot: unknown;
  
  /** The desired checked/enabled state */
  private _checked: boolean;
  
  /** The transaction request created for this command */
  private _request: TransactionRequest | undefined;
  
  /**
   * Creates a new toggle light band command
   * @param lightSlot - The light slot identifier to operate on
   * @param checked - The target state (true for enabled, false for disabled)
   */
  constructor(lightSlot: unknown, checked: boolean);
  
  /**
   * Executes the toggle operation by creating and committing a transaction request
   * Only executes if a valid light slot is provided
   */
  onExecute(): void;
}

export default ToggleSelfHostLightBandCommand;