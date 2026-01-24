/**
 * Transaction manager listener configuration module
 * Handles transaction lifecycle events (creation and commitment)
 */

import { createLogData } from './module_858122';
import { HSConstants } from './module_635589';

/**
 * Request types that should be excluded from logging
 */
const EXCLUDED_REQUEST_TYPES: string[] = [HSConstants.RequestType.Composite];

/**
 * Parameters returned by getCurrentParams method
 */
interface CurrentParams {
  /** Active section identifier */
  activeSection?: string;
  /** Human-readable name of the active section */
  activeSectionName?: string;
  /** Click ratio statistics for the section */
  clicksRatio?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Request object interface
 */
interface Request {
  /** Type identifier of the request */
  type: string;
  /**
   * Check if the request is interactive
   * @returns True if the request requires user interaction
   */
  isInteractive(): boolean;
  /**
   * Get human-readable description of the request
   * @returns Description string or undefined
   */
  getDescription(): string | undefined;
  /**
   * Get the category/group of the request
   * @returns Category identifier
   */
  getCategory(): string;
  /**
   * Get current parameters of the request (optional method)
   * @returns Current parameters object or undefined
   */
  getCurrentParams?(): CurrentParams | undefined;
}

/**
 * Transaction data structure
 */
interface TransactionData {
  /** The request object associated with this transaction */
  request?: Request;
}

/**
 * Signal event data
 */
interface SignalEventData {
  /** Transaction data payload */
  data: TransactionData;
}

/**
 * Transaction manager interface
 */
interface TransactionManager {
  /** Signal emitted when a transaction is created */
  signalCreated: unknown;
  /** Signal emitted when a transaction is committed */
  signalCommitted: unknown;
}

/**
 * Command manager interface
 */
interface CommandManager {
  /** Current active command */
  current: unknown;
}

/**
 * HSApp application interface
 */
interface HSAppInstance {
  /** Command manager instance */
  cmdManager: CommandManager;
}

/**
 * Global HSApp namespace
 */
declare global {
  namespace HSApp {
    namespace App {
      /**
       * Get the application instance
       * @returns Application instance
       */
      function getApp(): HSAppInstance;
    }
  }
}

/**
 * Listener context interface
 */
interface ListenerContext {
  /** Transaction manager instance */
  transManager: TransactionManager;
}

/**
 * Log data options
 */
interface LogDataOptions {
  /** Description of the operation */
  description: string;
  /** Group/category of the operation */
  group: string;
  /** Active section identifier (optional) */
  activeSection?: string;
  /** Active section name (optional) */
  activeSectionName?: string;
  /** Click ratio statistics (optional) */
  clicksRatio?: Record<string, unknown>;
}

/**
 * Log data result type
 */
type LogData = unknown;

/**
 * Transaction listener configuration
 */
interface TransactionListener {
  /**
   * Get the signal to listen to
   * @param context - Listener context
   * @returns Signal object to attach listener to
   */
  getListenSignal(context: ListenerContext): unknown;
  
  /**
   * Handle signal event
   * @param event - Signal event data
   * @returns Array of log data entries or undefined
   */
  listen(event: SignalEventData): LogData[] | undefined;
}

/**
 * Default fallback description for operations without description
 */
const DEFAULT_DESCRIPTION = '需要添加操作描述';

/**
 * Transaction lifecycle listeners
 * Exports listeners for transaction creation and commitment events
 */
declare const listeners: TransactionListener[];

export default listeners;