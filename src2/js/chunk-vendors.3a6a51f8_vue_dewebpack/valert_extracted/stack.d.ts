/**
 * Stack layout mode for calendar events
 * Arranges overlapping events in a stacked layout with intelligent spacing
 */

/**
 * Configuration constants for stack layout
 */
/** Maximum width percentage for event elements */
declare const MAX_WIDTH_PERCENT: 100;

/** Minimum width percentage for event elements */
declare const MIN_WIDTH_PERCENT: 5;

/** Width multiplier for expanding event elements */
declare const WIDTH_EXPANSION_FACTOR: 1.7;

/**
 * Represents the visual properties of a calendar event
 */
export interface EventVisual {
  /** Left position as percentage */
  left: number;
  /** Width as percentage */
  width: number;
  /** Associated event data */
  event: CalendarEvent;
}

/**
 * Represents a calendar event with timestamp information
 */
export interface CalendarEvent {
  /** Start timestamp identifier (HHMM format) */
  startTimestampIdentifier: number;
  /** Event start time */
  start: number;
  /** Event end time */
  end: number;
  /** Additional event properties */
  [key: string]: any;
}

/**
 * Represents a timestamp object used for day identification
 */
export interface Timestamp {
  /** Year */
  year: number;
  /** Month (1-12) */
  month: number;
  /** Day of month */
  day: number;
  /** Additional timestamp properties */
  [key: string]: any;
}

/**
 * Internal node structure for building the event tree
 */
declare interface EventNode {
  /** Parent node in the tree */
  parent: EventNode | null;
  /** Whether this node is a sibling overlap */
  sibling: boolean;
  /** Depth index in the layout */
  index: number;
  /** Associated visual element */
  visual: EventVisual;
  /** Event start time */
  start: number;
  /** Event end time */
  end: number;
  /** Child nodes */
  children: EventNode[];
}

/**
 * Represents a group of overlapping events
 */
declare interface OverlapGroup {
  /** Start time of the overlap group */
  start: number;
  /** End time of the overlap group */
  end: number;
  /** Visual elements in this group */
  visuals: EventVisual[];
}

/**
 * Function signature for overlap group handler
 */
export interface OverlapGroupHandler {
  /**
   * Get visual layout for events
   * @param timestamp - The timestamp for the day
   * @param events - Array of calendar events
   * @param enableStacking - Whether to enable stack layout
   * @param stackDuration - Duration in minutes for stack calculation
   * @returns Array of positioned event visuals
   */
  getVisuals(
    timestamp: Timestamp,
    events: CalendarEvent[],
    enableStacking: boolean,
    stackDuration: number
  ): EventVisual[];
}

/**
 * Creates a stack layout handler for calendar events
 * 
 * This function implements an intelligent stacking algorithm that:
 * - Groups overlapping events into clusters
 * - Builds a tree structure representing parent-child relationships
 * - Calculates optimal widths and positions to minimize visual clutter
 * - Ensures readable event spacing even with many overlaps
 * 
 * @param calendarConfig - Calendar configuration object
 * @param layoutOptions - Layout-specific options
 * @param stackDuration - Duration in minutes used for overlap detection
 * @returns Overlap group handler with getVisuals method
 * 
 * @example
 *