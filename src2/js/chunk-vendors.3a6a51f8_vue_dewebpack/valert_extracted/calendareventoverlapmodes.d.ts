/**
 * Calendar event overlap modes module
 * Provides different strategies for handling overlapping calendar events
 */

import { stack } from './stack';
import { column } from './column';

/**
 * Stack mode handler function type
 * Handles overlapping events by stacking them vertically
 */
export type StackModeHandler = typeof stack;

/**
 * Column mode handler function type
 * Handles overlapping events by arranging them in columns
 */
export type ColumnModeHandler = typeof column;

/**
 * Available calendar event overlap modes
 * Defines how overlapping calendar events should be displayed
 */
export interface CalendarEventOverlapModes {
  /**
   * Stack mode: Overlapping events are stacked vertically
   */
  stack: StackModeHandler;
  
  /**
   * Column mode: Overlapping events are arranged in side-by-side columns
   */
  column: ColumnModeHandler;
}

/**
 * Calendar event overlap modes configuration object
 * Exports all available overlap handling strategies
 */
export declare const CalendarEventOverlapModes: CalendarEventOverlapModes;