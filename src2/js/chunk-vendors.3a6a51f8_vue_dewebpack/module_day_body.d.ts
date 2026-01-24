/**
 * Generates the timed events section for a day view body
 * @module day-body
 */

/**
 * Renders timed events container for a specific day
 * @param dayData - The day data containing event information
 * @returns Array of virtual DOM elements representing the day's timed events
 */
declare function renderDayBody(dayData: DayData): VNode[];

/**
 * Day data structure containing event and timing information
 */
interface DayData {
  /** Date timestamp or identifier for the day */
  date: number | string;
  /** Array of events scheduled for this day */
  events?: CalendarEvent[];
  /** Additional day metadata */
  [key: string]: unknown;
}

/**
 * Calendar event object
 */
interface CalendarEvent {
  /** Unique event identifier */
  id: string | number;
  /** Event title */
  title: string;
  /** Event start time */
  start: Date | string | number;
  /** Event end time */
  end: Date | string | number;
  /** Whether the event is timed (has specific hours) */
  timed?: boolean;
  /** Additional event properties */
  [key: string]: unknown;
}

/**
 * Virtual DOM node (Vue-compatible)
 */
interface VNode {
  /** HTML tag name or component */
  tag: string;
  /** Node data (props, attrs, class, style, etc.) */
  data?: VNodeData;
  /** Child nodes */
  children?: VNode[];
  /** Text content */
  text?: string;
  /** Additional VNode properties */
  [key: string]: unknown;
}

/**
 * Virtual DOM node data structure
 */
interface VNodeData {
  /** Static CSS class */
  staticClass?: string;
  /** Dynamic CSS classes */
  class?: string | string[] | Record<string, boolean>;
  /** Inline styles */
  style?: string | Record<string, string>;
  /** HTML attributes */
  attrs?: Record<string, unknown>;
  /** DOM properties */
  props?: Record<string, unknown>;
  /** Event listeners */
  on?: Record<string, Function>;
  /** Additional data properties */
  [key: string]: unknown;
}

/**
 * Helper function to get timed events for a specific day
 * @param dayData - The day data to extract events from
 * @returns Array of timed events
 */
declare function getEventsForDayTimed(dayData: DayData): CalendarEvent[];

/**
 * Generates a virtual DOM node for a single timed event
 * @param event - The calendar event to render
 * @param includeTiming - Whether to include timing information in the render
 * @returns Virtual DOM node representing the event
 */
declare function genTimedEvent(
  event: CalendarEvent,
  includeTiming: boolean
): VNode;

/**
 * Optional handler for additional day body content
 * @param dayData - The day data
 * @returns Additional virtual DOM nodes or null
 */
declare function optionalDayBodyHandler(dayData: DayData): VNode[] | null;

/**
 * Vue createElement function type
 */
type CreateElement = (
  tag: string,
  data?: VNodeData,
  children?: VNode[]
) => VNode;