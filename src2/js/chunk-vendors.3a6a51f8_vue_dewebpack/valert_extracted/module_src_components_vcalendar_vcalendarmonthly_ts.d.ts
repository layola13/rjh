/**
 * Vue Calendar Monthly Component Type Definitions
 * Extends VCalendarWeekly to provide monthly calendar view functionality
 */

import { VueConstructor } from 'vue';
import VCalendarWeekly from './VCalendarWeekly';
import { Timestamp } from './util/timestamp';

/**
 * Monthly calendar component that displays calendar data in a monthly grid view.
 * Inherits all functionality from VCalendarWeekly and adds month-specific date calculations.
 */
interface VCalendarMonthly extends VCalendarWeekly {
  /**
   * Component name identifier
   */
  readonly name: 'v-calendar-monthly';

  /**
   * Computed property that returns the static CSS classes for the component.
   * Combines both monthly and weekly calendar classes.
   * @returns Combined CSS class string for styling
   */
  readonly staticClass: string;

  /**
   * Computed property that parses the start date and returns the first day of that month.
   * Converts the `start` prop to a Timestamp and calculates the month's start date.
   * @returns Timestamp representing the first moment of the start month
   */
  readonly parsedStart: Timestamp;

  /**
   * Computed property that parses the end date and returns the last day of that month.
   * Converts the `end` prop to a Timestamp and calculates the month's end date.
   * @returns Timestamp representing the last moment of the end month
   */
  readonly parsedEnd: Timestamp;
}

/**
 * Vue component constructor for VCalendarMonthly
 */
declare const VCalendarMonthlyComponent: VueConstructor<VCalendarMonthly>;

export default VCalendarMonthlyComponent;