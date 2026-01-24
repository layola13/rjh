/**
 * Signal class from module 55995
 */
declare class Signal<T> {
  constructor(context: T);
  dispatch(data: unknown): void;
}

/**
 * Entity transaction types from module 55173
 */
declare enum EntityTransactionType {
  Modification = "Modification",
  Creation = "Creation",
  Deletion = "Deletion"
}

/**
 * Message object structure for request communication
 */
interface RequestMessage {
  /** Message identifier */
  msg: string;
  /** Optional message parameter */
  param?: unknown;
  /** Indicates if the message was received asynchronously */
  async?: boolean;
}

/**
 * Composition specification for request merging
 */
interface ComposeSpec {
  /** Type identifier for the composition */
  type: string;
  /** Additional composition data */
  data?: unknown;
}

/**
 * Event payload dispatched when requests are composed
 */
interface ComposedEvent<T = unknown> {
  /** The request that absorbed another */
  composedRequest: Request<T>;
  /** The request that was absorbed */
  otherRequest: Request<T>;
}

/**
 * Options for transaction operations
 */
interface TransactionOptions {
  [key: string]: unknown;
}

/**
 * Abstract base class for command pattern requests with undo/redo support.
 * Provides lifecycle hooks for activation, commit, abort, and composition.
 * 
 * @template TResult - The type of result produced by this request
 */
declare abstract class Request<TResult = unknown> {
  /**
   * Type identifier for this request
   */
  type: string;

  /**
   * Whether this request has been committed
   */
  isCommitted: boolean;

  /**
   * The result produced after committing this request
   */
  result: TResult | undefined;

  /**
   * Arguments passed to this request
   */
  args: unknown[];

  /**
   * Messages received by this request during its lifecycle
   */
  messages: RequestMessage[];

  /**
   * Signal dispatched when this request is composed with another
   */
  signalComposed: Signal<this>;

  constructor();

  /**
   * Activates the request, triggering initialization logic
   */
  activate(): void;

  /**
   * Hook called when the request is activated
   * @protected
   */
  protected onActivate(): void;

  /**
   * Aborts the request, undoing any changes and clearing messages
   */
  abort(): void;

  /**
   * Hook called when the request is aborted
   * @protected
   */
  protected onAbort(): void;

  /**
   * Commits the request synchronously, executing its operation
   * @returns The result of the operation
   */
  commit(): TResult | undefined;

  /**
   * Commits the request asynchronously, executing its operation
   * @returns Promise resolving to the result of the operation
   */
  commitAsync(): Promise<TResult | undefined>;

  /**
   * Disposes of resources held by this request
   */
  dispose(): void;

  /**
   * Undoes the changes made by this request
   */
  undo(): void;

  /**
   * Redoes the changes previously undone
   */
  redo(): void;

  /**
   * Attempts to compose (merge) another request into this one
   * @param otherRequest - The request to compose with this one
   * @returns True if composition succeeded, false otherwise
   */
  compose(otherRequest: Request<TResult>): boolean;

  /**
   * Receives a message synchronously
   * @param message - The message identifier
   * @param param - Optional message parameter
   * @returns True if the message was handled, false otherwise
   */
  receive(message: string, param?: unknown): boolean;

  /**
   * Receives a message asynchronously
   * @param message - The message identifier
   * @param param - Optional message parameter
   * @returns Promise resolving to true if handled, false otherwise
   */
  receiveAsync(message: string, param?: unknown): Promise<boolean>;

  /**
   * Hook called when a synchronous message is received
   * @param message - The message identifier
   * @param param - Optional message parameter
   * @returns True if the message was handled, false otherwise
   * @protected
   */
  protected onReceive(message: string, param?: unknown): boolean;

  /**
   * Hook called when an asynchronous message is received
   * @param message - The message identifier
   * @param param - Optional message parameter
   * @returns Promise resolving to true if handled, false otherwise
   * @protected
   */
  protected onReceiveAsync(message: string, param?: unknown): Promise<boolean>;

  /**
   * Hook called before committing
   * @protected
   */
  protected onPreCommit(): void;

  /**
   * Hook called to execute the main commit operation
   * @returns The result of the operation
   * @protected
   */
  protected onCommit(): TResult | undefined;

  /**
   * Hook called after committing
   * @protected
   */
  protected onPostCommit(): void;

  /**
   * Async hook called before committing
   * @returns Promise that resolves when pre-commit is complete
   * @protected
   */
  protected onPreCommitAsync(): Promise<void>;

  /**
   * Async hook called to execute the main commit operation
   * @returns Promise resolving to the result of the operation
   * @protected
   */
  protected onCommitAsync(): Promise<TResult | undefined>;

  /**
   * Async hook called after committing
   * @returns Promise that resolves when post-commit is complete
   * @protected
   */
  protected onPostCommitAsync(): Promise<void>;

  /**
   * Hook called when undoing this request
   * @protected
   */
  protected onUndo(): void;

  /**
   * Hook called when redoing this request
   * @protected
   */
  protected onRedo(): void;

  /**
   * Static hook for pre-creating a request instance
   * @param args - Arguments for request creation
   * @returns Promise that resolves when pre-creation is complete
   */
  static preCreate(args: unknown[]): Promise<void>;

  /**
   * Serializes request arguments to a string representation
   * @param args - The arguments to stringify
   * @returns String representation of the arguments
   */
  static stringifyRequestArgs(args: unknown[]): string | undefined;

  /**
   * Asynchronously serializes request arguments
   * @param args - The arguments to stringify
   * @returns Promise resolving to string representation
   */
  static stringifyRequestArgsAsync(args: unknown[]): Promise<string | undefined>;

  /**
   * Parses request arguments from a string representation
   * @param argsString - The serialized arguments
   * @returns Parsed arguments array
   */
  static parseRequestArgs(argsString: string): unknown[] | undefined;

  /**
   * Asynchronously parses request arguments from a string
   * @param argsString - The serialized arguments
   * @returns Promise resolving to parsed arguments
   */
  static parseRequestArgsAsync(argsString: string): Promise<unknown[] | undefined>;

  /**
   * Serializes received messages to a string representation
   * @param messages - The messages to stringify
   * @returns String representation of the messages
   */
  static stringifyReceiveMsgs(messages: RequestMessage[]): string | undefined;

  /**
   * Asynchronously serializes received messages
   * @param messages - The messages to stringify
   * @returns Promise resolving to string representation
   */
  static stringifyReceiveMsgsAsync(messages: RequestMessage[]): Promise<string | undefined>;

  /**
   * Parses received messages from a string representation
   * @param messagesString - The serialized messages
   * @returns Parsed messages array
   */
  static parseReceiveMsgs(messagesString: string): RequestMessage[] | undefined;

  /**
   * Asynchronously parses received messages from a string
   * @param messagesString - The serialized messages
   * @returns Promise resolving to parsed messages
   */
  static parseReceiveMsgsAsync(messagesString: string): Promise<RequestMessage[] | undefined>;

  /**
   * Determines if this request can participate in transactions
   * @returns True if transactable, false otherwise
   */
  canTransact(): boolean;

  /**
   * Determines if a signal should be blocked
   * @param signal - The signal to check
   * @param data - Additional signal data
   * @returns True if the signal should be blocked, false otherwise
   */
  blockSignal(signal: unknown, data: unknown): boolean;

  /**
   * Executes a transaction operation
   * @param entity - The entity to transact on
   * @param description - Description of the transaction
   * @param transactionType - Type of transaction (default: Modification)
   * @param options - Additional transaction options
   */
  transact(
    entity: unknown,
    description?: string,
    transactionType?: EntityTransactionType,
    options?: TransactionOptions
  ): void;

  /**
   * Hook called when attempting to compose with another request
   * @param spec - The composition specification
   * @param otherRequest - The request to compose with
   * @returns True if composition succeeded, false otherwise
   * @protected
   */
  protected onCompose(spec: ComposeSpec, otherRequest: Request<TResult>): boolean;

  /**
   * Gets the composition specification for this request
   * @returns The composition spec (defaults to args array)
   */
  getComposeSpec(): ComposeSpec | unknown[];

  /**
   * Gets a human-readable description of this request
   * @returns Description string
   */
  getDescription(): string;

  /**
   * Determines if this request requires user interaction
   * @returns True if interactive, false otherwise
   */
  isInteractive(): boolean;

  /**
   * Gets the category this request belongs to
   * @returns Category string
   */
  getCategory(): string;
}

export { Request, RequestMessage, ComposeSpec, ComposedEvent, TransactionOptions, EntityTransactionType };