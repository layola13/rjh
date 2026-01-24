/**
 * Module: module_day
 * Original ID: day
 */

/**
 * Generates and retrieves events for a specific day, optionally including a "more" indicator
 * and additional custom events.
 * 
 * @param date - The target date for which to retrieve events
 * @returns Array of events for the specified day, or undefined if no events exist
 */
declare function getDayEvents(date: Date | string | number): DayEvent[] | undefined;

/**
 * Represents a single event within a day
 */
interface DayEvent {
  /** Event identifier */
  id: string | number;
  /** Event title/name */
  title: string;
  /** Event start time */
  startTime?: Date | string;
  /** Event end time */
  endTime?: Date | string;
  /** Additional event metadata */
  [key: string]: unknown;
}

/**
 * Configuration object for day event processing
 */
interface DayEventConfig {
  /** Function to retrieve events for a specific day */
  getEventsForDay: (date: Date | string | number) => DayEvent[] | undefined;
  
  /** Function to generate/transform a day event */
  genDayEvent: (event: unknown) => DayEvent;
  
  /** Whether to show "more events" indicator when event count exceeds threshold */
  eventMore: boolean;
  
  /** Function to generate "more events" indicator event */
  genMore: (date: Date | string | number) => DayEvent;
}

/**
 * Optional custom event processor function
 * @param date - The target date
 * @returns Additional custom events for the date, or undefined
 */
type CustomEventProcessor = (date: Date | string | number) => DayEvent[] | undefined;

/**
 * Core function that processes events for a given date
 * @param date - Target date
 * @param getEventsForDay - Function to retrieve base events
 * @param genDayEvent - Function to generate/transform events
 * @param includeTime - Whether to include time information (unused in this context)
 * @returns Array of processed events or undefined
 */
declare function processEvents(
  date: Date | string | number,
  getEventsForDay: DayEventConfig['getEventsForDay'],
  genDayEvent: DayEventConfig['genDayEvent'],
  includeTime: boolean
): DayEvent[] | undefined;