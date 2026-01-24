/**
 * Groups visual events by time intervals, managing column assignments and time ranges.
 * Processes events to detect overlaps and organize them into non-conflicting groups.
 * 
 * @module module_getVisuals
 * @originalId getVisuals
 */

/**
 * Represents a visual event with positioning information
 */
interface VisualEvent {
  /** The underlying event data */
  event: unknown;
  /** The assigned column index for layout positioning */
  column: number;
}

/**
 * Represents a group of visual events that share a time range
 */
interface VisualGroup {
  /** Start timestamp of the group */
  start: number;
  /** End timestamp of the group */
  end: number;
  /** Collection of visual events in this group */
  visuals: VisualEvent[];
}

/**
 * Internal state tracker for visual grouping operations
 */
interface GroupTracker {
  /** Array of visual groups */
  groups: VisualGroup[];
  /** Minimum timestamp across all groups */
  min: number;
  /** Maximum timestamp across all groups */
  max: number;
  /** Resets the tracker to initial state */
  reset(): void;
}

/**
 * Processes and groups visual events based on time intervals.
 * Handles collision detection and column assignment for layout purposes.
 * 
 * @param weekdayData - Object containing weekday information
 * @param sourceData - Source data to be processed
 * @param shouldReset - Whether to reset state after processing
 * @param forceReset - Forces reset regardless of weekday state (default: false)
 * @returns Array of processed visual events with column assignments
 */
declare function getVisuals(
  weekdayData: { weekday?: unknown },
  sourceData: unknown,
  shouldReset: boolean,
  forceReset?: boolean
): VisualEvent[];

/**
 * Checks if a time interval overlaps with an existing range
 * 
 * @param startTime - Start of the interval to check
 * @param endTime - End of the interval to check
 * @param minTime - Minimum time of the existing range
 * @param maxTime - Maximum time of the existing range
 * @param resetMode - Whether operating in reset mode
 * @returns True if intervals overlap, false otherwise
 */
declare function checkOverlap(
  startTime: number,
  endTime: number,
  minTime: number,
  maxTime: number,
  resetMode: boolean
): boolean;

/**
 * Finds the appropriate group index for a visual event based on time range
 * 
 * @param groups - Array of existing visual groups
 * @param startTime - Start timestamp of the event
 * @param endTime - End timestamp of the event
 * @param resetMode - Whether operating in reset mode
 * @returns Index of the suitable group, or -1 if no suitable group exists
 */
declare function findGroupIndex(
  groups: VisualGroup[],
  startTime: number,
  endTime: number,
  resetMode: boolean
): number;

/**
 * Finalizes and processes visual groups after all events are added
 * 
 * @param groups - Array of visual groups to finalize
 */
declare function finalizeGroups(groups: VisualGroup[]): void;

/**
 * Extracts start and end timestamps from an event
 * 
 * @param event - The event to extract timestamps from
 * @returns Tuple containing [startTime, endTime]
 */
declare function extractEventTimes(event: unknown): [number, number];

/**
 * Alternative timestamp extraction method for reset mode
 * 
 * @param event - The event to extract timestamps from
 * @returns Tuple containing [startTime, endTime]
 */
declare function extractEventTimesAlt(event: unknown): [number, number];