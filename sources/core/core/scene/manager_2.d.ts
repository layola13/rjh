/**
 * Transaction Manager - Handles undo/redo operations and request lifecycle
 * @module Manager
 */

import { Signal } from './Signal';
import { Session } from './Session';
import { EntityTransactionType } from './EntityTransactionType';
import { Logger } from './Logger';

/**
 * Request constructor type
 */
export type RequestConstructor<T extends IRequest = IRequest> = new (...args: any[]) => T;

/**
 * Request parameter adapter function type
 */
export type RequestParamAdapter = (params: any[]) => any[];

/**
 * Base request interface
 */
export interface IRequest {
  type?: string;
  mgr?: Manager;
  args?: any[];
  activate(): void;
  undo?(): void | Promise<void>;
  redo?(): void | Promise<void>;
}

/**
 * Session configuration options
 */
export interface ISessionOptions {
  /** Maximum number of undo steps */
  maxUndoStep?: number;
  /** Whether to enable undo/redo for this session */
  undoRedo?: boolean;
  /** Filter function for converting session to request */
  toRequestFilter?: (request: IRequest) => boolean;
}

/**
 * Session commit options
 */
export interface ISessionCommitOptions {
  /** Whether to merge requests into a single request */
  mergeRequest?: boolean;
}

/**
 * Session control interface
 */
export interface ISessionControl {
  /** Commit the session */
  commit(options?: ISessionCommitOptions): boolean;
  /** Abort the session */
  abort(): boolean;
  /** End the session */
  end(): boolean;
  /** Convert session to a single request */
  toRequest(): IRequest | undefined;
}

/**
 * Signal dispatch data for request events
 */
export interface IRequestEventData {
  request: IRequest;
}

/**
 * Signal dispatch data for request creation
 */
export interface IRequestCreatedEventData {
  request: IRequest;
}

/**
 * Blocked signal entry
 */
interface IBlockedSignal {
  signal: Signal<any>;
  data: any;
}

/**
 * Request stack entry
 */
export interface IRequestStack {
  undo: IRequest[];
  redo: IRequest[];
}

/**
 * Transaction options
 */
export interface ITransactionOptions {
  [key: string]: any;
}

/**
 * Transaction Manager
 * Manages the lifecycle of requests including creation, commit, abort, undo, and redo operations.
 */
export class Manager {
  private static readonly logger: any;

  private _enabled: boolean;
  private _blocked: boolean;
  private _suppressed: boolean;
  private _undoStepCount: number;
  private _reqByType: Map<string, RequestConstructor>;
  private _reqParamAdapterByType: Map<string, RequestParamAdapter>;
  private _enableBlockSignals: boolean;
  private _blockedSignals: IBlockedSignal[];
  private _defaultSession: Session;
  private _activeSession: Session;
  private _sessionStack: Session[];
  private _undoRedoSessionStack: Session[];

  /** Signal dispatched when a request is being aborted */
  public readonly signalAborting: Signal<IRequestEventData>;
  
  /** Signal dispatched after a request has been aborted */
  public readonly signalAborted: Signal<IRequestEventData>;
  
  /** Signal dispatched when a request is being committed */
  public readonly signalCommitting: Signal<IRequestEventData>;
  
  /** Signal dispatched after a request has been committed */
  public readonly signalCommitted: Signal<IRequestEventData>;
  
  /** Signal dispatched when undo/redo state changes */
  public readonly signalUndoRedoStateChanged: Signal<void>;
  
  /** Signal dispatched when undoing a request */
  public readonly signalUndoing: Signal<IRequestEventData>;
  
  /** Signal dispatched after a request has been undone */
  public readonly signalUndone: Signal<IRequestEventData>;
  
  /** Signal dispatched when redoing a request */
  public readonly signalRedoing: Signal<IRequestEventData>;
  
  /** Signal dispatched after a request has been redone */
  public readonly signalRedone: Signal<IRequestEventData>;
  
  /** Signal dispatched when a request is created */
  public readonly signalCreated: Signal<IRequestCreatedEventData>;

  constructor();

  /** Maximum number of undo steps allowed */
  get maxUndoStep(): number;

  /** Whether signal dispatching is suppressed */
  get suppressed(): boolean;
  set suppressed(value: boolean);

  /** Currently active request */
  get activeRequest(): IRequest | undefined;

  /**
   * Get the latest committed request from the default session
   */
  getLatestCommittedRequest(): IRequest | undefined;

  /**
   * Get the latest committed request from the active session
   */
  getLatestCommittedSessionRequest(): IRequest | undefined;

  /**
   * Clear all sessions and reset to default state
   * @param dispatchSignal - Whether to dispatch undo/redo state changed signal
   */
  clear(dispatchSignal?: boolean): void;

  /**
   * Reset the current undo/redo session
   */
  reset(): void;

  /**
   * Register a request type with its constructor
   * @param type - Request type identifier or array of registration tuples
   * @param constructor - Request constructor
   * @param paramAdapter - Optional parameter adapter function
   */
  register(
    type: string | Array<[string, RequestConstructor, RequestParamAdapter?]>,
    constructor?: RequestConstructor,
    paramAdapter?: RequestParamAdapter
  ): this;

  /**
   * @deprecated Use register instead
   */
  registerNgm(
    type: string | Array<[string, RequestConstructor, RequestParamAdapter?]>,
    constructor?: RequestConstructor,
    paramAdapter?: RequestParamAdapter
  ): this;

  /**
   * Create a request instance
   * @param typeOrConstructor - Request type string or constructor
   * @param args - Request constructor arguments
   * @param dispatchCreatedSignal - Whether to dispatch created signal
   */
  createRequest<T extends IRequest = IRequest>(
    typeOrConstructor: string | RequestConstructor<T>,
    args?: any[],
    dispatchCreatedSignal?: boolean
  ): T | undefined;

  /**
   * Get request constructor by type
   * @param type - Request type identifier
   */
  getReqByType(type: string): RequestConstructor | undefined;

  /**
   * Abort a request
   * @param request - Request to abort
   */
  abort(request: IRequest): void;

  /**
   * Commit a request synchronously
   * @param request - Request to commit
   * @param skipSessionCommit - Whether to skip session commit
   */
  commit(request: IRequest, skipSessionCommit?: boolean): any;

  /**
   * Commit a request asynchronously
   * @param request - Request to commit
   * @param skipSessionCommit - Whether to skip session commit
   */
  commitAsync(request: IRequest, skipSessionCommit?: boolean): Promise<any>;

  /**
   * Execute a transaction
   * @param entity - Entity to transact on
   * @param description - Transaction description
   * @param transactionType - Type of transaction
   * @param options - Additional transaction options
   */
  transact(
    entity: any,
    description?: string,
    transactionType?: EntityTransactionType,
    options?: ITransactionOptions
  ): void;

  /**
   * Start blocking signals (signals will be queued instead of dispatched)
   */
  startBlockSignals(): void;

  /**
   * Stop blocking signals
   */
  stopBlockSignals(): void;

  /**
   * Block a specific signal dispatch
   * @param signal - Signal to block
   * @param data - Signal data
   * @returns Whether the signal was blocked
   */
  blockSignal(signal: Signal<any>, data: any): boolean;

  /**
   * Dispatch all blocked signals
   */
  clearBlockedSignals(): void;

  /**
   * Start a new session
   * @param options - Session configuration options
   * @returns Session control interface
   */
  startSession(options?: ISessionOptions): ISessionControl;

  /**
   * Check if undo operation is available
   */
  canUndo(): boolean;

  /**
   * Check if redo operation is available
   */
  canRedo(): boolean;

  /**
   * Undo the last request
   */
  undo(): void;

  /**
   * Redo the last undone request
   */
  redo(): void;

  /**
   * Get the current number of active sessions
   */
  getSessionCount(): number;

  /**
   * Enable the transaction manager
   */
  enable(): void;

  /**
   * Disable the transaction manager
   */
  disable(): void;

  /**
   * Block undo/redo operations
   */
  blockUndoRedo(): void;

  /**
   * Unblock undo/redo operations
   */
  unblockUndoRedo(): void;

  /**
   * Signal dispatch condition callback
   * @param signal - Signal being dispatched
   * @param data - Signal data
   * @returns Whether the signal should be dispatched
   */
  signalDispatchCondition(signal: Signal<any>, data: any): boolean;

  /**
   * Get the request stack for debugging
   * @param maxDepth - Maximum stack depth to retrieve
   * @returns Array of undo/redo stacks for each session
   */
  getRequestStack(maxDepth?: number): IRequestStack[] | undefined;
}