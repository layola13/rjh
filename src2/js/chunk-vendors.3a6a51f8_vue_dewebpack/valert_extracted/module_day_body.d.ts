/**
 * Module: module_day_body
 * Original ID: day-body
 */

/**
 * Renders the day body component with timed events
 * @param dayData - The day data object containing event information
 * @returns An array of VNode elements representing the rendered day body
 */
declare function renderDayBody(dayData: DayData): VNode[];

/**
 * Represents data for a single day in the calendar
 */
interface DayData {
  /** The date for this day */
  date: Date;
  /** Array of events scheduled for this day */
  events?: CalendarEvent[];
  /** Additional metadata for the day */
  metadata?: Record<string, unknown>;
}

/**
 * Represents a calendar event
 */
interface CalendarEvent {
  /** Unique identifier for the event */
  id: string | number;
  /** Event title */
  title: string;
  /** Start time of the event */
  start: Date | string;
  /** End time of the event */
  end: Date | string;
  /** Whether this is a timed event */
  timed?: boolean;
  /** Additional event properties */
  [key: string]: unknown;
}

/**
 * Vue Virtual Node type
 */
interface VNode {
  tag?: string;
  data?: VNodeData;
  children?: VNode[];
  text?: string;
  elm?: Node;
  key?: string | number;
}

/**
 * VNode data object
 */
interface VNodeData {
  staticClass?: string;
  class?: string | string[] | Record<string, boolean>;
  style?: string | Record<string, string>;
  attrs?: Record<string, string | number | boolean>;
  props?: Record<string, unknown>;
  on?: Record<string, Function | Function[]>;
  [key: string]: unknown;
}

/**
 * Gets timed events for a specific day
 * @param dayData - The day data to extract events from
 * @returns Array of timed events
 */
declare function getEventsForDayTimed(dayData: DayData): CalendarEvent[];

/**
 * Generates a VNode for a timed event
 * @param event - The event to render
 * @param isVisible - Whether the event should be visible
 * @returns VNode representing the timed event
 */
declare function genTimedEvent(event: CalendarEvent, isVisible: boolean): VNode;

/**
 * Creates a Vue virtual node element
 * @param tag - HTML tag name
 * @param data - VNode data configuration
 * @param children - Child VNodes
 * @returns Created VNode
 */
declare function $createElement(
  tag: string,
  data?: VNodeData,
  children?: VNode[]
): VNode;

/**
 * Optional render function for additional content
 * @param dayData - The day data object
 * @returns Array of additional VNodes or null
 */
declare type OptionalRenderer = ((dayData: DayData) => VNode[] | null) | null;