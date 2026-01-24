/**
 * Feedback Plugin for EZHome Floor Plan
 * Provides feedback collection, management, and display functionality
 */

import { HSCore } from './hs-core';
import { HSApp } from './hs-app';
import { HSFPConstants } from './hs-fp-constants';

/**
 * Configuration options for showing feedback entry
 */
interface FeedbackEntryOptions {
  /** Whether to log this feedback entry */
  isLog?: boolean;
  /** Additional custom properties */
  [key: string]: unknown;
}

/**
 * Data structure for help center feedback records
 */
interface HelpCenterFeedbackRecordData {
  [key: string]: unknown;
}

/**
 * Options for displaying feedback list
 */
interface FeedbackListOptions {
  [key: string]: unknown;
}

/**
 * Data item for handling feedback entries
 */
interface FeedbackEntryDataItem {
  [key: string]: unknown;
}

/**
 * Data item for submit data handling
 */
interface SubmitDataHandleItem {
  [key: string]: unknown;
}

/**
 * Dependencies required by the feedback handler
 */
interface FeedbackHandlerDependencies {
  [key: string]: unknown;
}

/**
 * Initialization options for feedback handler
 */
interface FeedbackHandlerInitOptions {
  /** Plugin dependencies */
  dependencies: FeedbackHandlerDependencies;
  /** Application instance */
  app: HSApp.Application;
  /** Signal for feedback record count changes */
  signalFeedbackRecordCountNumber: HSCore.Util.Signal;
}

/**
 * Handler class for feedback operations
 */
declare class FeedbackHandler {
  /**
   * Initialize the feedback handler
   * @param options - Initialization options
   */
  init(options: FeedbackHandlerInitOptions): void;

  /**
   * Display feedback entry dialog
   * @param options - Options for feedback entry display
   */
  showFeedbackEntry(options: FeedbackEntryOptions): void;

  /**
   * Set help center feedback record data
   * @param data - Feedback record data
   */
  setHelpCenterFeedbackRecordData(data: HelpCenterFeedbackRecordData): void;

  /**
   * Display feedback list
   * @param options - Options for feedback list display
   */
  showFeedbackList(options: FeedbackListOptions): void;

  /**
   * Get current feedback count number
   * @returns The count number or undefined
   */
  getCountNumber(): number | undefined;

  /**
   * Add a handling feedback entry data item
   * @param item - Feedback entry data item to add
   */
  addHandlingFeedbackEntryDataItem(item: FeedbackEntryDataItem): void;

  /**
   * Delete a feedback entry data item
   * @param item - Feedback entry data item to delete
   */
  deleteFeedbackEntryDataItem(item: FeedbackEntryDataItem): void;

  /**
   * Get handling feedback entry data items
   * @returns Array of feedback entry data items or undefined
   */
  getHandlingFeedbackEntryDataItem(): FeedbackEntryDataItem[] | undefined;

  /**
   * Add a submit data handle item
   * @param item - Submit data handle item to add
   */
  addSubmitDataHandleItem(item: SubmitDataHandleItem): void;

  /**
   * Delete a submit data handle item
   * @param item - Submit data handle item to delete
   */
  deleteSubmitDataHandleItem(item: SubmitDataHandleItem): void;

  /**
   * Get submit data handle items
   * @returns Array of submit data handle items or undefined
   */
  getSubmitDataHandleItem(): SubmitDataHandleItem[] | undefined;
}

/**
 * EZHome Feedback Plugin v2
 * Main plugin class for managing feedback functionality in floor plans
 */
declare class FeedbackPlugin extends HSApp.Plugin.IPlugin {
  /** Internal feedback handler instance */
  private handler?: FeedbackHandler;

  /** Signal emitted when feedback record count changes */
  readonly signalFeedbackRecordCountNumber: HSCore.Util.Signal;

  /**
   * Create a new feedback plugin instance
   */
  constructor();

  /**
   * Called when plugin is activated
   * @param context - Plugin context
   * @param dependencies - Plugin dependencies
   */
  onActive(context: { app: HSApp.Application }, dependencies: FeedbackHandlerDependencies): void;

  /**
   * Called when plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Show feedback entry dialog
   * @param options - Options for feedback entry (defaults to isLog: true if not specified)
   */
  showFeedbackEntry(options?: FeedbackEntryOptions): void;

  /**
   * Set help center feedback record data
   * @param data - Feedback record data to set
   */
  setHelpCenterFeedbackRecordData(data: HelpCenterFeedbackRecordData): void;

  /**
   * Show feedback list view
   * @param options - Options for feedback list display
   */
  showFeedbackList(options: FeedbackListOptions): void;

  /**
   * Get current feedback count number
   * @returns The count number or undefined if handler not initialized
   */
  getCountNumber(): number | undefined;

  /**
   * Add a handling feedback entry data item
   * @param item - Feedback entry data item to add
   */
  addHandlingFeedbackEntryDataItem(item: FeedbackEntryDataItem): void;

  /**
   * Delete a feedback entry data item
   * @param item - Feedback entry data item to delete
   */
  deleteFeedbackEntryDataItem(item: FeedbackEntryDataItem): void;

  /**
   * Get handling feedback entry data items
   * @returns Array of feedback entry data items or undefined if handler not initialized
   */
  getHandlingFeedbackEntryDataItem(): FeedbackEntryDataItem[] | undefined;

  /**
   * Add a submit data handle item
   * @param item - Submit data handle item to add
   */
  addSubmitDataHandleItem(item: SubmitDataHandleItem): void;

  /**
   * Delete a submit data handle item
   * @param item - Submit data handle item to delete
   */
  deleteSubmitDataHandleItem(item: SubmitDataHandleItem): void;

  /**
   * Get submit data handle items
   * @returns Array of submit data handle items or undefined if handler not initialized
   */
  getSubmitDataHandleItem(): SubmitDataHandleItem[] | undefined;
}

export { FeedbackPlugin, FeedbackHandler, FeedbackEntryOptions, HelpCenterFeedbackRecordData, FeedbackListOptions, FeedbackEntryDataItem, SubmitDataHandleItem };