/**
 * Behavior tracking module
 * Sends behavior event data to analytics/logging system
 */

/**
 * Behavior event data structure
 */
interface BehaviorEventData {
  /** The behavior identifier or event name */
  behavior: string | Record<string, unknown>;
  /** Additional event properties */
  [key: string]: unknown;
}

/**
 * Context interface for behavior tracking method
 */
interface BehaviorTrackingContext {
  /**
   * Optional hook called before sending behavior data
   * @param eventType - The type of event being sent (e.g., "behavior")
   * @param data - The normalized behavior event data
   * @returns void or a value indicating whether to proceed
   */
  beforeSend?(eventType: string, data: BehaviorEventData): void | boolean;

  /**
   * Internal logging/tracking method
   * @param eventType - The type of event
   * @param data - The event data payload
   * @param priority - Event priority level (1 = high priority)
   * @returns The result of the logging operation
   */
  _lg(eventType: string, data: BehaviorEventData, priority: number): unknown;
}

/**
 * Tracks a behavior event
 * @param eventData - Either a behavior string/object, or an object containing a behavior property
 * @returns The result from the internal logging method
 * 
 * @example
 *