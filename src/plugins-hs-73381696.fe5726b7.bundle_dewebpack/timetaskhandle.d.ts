/**
 * Performance timing task handler for tracking action durations
 * @module TimeTaskHandle
 */

/**
 * Task configuration for starting a time-tracked action
 */
export interface TaskStartConfig {
  /** Unique identifier for the action type being tracked */
  actionType: string;
  /** Additional parameters to log with the action */
  params?: Record<string, unknown>;
  /** Optional configuration for the performance logger */
  options?: PerformanceLoggerOptions;
}

/**
 * Task configuration for ending a time-tracked action
 */
export interface TaskEndConfig {
  /** Unique identifier for the action type being tracked */
  actionType: string;
  /** Additional parameters to log with the action */
  params?: Record<string, unknown>;
  /** Optional configuration for the performance logger */
  options?: PerformanceLoggerOptions;
}

/**
 * Options for performance logger configuration
 */
export interface PerformanceLoggerOptions {
  /** Whether to enable notes in the log */
  enableNotes?: boolean;
  /** Optional suffix to append to action type */
  actionTypeSuffix?: string;
  /** Additional custom options */
  [key: string]: unknown;
}

/**
 * Internal task tracking data
 */
interface TaskTrackingData {
  /** Timestamp when the task started (from performance.now()) */
  time: number;
  /** Optional timer ID for delayed logging */
  timer?: number;
}

/**
 * Map of active tasks being tracked
 */
type TaskMap = Record<string, TaskTrackingData>;

/**
 * Handles time-based performance tracking for actions.
 * Implements singleton pattern to ensure single instance across application.
 * Tracks action start/end times and logs performance metrics after a 1-second threshold.
 */
export declare class TimeTaskHandle {
  /** Singleton instance of TimeTaskHandle */
  private static timeTaskHandle?: TimeTaskHandle;

  /** Internal map storing active task timing data */
  private taskMap: TaskMap;

  /**
   * Private constructor - use getTimeTaskHandle() to obtain instance
   */
  private constructor();

  /**
   * Retrieves the singleton instance of TimeTaskHandle
   * @returns The singleton TimeTaskHandle instance
   */
  static getTimeTaskHandle(): TimeTaskHandle;

  /**
   * Starts tracking a timed action. If the action is already being tracked,
   * resets its start time to the current timestamp.
   * 
   * @param config - Configuration object containing action type, params, and options
   * @example
   *