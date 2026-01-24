import type { VNode } from 'vue';
import type { PropType } from 'vue';

/**
 * Calendar event data structure
 */
export interface CalendarEvent {
  /** Event input data */
  input: Record<string, any>;
  /** Start timestamp */
  start: CalendarTimestamp;
  /** End timestamp */
  end: CalendarTimestamp;
  /** Whether the event is all day */
  allDay: boolean;
  /** Event category */
  category?: string | null;
  /** Start day identifier (YYYY-MM-DD) */
  startIdentifier: string;
  /** End day identifier (YYYY-MM-DD) */
  endIdentifier: string;
  /** Event index */
  index: number;
  /** Column position for overlap layout */
  column?: number;
}

/**
 * Calendar timestamp structure
 */
export interface CalendarTimestamp {
  /** Date string (YYYY-MM-DD) */
  date: string;
  /** Year */
  year: number;
  /** Month (1-12) */
  month: number;
  /** Day of month */
  day: number;
  /** Hour (0-23) */
  hour: number;
  /** Minute (0-59) */
  minute: number;
  /** Whether the timestamp includes time */
  hasTime: boolean;
}

/**
 * Calendar day structure
 */
export interface CalendarDay {
  /** Date string (YYYY-MM-DD) */
  date: string;
  /** Timestamp */
  timestamp: CalendarTimestamp;
  /** Day index in week */
  index: number;
  /** Whether the day is outside current period */
  outside: boolean;
  /** Week days array */
  week: CalendarDay[];
  /** Event category (for category mode) */
  category?: string | null;
  /** Convert time to Y position */
  timeToY: (minutes: number) => number;
  /** Calculate time delta */
  timeDelta: (timestamp: CalendarTimestamp) => number;
}

/**
 * Event slot scope data
 */
export interface EventSlotScope {
  /** Original event input */
  event: Record<string, any>;
  /** Parsed event data */
  eventParsed: CalendarEvent;
  /** Day information */
  day: CalendarDay;
  /** Whether event starts on this day */
  start: boolean;
  /** Whether event ends on this day */
  end: boolean;
  /** Whether event is timed (not all-day) */
  timed: boolean;
  /** Whether day is outside current period */
  outside: boolean;
  /** Whether event is displayed in single line */
  singline: boolean;
  /** Whether event overlaps noon (12:00) */
  overlapsNoon: boolean;
  /** Native mouse event */
  nativeEvent?: MouseEvent;
  /** Format time function */
  formatTime: (timestamp: CalendarTimestamp, withSuffix: boolean) => string;
  /** Get time summary string */
  timeSummary: () => string;
  /** Get event summary HTML */
  eventSummary: () => string;
}

/**
 * Event color function type
 */
export type EventColorFunction = (event: Record<string, any>) => string;

/**
 * Event timed predicate function type
 */
export type EventTimedFunction = (event: Record<string, any>) => boolean;

/**
 * Event category function type
 */
export type EventCategoryFunction = (event: Record<string, any>) => string | null;

/**
 * Event text color function type
 */
export type EventTextColorFunction = (event: Record<string, any>) => string;

/**
 * Event name function type
 */
export type EventNameFunction = (event: CalendarEvent, timed: boolean) => string;

/**
 * Event overlap mode function type
 */
export type EventOverlapModeFunction = (
  events: CalendarEvent[],
  firstWeekday: number,
  overlapThreshold: number
) => (day: CalendarDay, events: CalendarEvent[], timed: boolean, categoryMode: boolean) => CalendarEvent[];

/**
 * Events map structure for visibility tracking
 */
export interface EventsMap {
  [date: string]: {
    /** Parent container element */
    parent: HTMLElement;
    /** "More" button element */
    more: HTMLElement | null;
    /** Array of event elements */
    events: HTMLElement[];
  };
}

/**
 * Calendar with events mixin component
 * Extends calendar base with event rendering and management capabilities
 */
declare const CalendarWithEvents: {
  name: 'calendar-with-events';
  
  directives: {
    ripple: any;
  };

  props: {
    /** Array of calendar events */
    events: {
      type: PropType<Record<string, any>[]>;
      default: () => [];
    };
    /** Event start property name or getter function */
    eventStart: {
      type: [String, Function] as PropType<string | ((event: any) => CalendarTimestamp)>;
      default: 'start';
    };
    /** Event end property name or getter function */
    eventEnd: {
      type: [String, Function] as PropType<string | ((event: any) => CalendarTimestamp)>;
      default: 'end';
    };
    /** Event color property name or function */
    eventColor: {
      type: [String, Function] as PropType<string | EventColorFunction>;
      default: 'primary';
    };
    /** Event text color property name or function */
    eventTextColor: {
      type: [String, Function] as PropType<string | EventTextColorFunction>;
      default: 'white';
    };
    /** Event name property name or function */
    eventName: {
      type: [String, Function] as PropType<string | EventNameFunction>;
      default: 'name';
    };
    /** Event timed property name or predicate function */
    eventTimed: {
      type: [String, Function] as PropType<string | EventTimedFunction>;
      default: 'timed';
    };
    /** Event category property name or function */
    eventCategory: {
      type: [String, Function] as PropType<string | EventCategoryFunction>;
      default: 'category';
    };
    /** Event overlap mode name or function */
    eventOverlapMode: {
      type: [String, Function] as PropType<string | EventOverlapModeFunction>;
      default: 'stack';
    };
    /** Event overlap threshold in minutes */
    eventOverlapThreshold: {
      type: [String, Number] as PropType<string | number>;
      default: 60;
    };
    /** Event height in pixels */
    eventHeight: {
      type: Number;
      default: 20;
    };
    /** Event bottom margin in pixels */
    eventMarginBottom: {
      type: Number;
      default: 1;
    };
    /** Enable ripple effect on events */
    eventRipple: {
      type: Boolean;
      default: true;
    };
    /** Enable "more" button for overflow events */
    eventMore: {
      type: Boolean;
      default: true;
    };
    /** Translation key for "more" button text */
    eventMoreText: {
      type: String;
      default: '$vuetify.calendar.moreEvents';
    };
  };

  computed: {
    /** Whether there are no events */
    noEvents(): boolean;
    /** Parsed and processed events array */
    parsedEvents(): CalendarEvent[];
    /** Parsed overlap threshold as integer */
    parsedEventOverlapThreshold(): number;
    /** Resolved event color function */
    eventColorFunction(): EventColorFunction;
    /** Resolved event timed function */
    eventTimedFunction(): EventTimedFunction;
    /** Resolved event category function */
    eventCategoryFunction(): EventCategoryFunction;
    /** Resolved event text color function */
    eventTextColorFunction(): EventTextColorFunction;
    /** Resolved event name function */
    eventNameFunction(): EventNameFunction;
    /** Resolved event overlap mode function */
    eventModeFunction(): EventOverlapModeFunction;
    /** Event weekdays configuration */
    eventWeekdays(): number[];
    /** Whether category mode is enabled */
    categoryMode(): boolean;
  };

  methods: {
    /**
     * Parse raw event into CalendarEvent structure
     * @param event - Raw event data
     * @param index - Event index
     * @returns Parsed calendar event
     */
    parseEvent(event: Record<string, any>, index?: number): CalendarEvent;

    /**
     * Format timestamp as time string
     * @param timestamp - Calendar timestamp
     * @param withSuffix - Include AM/PM suffix
     * @returns Formatted time string
     */
    formatTime(timestamp: CalendarTimestamp, withSuffix: boolean): string;

    /**
     * Update visibility of events based on available space
     * Shows/hides overflow events and updates "more" button
     */
    updateEventVisibility(): void;

    /**
     * Get map of event elements grouped by date
     * @returns Events map keyed by date
     */
    getEventsMap(): EventsMap;

    /**
     * Generate VNode for day event (all-day event)
     * @param eventData - Event data with positioning
     * @param day - Day information
     * @returns VNode for day event
     */
    genDayEvent(eventData: { event: CalendarEvent; left?: number; width?: number }, day: CalendarDay): VNode;

    /**
     * Generate VNode for timed event
     * @param eventData - Event data with positioning
     * @param day - Day information
     * @returns VNode for timed event or false if not visible
     */
    genTimedEvent(eventData: { event: CalendarEvent; left: number; width: number }, day: CalendarDay): VNode | false;

    /**
     * Generate VNode for event with custom rendering
     * @param event - Calendar event
     * @param slotScope - Slot scope data
     * @param timed - Whether event is timed
     * @param data - VNode data options
     * @returns VNode for event
     */
    genEvent(event: CalendarEvent, slotScope: Partial<EventSlotScope>, timed: boolean, data: any): VNode;

    /**
     * Generate VNode for event name display
     * @param getContent - Function returning event name HTML
     * @returns VNode for event name
     */
    genName(getContent: () => string): VNode;

    /**
     * Generate placeholder VNode for event layout
     * @param day - Day information
     * @returns VNode for placeholder
     */
    genPlaceholder(day: CalendarDay): VNode;

    /**
     * Generate VNode for "more events" button
     * @param day - Day information
     * @returns VNode for more button
     */
    genMore(day: CalendarDay): VNode;

    /**
     * Get all visible events for current date range
     * @returns Array of visible events
     */
    getVisibleEvents(): CalendarEvent[];

    /**
     * Check if event belongs to given category
     * @param event - Calendar event
     * @param category - Category to check
     * @returns Whether event is in category
     */
    isEventForCategory(event: CalendarEvent, category: string | null): boolean;

    /**
     * Get events starting on given day
     * @param day - Day information
     * @returns Array of events starting on day
     */
    getEventsForDay(day: CalendarDay): CalendarEvent[];

    /**
     * Get all-day events for given day
     * @param day - Day information
     * @returns Array of all-day events
     */
    getEventsForDayAll(day: CalendarDay): CalendarEvent[];

    /**
     * Get timed events for given day
     * @param day - Day information
     * @returns Array of timed events
     */
    getEventsForDayTimed(day: CalendarDay): CalendarEvent[];

    /**
     * Get scoped slots with event rendering
     * @returns Scoped slots object
     */
    getScopedSlots(): Record<string, Function>;

    /**
     * Get default mouse event handlers
     * @param eventName - Event name suffix
     * @param getData - Function to get event data
     * @returns Event handlers object
     */
    getDefaultMouseEventHandlers(eventName: string, getData: (event: MouseEvent) => any): Record<string, Function>;

    /**
     * Set text color utility
     * @param color - Text color
     * @param data - VNode data
     * @returns VNode data with text color
     */
    setTextColor(color: string, data: any): any;

    /**
     * Set background color utility
     * @param color - Background color
     * @param data - VNode data
     * @returns VNode data with background color
     */
    setBackgroundColor(color: string, data: any): any;
  };
};

export default CalendarWithEvents;