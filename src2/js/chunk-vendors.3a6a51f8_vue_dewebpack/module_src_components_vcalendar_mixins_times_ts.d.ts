/**
 * VCalendar Times Mixin
 * 
 * A Vue mixin that manages current time and date tracking for calendar components.
 * Provides reactive time state and utilities for updating date/time information.
 */

import Vue from 'vue';
import { VCalendarTimestamp } from '../util/timestamp';

/**
 * Internal state for tracking current time and today's date
 */
interface TimesState {
  /** Current date and time information */
  now: VCalendarTimestamp;
  /** Today's date information (without time) */
  today: VCalendarTimestamp;
}

/**
 * Component data structure
 */
interface TimesData {
  times: TimesState;
}

/**
 * Component props
 */
interface TimesProps {
  /** 
   * Optional timestamp string to override current time.
   * Must be a valid timestamp format validated by validateTimestamp.
   */
  now?: string;
}

/**
 * Computed properties
 */
interface TimesComputed {
  /** Parsed version of the now prop, or null if not provided */
  parsedNow: VCalendarTimestamp | null;
}

/**
 * Component methods
 */
interface TimesMethods {
  /**
   * Marks the current time and today as "present" (not past or future)
   */
  setPresent(): void;

  /**
   * Updates the internal time state based on parsedNow or current system time
   */
  updateTimes(): void;

  /**
   * Gets the current system time as a parsed timestamp
   * @returns Current date and time
   */
  getNow(): VCalendarTimestamp;

  /**
   * Updates day-related fields (year, month, day, weekday, date) of target timestamp
   * @param source - Source timestamp to copy from
   * @param target - Target timestamp to update
   */
  updateDay(source: VCalendarTimestamp, target: VCalendarTimestamp): void;

  /**
   * Updates time-related fields (hour, minute, time) of target timestamp
   * @param source - Source timestamp to copy from
   * @param target - Target timestamp to update
   */
  updateTime(source: VCalendarTimestamp, target: VCalendarTimestamp): void;
}

/**
 * Times mixin component type
 */
type TimesMixin = Vue & TimesData & TimesProps & TimesComputed & TimesMethods;

/**
 * Vue mixin for managing calendar time state
 * 
 * This mixin provides:
 * - Reactive tracking of current time and today's date
 * - Optional override via the `now` prop
 * - Automatic updates when time changes
 * - Utilities for synchronizing timestamp objects
 * 
 * @example
 *