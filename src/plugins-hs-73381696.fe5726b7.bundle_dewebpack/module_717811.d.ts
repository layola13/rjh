/**
 * User Track Logger Push Signal Module
 * 
 * This module provides a signal-based listener for user tracking events,
 * specifically handling START and END trigger types for grouped tracking events.
 */

/**
 * Log trigger type enumeration
 */
export enum LogTriggerType {
  START = 'START',
  END = 'END'
}

/**
 * Options for tracking events
 */
export interface TrackingOptions {
  /** Type of trigger (START or END) */
  triggerType?: LogTriggerType;
  /** Whether to skip sending the log */
  notSend?: boolean;
  /** Whether to exclude duration calculation */
  noDuration?: boolean;
  /** Optional suffix for action type */
  actionTypeSuffix?: string;
}

/**
 * Parameters for tracking events
 */
export interface TrackingParams {
  /** Event group identifier */
  group?: string;
  /** Actual duration in milliseconds */
  realDuration?: number;
  /** Calculated duration in milliseconds */
  duration?: number;
  /** Additional custom parameters */
  [key: string]: unknown;
}

/**
 * Customized information in log entries
 */
export interface CustomizedLogInfo {
  /** Real duration of the event */
  realDuration?: number;
  /** Calculated duration of the event */
  duration?: number;
}

/**
 * User tracking log entry
 */
export interface UserTrackLog {
  /** Custom information attached to the log */
  customizedInfo?: CustomizedLogInfo;
  /** Additional log properties */
  [key: string]: unknown;
}

/**
 * Event payload for tracking events
 */
export interface TrackingEvent {
  /** Unique action identifier */
  id: string;
  /** Event parameters */
  params?: TrackingParams;
  /** Event options */
  options?: TrackingOptions;
  /** Associated log entry */
  log?: UserTrackLog;
}

/**
 * Payload dispatched through the push signal
 */
export interface PushSignalPayload {
  /** Action type identifier */
  actionType: string;
  /** Event parameters */
  params: TrackingParams;
  /** Event options */
  options: TrackingOptions;
}

/**
 * Signal utility for event dispatching
 */
export interface Signal<T = unknown> {
  /**
   * Dispatch an event to all listeners
   * @param payload - Data to send to listeners
   */
  dispatch(payload: T): void;
  
  /**
   * Add a listener callback
   * @param callback - Function to call when signal is dispatched
   */
  add(callback: (payload: T) => void): void;
  
  /**
   * Remove a listener callback
   * @param callback - Function to remove
   */
  remove(callback: (payload: T) => void): void;
}

/**
 * User track logger interface
 */
export interface UserTrackLogger {
  /**
   * Register an event listener
   * @param eventName - Name of the event to listen for
   * @param handler - Callback function to handle the event
   */
  on(eventName: string, handler: (event: TrackingEvent) => void): void;
  
  /**
   * Unregister an event listener
   * @param eventName - Name of the event
   * @param handler - Callback to remove
   */
  off(eventName: string, handler: (event: TrackingEvent) => void): void;
}

/**
 * Internal manager class for user track push signals
 * Listens to user tracking events and re-dispatches them through a signal
 */
declare class UserTrackPushSignalManager {
  /** User track logger instance */
  private readonly userTrackLogger: UserTrackLogger;
  
  /** Signal for push events */
  readonly pushSignal: Signal<PushSignalPayload>;
  
  /**
   * Handle START trigger events
   * @param event - Tracking event with START trigger
   */
  private listenStart(event: TrackingEvent): void;
  
  /**
   * Handle END trigger events
   * @param event - Tracking event with END trigger
   */
  private listenEnd(event: TrackingEvent): void;
}

/**
 * Listener configuration object
 */
export interface UserTrackPushListener {
  /**
   * Get the signal for listening to push events
   * @returns Signal instance for subscribing to tracking events
   */
  getListenSignal(): Signal<PushSignalPayload>;
  
  /**
   * Process incoming tracking data
   * @param event - Event containing tracking data
   * @returns Array of processed data
   */
  listen(event: { data: unknown }): unknown[];
}

/**
 * Default export: Array of user track push listeners
 * 
 * Provides a singleton listener that:
 * - Monitors user tracking events (START/END triggers)
 * - Filters events with group parameters
 * - Re-dispatches them through a signal for consumption
 * 
 * @example
 *