/**
 * VCalendar component module
 * Provides calendar components for displaying and managing calendar views
 * @module VCalendar
 */

/**
 * Base calendar component
 * Main calendar component that can display events and date information
 */
export declare class VCalendar {
  /** Component constructor */
  constructor();
}

/**
 * Daily calendar view component
 * Displays calendar in a daily view format showing events for a single day
 */
export declare class VCalendarDaily {
  /** Component constructor */
  constructor();
}

/**
 * Weekly calendar view component
 * Displays calendar in a weekly view format showing events across 7 days
 */
export declare class VCalendarWeekly {
  /** Component constructor */
  constructor();
}

/**
 * Monthly calendar view component
 * Displays calendar in a monthly view format showing all days in a month
 */
export declare class VCalendarMonthly {
  /** Component constructor */
  constructor();
}

/**
 * Category calendar view component
 * Displays calendar with categorized events or grouped by categories
 */
export declare class VCalendarCategory {
  /** Component constructor */
  constructor();
}

/**
 * Vuetify subcomponents collection
 * Internal structure for registering calendar subcomponents with Vuetify
 */
export interface VuetifySubcomponents {
  /** Base calendar component */
  VCalendar: typeof VCalendar;
  /** Category view component */
  VCalendarCategory: typeof VCalendarCategory;
  /** Daily view component */
  VCalendarDaily: typeof VCalendarDaily;
  /** Weekly view component */
  VCalendarWeekly: typeof VCalendarWeekly;
  /** Monthly view component */
  VCalendarMonthly: typeof VCalendarMonthly;
}

/**
 * Default export containing all calendar subcomponents
 * Used for Vuetify plugin registration
 */
declare const _default: {
  /** Vuetify subcomponents registry */
  $_vuetify_subcomponents: VuetifySubcomponents;
};

export default _default;