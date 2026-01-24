/**
 * Calendar event visual positioning and overlap detection utilities
 * @module VCalendar/modes/common
 */

/**
 * Visual representation of a calendar event with positioning information
 */
export interface EventVisual<T = any> {
  /** The original event data */
  event: T;
  /** Total number of columns in the current group */
  columnCount: number;
  /** Column index for this event (0-based) */
  column: number;
  /** Left position percentage (0-100) */
  left: number;
  /** Width percentage (0-100) */
  width: number;
}

/**
 * Calendar event with timestamp identifiers
 */
export interface CalendarEvent {
  /** Start timestamp identifier (Unix timestamp in milliseconds) */
  startTimestampIdentifier: number;
  /** End timestamp identifier (Unix timestamp in milliseconds) */
  endTimestampIdentifier: number;
  /** Start date identifier */
  startIdentifier: number;
  /** End date identifier */
  endIdentifier: number;
}

/**
 * Group of overlapping event visuals
 */
export interface OverlapGroup<T = any> {
  /** Start timestamp of the group */
  start: number;
  /** End timestamp of the group */
  end: number;
  /** Array of event visuals in this group */
  visuals: EventVisual<T>[];
}

/**
 * Timestamp with weekday information
 */
export interface Timestamp {
  /** Day of the week (0-6) */
  weekday: number;
  [key: string]: any;
}

/**
 * Handler for managing overlap groups across multiple events
 */
export interface OverlapGroupHandler<T = any> {
  /** Array of overlap groups */
  groups: OverlapGroup<T>[];
  /** Minimum timestamp across all groups */
  min: number;
  /** Maximum timestamp across all groups */
  max: number;
  /** Resets the handler state */
  reset(): void;
  /**
   * Process visuals for a given timestamp and events
   * @param timestamp - Current timestamp context
   * @param events - Array of calendar events to process
   * @param useTimestamp - Whether to use timestamp identifiers (true) or day identifiers (false)
   * @param forceReset - Force reset before processing
   * @returns Array of event visuals with positioning information
   */
  getVisuals(
    timestamp: Timestamp,
    events: CalendarEvent[],
    useTimestamp: boolean,
    forceReset?: boolean
  ): EventVisual<CalendarEvent>[];
}

/**
 * Converts calendar events to visual representations with initial positioning
 * @param events - Array of calendar events
 * @param baseTimestamp - Base timestamp for comparison (default: 0)
 * @returns Sorted array of event visuals
 */
export function getVisuals<T extends CalendarEvent>(
  events: T[],
  baseTimestamp?: number
): EventVisual<T>[];

/**
 * Checks if two time ranges overlap
 * @param start1 - Start of first range
 * @param end1 - End of first range
 * @param start2 - Start of second range
 * @param end2 - End of second range
 * @param inclusive - Whether to treat boundary equality as overlap (default: true)
 * @returns True if ranges overlap, false otherwise
 */
export function hasOverlap(
  start1: number,
  end1: number,
  start2: number,
  end2: number,
  inclusive?: boolean
): boolean;

/**
 * Updates column count for all visuals in overlap groups
 * @param groups - Array of overlap groups
 */
export function setColumnCount<T = any>(groups: OverlapGroup<T>[]): void;

/**
 * Extracts timestamp range from a calendar event
 * @param event - Calendar event
 * @returns Tuple of [startTimestamp, endTimestamp]
 */
export function getRange(event: CalendarEvent): [number, number];

/**
 * Extracts day identifier range from a calendar event
 * @param event - Calendar event
 * @returns Tuple of [startIdentifier, endIdentifier]
 */
export function getDayRange(event: CalendarEvent): [number, number];

/**
 * Normalizes event range to fit within a day boundary
 * @param event - Calendar event
 * @param dayStart - Start timestamp of the day
 * @returns Tuple of [normalizedStart, normalizedEnd] clamped to day boundaries
 */
export function getNormalizedRange(
  event: CalendarEvent,
  dayStart: number
): [number, number];

/**
 * Finds an existing overlap group that doesn't conflict with the given range
 * @param groups - Array of overlap groups to search
 * @param start - Start of the range
 * @param end - End of the range
 * @param useTimestamp - Whether to use timestamp identifiers (true) or day identifiers (false)
 * @returns Index of the first non-overlapping group, or -1 if all groups overlap
 */
export function getOpenGroup<T = any>(
  groups: OverlapGroup<T>[],
  start: number,
  end: number,
  useTimestamp: boolean
): number;

/**
 * Creates a handler for managing overlap groups across calendar events
 * @param weekday - Target weekday for filtering (0-6)
 * @returns Overlap group handler instance
 */
export function getOverlapGroupHandler<T extends CalendarEvent>(
  weekday: number
): OverlapGroupHandler<T>;