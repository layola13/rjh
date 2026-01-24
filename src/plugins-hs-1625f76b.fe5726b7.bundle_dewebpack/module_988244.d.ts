/**
 * Transaction request command module
 * Creates and commits requests to the transaction manager
 */

declare namespace HSApp.Cmd {
  /**
   * Base command class
   */
  class Command {
    /** Command context with transaction manager */
    context: CommandContext;
    /** Command output result */
    output: unknown;
    /** Command manager instance */
    mgr: CommandManager;
  }

  /**
   * Command context interface
   */
  interface CommandContext {
    /** Transaction manager for handling requests */
    transManager: TransactionManager;
  }

  /**
   * Transaction manager interface
   */
  interface TransactionManager {
    /**
     * Creates a new transaction request
     * @param requestType - Type of the request to create
     * @param params - Parameters for the request
     * @returns Created transaction request
     */
    createRequest<T = unknown>(
      requestType: string | RequestConstructor,
      params: unknown
    ): TransactionRequest<T>;

    /**
     * Commits a transaction request
     * @param request - Request to commit
     */
    commit(request: TransactionRequest): void;
  }

  /**
   * Transaction request interface
   */
  interface TransactionRequest<T = unknown> {
    /** Result of the transaction request */
    result: T;
  }

  /**
   * Request constructor type
   */
  type RequestConstructor = new (...args: unknown[]) => unknown;

  /**
   * Command manager interface
   */
  interface CommandManager {
    /**
     * Marks a command as complete
     * @param command - Command to complete
     */
    complete(command: Command): void;
  }
}

/**
 * Transaction request command
 * Executes transaction requests through the transaction manager
 */
declare class TransactionRequestCommand extends HSApp.Cmd.Command {
  /**
   * Type of request to create
   */
  readonly requestType: string | HSApp.Cmd.RequestConstructor;

  /**
   * Parameters for the request
   */
  readonly params: unknown;

  /**
   * Creates a new transaction request command
   * @param requestType - Type of request to execute
   * @param params - Parameters to pass to the request
   */
  constructor(
    requestType: string | HSApp.Cmd.RequestConstructor,
    params: unknown
  );

  /**
   * Executes the command by creating and committing a transaction request
   * Sets the command output to the request result
   */
  onExecute(): void;

  /**
   * Determines if this command can be undone or redone
   * @returns Always returns false as transaction requests cannot be undone
   */
  canUndoRedo(): false;
}

export default TransactionRequestCommand;