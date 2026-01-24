/**
 * Save process plugin that tracks and monitors design save operations
 * Handles both manual saves and auto-saves with detailed logging and analytics
 */

import { SaveProcessPlugin } from './SaveProcessPlugin';

/**
 * Information about a save operation
 */
interface SaveInfo {
  /** Timestamp when the save operation began */
  begin: number;
}

/**
 * Parameters for a save operation
 */
interface SaveParams {
  /** Unique identifier for tracking this save operation */
  saveTraceId: string;
  /** Whether this is a "save as" operation */
  isSaveas?: boolean;
}

/**
 * Return data from a save operation
 */
interface SaveReturnData {
  /** HTTP status code or operation status */
  status?: number | string;
  /** Timestamp of the operation */
  time?: number;
  /** Error information if the save failed */
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  /** Original HTTP result */
  originalResult?: {
    status: number;
    readyState?: number;
    isTrusted?: boolean;
  };
  /** Type of error that occurred */
  errorType?: string;
}

/**
 * Event data for save operations
 */
interface SaveEventData {
  /** Save operation parameters */
  saveParams: SaveParams;
  /** Return data from save operation */
  saveReturnData?: SaveReturnData;
  /** Stage name in the save process */
  stageName?: string;
  /** Type of process step */
  processType?: string;
  /** Additional data */
  data?: unknown;
}

/**
 * Event object passed to save handlers
 */
interface SaveEvent {
  data: SaveEventData;
}

/**
 * Logger interface for recording save operations
 */
interface Logger {
  info(message: string, category?: string, isImportant?: boolean): void;
  debug(message: string): void;
}

/**
 * Analytics tracker interface
 */
interface EventTracker {
  track(group: string, eventName: string, properties: Record<string, unknown>): void;
  api(endpoint: string, properties: Record<string, unknown>): void;
}

/**
 * Error matcher for categorizing save failures
 */
interface ErrorMatcher {
  /** Name/identifier for this error type */
  name: string;
  /** Test if the error matches this category */
  test(error: SaveReturnData): boolean;
  /** Get analytics information for this error */
  getInfo(error: SaveReturnData): {
    id: string;
    info: {
      success: boolean;
      code: string;
      message: SaveReturnData;
      unique: boolean;
      time?: number;
    };
  };
}

/**
 * Save handler with signals for various save events
 */
interface SaveHandler {
  signalSaveStart: Signal;
  signalSaveProcess: Signal;
  signalSaveSucceeded: Signal;
  signalSaveFailed: Signal;
  signalAutoSaveStart: Signal;
  signalAutoSaveSucceeded: Signal;
  signalAutoSaveFailed: Signal;
}

/**
 * Signal interface for event subscription
 */
interface Signal {
  listen(handler: (event: SaveEvent) => void, context: unknown): void;
}

/**
 * Options for creating a SaveProcessPluginImpl
 */
interface SaveProcessPluginOptions {
  saveHandler: SaveHandler;
}

/**
 * Default export: Factory function that creates a SaveProcessPlugin implementation
 * @param BaseClass - The base SaveProcessPlugin class to extend
 * @returns A class that extends SaveProcessPlugin with save tracking functionality
 */
export default function createSaveProcessPlugin(
  BaseClass: typeof SaveProcessPlugin
): typeof SaveProcessPluginImpl;

/**
 * Implementation of SaveProcessPlugin that monitors and logs save operations
 */
declare class SaveProcessPluginImpl extends SaveProcessPlugin {
  /** Map of save trace IDs to their metadata */
  private saveInfo: Record<string, SaveInfo>;
  
  /** Logger instance for recording operations */
  private logger: Logger;

  /**
   * Creates a new SaveProcessPluginImpl
   * @param options - Configuration options including the save handler
   */
  constructor(options: SaveProcessPluginOptions);

  /**
   * Called when a manual save operation starts
   * @param event - Event containing save parameters
   */
  private startSave(event: SaveEvent): void;

  /**
   * Called during save processing to track progress
   * @param event - Event containing stage and process information
   */
  private saveProcess(event: SaveEvent): void;

  /**
   * Called when a manual save succeeds
   * @param event - Event containing save result data
   */
  private saveSucceeded(event: SaveEvent): void;

  /**
   * Called when a manual save fails
   * @param event - Event containing error information
   */
  private saveFailed(event: SaveEvent): void;

  /**
   * Called when an auto-save operation starts
   * @param event - Event containing save parameters
   */
  private startAutoSave(event: SaveEvent): void;

  /**
   * Called when an auto-save succeeds
   * @param event - Event containing save result data
   */
  private autoSaveSucceeded(event: SaveEvent): void;

  /**
   * Called when an auto-save fails
   * @param event - Event containing error information
   */
  private autoSaveFailed(event: SaveEvent): void;
}

/**
 * Error matchers for categorizing different types of save failures
 * Used to route errors to appropriate analytics endpoints
 */
declare const ERROR_MATCHERS: readonly ErrorMatcher[];