/**
 * Handler module for managing marking system operations
 * Original Module ID: 856699
 */

import { MarkingHistory } from './MarkingHistory';
import { MarkingSystemEntry } from './MarkingSystemEntry';

/**
 * Signal payload type for marking log events
 */
interface MarkingLogSignalPayload {
  /** Event type: 'open' | 'close' | 'submit' */
  type: 'open' | 'close' | 'submit';
}

/**
 * Initialization options for Handler
 */
interface HandlerInitOptions {
  /** Application context */
  context: unknown;
  /** Application instance */
  app: unknown;
  /** Handler dependencies */
  dependencies: unknown;
}

/**
 * Marking history record structure
 */
interface MarkingRecord {
  // Define specific properties based on your marking record structure
  [key: string]: unknown;
}

/**
 * Signal class for dispatching marking events
 */
declare class Signal<T = unknown> {
  dispatch(payload: T): void;
}

/**
 * Handler class for managing marking system functionality
 * Handles dialog interactions, marking history, and case entry rendering
 */
export declare class Handler {
  /**
   * Internal marking history instance
   * @private
   */
  private _markingHistory: MarkingHistory;

  /**
   * React component instance for case entry widget
   * @private
   */
  private _caseEntryWidget: React.Component | undefined;

  /**
   * External dependencies injected during initialization
   */
  public dependencies: unknown;

  /**
   * Application context
   * @private
   */
  private _context: unknown;

  /**
   * Application instance reference
   * @private
   */
  private _app: unknown;

  /**
   * Signal for dispatching marking log events
   */
  public signalMarkingToLog: Signal<MarkingLogSignalPayload>;

  /**
   * Creates a new Handler instance
   * Initializes marking history and signal instances
   */
  constructor();

  /**
   * Handles dialog close event
   * Dispatches 'close' event to marking log signal
   */
  handleDialogClose(): void;

  /**
   * Handles dialog submit event
   * Dispatches 'submit' event to marking log signal
   * @param event - Submit event data
   */
  handleDialogSubmit(event: unknown): void;

  /**
   * Initializes the handler with required options
   * @param options - Initialization options containing context, app, and dependencies
   */
  init(options: HandlerInitOptions): void;

  /**
   * Renders the case entry widget into the DOM
   * Dispatches 'open' event and mounts React component
   */
  renderCaseEntry(): void;

  /**
   * Adds a new record to the marking history
   * @param record - Marking record to be added
   */
  addMarkingHistory(record: MarkingRecord): void;

  /**
   * Retrieves all marking history records
   * @returns Array of marking records
   */
  getMarkingHistory(): MarkingRecord[];
}