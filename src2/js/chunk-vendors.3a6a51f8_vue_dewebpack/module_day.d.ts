/**
 * Day module - handles day-based event operations
 */

/** Represents a day identifier (could be Date, string, or number) */
type DayIdentifier = Date | string | number;

/** Represents an event item */
interface DayEvent {
  // Add specific event properties based on your domain
  id?: string | number;
  title?: string;
  date?: Date;
  [key: string]: unknown;
}

/** Configuration object for day event processing */
interface DayEventConfig {
  /** Retrieves events for a specific day */
  getEventsForDay: (day: DayIdentifier) => DayEvent[] | null;
  
  /** Generates a day event */
  genDayEvent: (day: DayIdentifier) => DayEvent;
  
  /** Indicates if "more" functionality is enabled */
  eventMore: boolean;
  
  /** Generates a "more" event item */
  genMore: (day: DayIdentifier) => DayEvent;
}

/**
 * Processes day events with optional additional processing
 * @param day - The day to process events for
 * @param config - Configuration object containing event handlers
 * @param additionalProcessor - Optional function to process additional events
 * @returns Array of day events or null
 */
declare function processDayEvents(
  day: DayIdentifier,
  config: DayEventConfig,
  additionalProcessor?: ((day: DayIdentifier) => DayEvent[] | null) | null
): DayEvent[] | null;

export { DayIdentifier, DayEvent, DayEventConfig, processDayEvents };