/**
 * Calendar event overlap modes module
 * Provides different strategies for handling overlapping calendar events
 */

import { stack } from './stack';
import { column } from './column';

/**
 * Available calendar event overlap modes
 * @description Defines how overlapping events should be displayed in the calendar
 */
export interface CalendarEventOverlapModes {
  /**
   * Stack mode: Overlapping events are stacked vertically
   * @description Events that occur at the same time are displayed one above the other
   */
  stack: typeof stack;
  
  /**
   * Column mode: Overlapping events are displayed in columns side by side
   * @description Events that occur at the same time are displayed in adjacent columns
   */
  column: typeof column;
}

/**
 * Calendar event overlap modes configuration object
 * @description Exports the available overlap handling strategies for calendar events
 */
export declare const CalendarEventOverlapModes: CalendarEventOverlapModes;