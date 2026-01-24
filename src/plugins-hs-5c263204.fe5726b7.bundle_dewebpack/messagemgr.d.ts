/**
 * Message Manager Module
 * Handles operation queue execution and message processing for HomeGPT operations
 */

import { HistoryMsgManager } from './HistoryMsgManager';

/**
 * Operation execution status
 */
type OperationStatus = 'success' | 'fail';

/**
 * Parsed operation message parameters
 */
interface OperationParams {
  /** Query modification string */
  modifyQuery?: string;
  [key: string]: unknown;
}

/**
 * Parsed message structure from AI response
 */
interface ParsedMessage {
  /** Unique operation type identifier */
  operationType: string;
  /** Reply text to display to user */
  reply: string;
  /** Operation parameters */
  params?: OperationParams;
  /** Execution priority (lower = higher priority) */
  priority: number;
  /** Indicates if operation is required for flow continuation */
  required?: boolean;
}

/**
 * Base interface for all operation implementations
 */
interface IOperation {
  /**
   * Get unique operation identifier
   */
  getId(): string;
  
  /**
   * Execute the operation with provided callbacks
   * @param msg - Parsed message containing operation details
   * @param onBegin - Called when operation starts
   * @param onEnd - Called when operation completes
   * @param onSelect - Called when user selection is needed
   * @param onProcess - Called during operation progress
   */
  execute(
    msg: ParsedMessage,
    onBegin: (msg: ParsedMessage) => void,
    onEnd: (status: OperationStatus, reply: string, msg?: ParsedMessage) => void,
    onSelect: (msg: ParsedMessage) => void,
    onProcess: (msg: ParsedMessage) => void
  ): void;
}

/**
 * Operation constructor interface
 */
interface IOperationConstructor {
  new(): IOperation;
  getId(): string;
  createMockMessage(): ParsedMessage | ParsedMessage[];
}

/**
 * Operation task queued for execution
 */
interface OperationTask {
  /** Operation instance */
  op: IOperation;
  /** Message to process */
  msg: ParsedMessage;
}

/**
 * Callback invoked when operation begins
 */
type OnOperationBeginCallback = (msg: ParsedMessage) => void;

/**
 * Callback invoked when operation ends
 * @param isLast - True if this is the last operation in queue
 * @param status - Operation execution status
 * @param reply - Reply message
 * @param msg - Original message (optional)
 */
type OnOperationEndCallback = (
  isLast: boolean,
  status: OperationStatus,
  reply: string,
  msg?: ParsedMessage
) => void;

/**
 * Callback invoked during operation progress
 */
type OnOperationProcessCallback = (msg: ParsedMessage) => void;

/**
 * Callback invoked when user selection is required
 */
type OnOperationSelectCallback = (msg: ParsedMessage) => void;

/**
 * MessageMgr - Core message and operation queue manager
 * Singleton responsible for parsing, queuing, and executing HomeGPT operations
 */
declare class MessageMgr {
  /** Maps operation IDs to operation class names */
  private readonly opNameTable: Map<string, string>;
  
  /** Queue of pending operation tasks */
  private opTaskQueue: OperationTask[];
  
  /** Operation start callback */
  private _scb?: OnOperationBeginCallback;
  
  /** Operation finish callback */
  private _fcb?: OnOperationEndCallback;
  
  /** Operation progress callback */
  private _pcb?: OnOperationProcessCallback;
  
  /** Operation selection callback */
  private _selCb?: OnOperationSelectCallback;
  
  /** History message manager instance */
  private readonly _hisMsgMgr: HistoryMsgManager;

  /**
   * Create operation instance by operation type ID
   * @param operationType - Unique operation type identifier
   * @returns Operation instance or undefined if not found
   */
  private _createOperation(operationType: string): IOperation | undefined;

  /**
   * Create mock operation message for testing
   * @param operationType - Unique operation type identifier
   * @returns Mock message or undefined if operation not found
   */
  private _createMockOperationMessage(operationType: string): ParsedMessage | ParsedMessage[] | undefined;

  /**
   * Internal handler for operation begin event
   * @param msg - Operation message
   */
  private _OnOperationBegin(msg: ParsedMessage): void;

  /**
   * Internal handler for operation progress event
   * @param msg - Operation message
   */
  private _OnOperationProcess(msg: ParsedMessage): void;

  /**
   * Internal handler for operation end event
   * @param status - Operation execution status
   * @param reply - Reply message
   * @param msg - Original message (optional)
   */
  private _OnOperationEnd(status: OperationStatus, reply: string, msg?: ParsedMessage): void;

  /**
   * Clear all running operation state and callbacks
   */
  private _clearRunningOp(): void;

  /**
   * Execute next task in operation queue
   */
  private _runningOpTask(): void;

  /**
   * Execute parsed message operations
   * @param message - Raw message string to parse and execute
   * @param onBegin - Callback when operation starts
   * @param onEnd - Callback when operation completes
   * @param onSelect - Callback when user selection needed
   * @param onProcess - Callback during operation progress
   * @returns True if execution started successfully, false otherwise
   */
  execute(
    message: string,
    onBegin: OnOperationBeginCallback,
    onEnd: OnOperationEndCallback,
    onSelect: OnOperationSelectCallback,
    onProcess: OnOperationProcessCallback
  ): boolean;

  /**
   * Test operation with mock data
   * @param operationType - Operation type to test
   * @param onBegin - Callback when operation starts
   * @param onEnd - Callback when operation completes
   * @param onSelect - Callback when user selection needed
   * @param onProcess - Callback during operation progress
   * @returns True if test started successfully, false otherwise
   */
  testOperation(
    operationType: string,
    onBegin: OnOperationBeginCallback,
    onEnd: OnOperationEndCallback,
    onSelect: OnOperationSelectCallback,
    onProcess: OnOperationProcessCallback
  ): boolean;
}

/**
 * Singleton MessageMgr instance
 * @public
 */
export declare const MessageMgr: MessageMgr;