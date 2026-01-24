/**
 * Day Header Module
 * 
 * Module for managing day header events in a calendar or scheduling system.
 * Combines events from multiple sources and applies optional transformations.
 * 
 * @module day-header
 */

/**
 * Event data structure for a single day
 */
export interface DayEvent {
  /** Event identifier */
  id: string | number;
  /** Event title or description */
  title: string;
  /** Event start timestamp */
  startTime: Date | string | number;
  /** Event end timestamp */
  endTime: Date | string | number;
  /** Additional event metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Function to retrieve all events for a given day
 * 
 * @param date - The target date to query events for
 * @returns Array of events for the specified day
 */
export type GetEventsForDayAll = (date: Date | string | number) => DayEvent[];

/**
 * Function to generate a day event from raw data
 * 
 * @param data - Raw event data to transform
 * @returns A formatted DayEvent object
 */
export type GenDayEvent = (data: unknown) => DayEvent;

/**
 * Optional transformation function to process events
 * 
 * @param events - Array of events to transform
 * @returns Transformed array of events, or null/undefined if no transformation applied
 */
export type EventTransformer = (events: DayEvent[]) => DayEvent[] | null | undefined;

/**
 * Processes and combines day events from multiple sources
 * 
 * This function:
 * 1. Retrieves base events using the provided date parameter
 * 2. Optionally applies a transformation function if available
 * 3. Concatenates transformed events with base events
 * 
 * @param dateParam - The date parameter to query events for
 * @param getEventsForDayAll - Function to retrieve all events for the day
 * @param genDayEvent - Function to generate/format day events
 * @param enableFlag - Boolean flag to enable/disable certain processing (set to false in this module)
 * @param transformerFn - Optional transformer function to process events
 * @returns Combined and processed array of day events, or null if no events found
 */
export function processDayHeaderEvents(
  dateParam: Date | string | number,
  getEventsForDayAll: GetEventsForDayAll,
  genDayEvent: GenDayEvent,
  enableFlag: boolean,
  transformerFn?: EventTransformer
): DayEvent[] | null;

/**
 * Main module function (default export)
 * 
 * Creates a closure that processes day header events with pre-configured handlers.
 * The function retrieves events using `getEventsForDayAll` and `genDayEvent`,
 * then optionally applies a transformer function before returning the result.
 * 
 * @param dateParam - The date parameter for which to retrieve and process events
 * @returns Array of processed DayEvent objects, or null if no events exist
 */
export default function(dateParam: Date | string | number): DayEvent[] | null;