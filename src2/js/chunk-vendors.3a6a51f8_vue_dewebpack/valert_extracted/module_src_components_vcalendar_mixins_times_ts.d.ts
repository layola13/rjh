/**
 * VCalendar times mixin - Manages current time and date tracking for calendar components
 * @module VCalendar/mixins/times
 */

import Vue from 'vue';
import { VueConstructor } from 'vue';
import { validateTimestamp, parseTimestamp, parseDate, CalendarTimestamp } from '../util/timestamp';

/**
 * Times data structure for tracking current and today's timestamps
 */
interface TimesData {
  times: {
    /** Current date and time timestamp */
    now: CalendarTimestamp;
    /** Today's date timestamp (time set to 00:00) */
    today: CalendarTimestamp;
  };
}

/**
 * Component props interface
 */
interface TimesProps {
  /** Optional ISO timestamp string for overriding current time */
  now?: string;
}

/**
 * Computed properties interface
 */
interface TimesComputed {
  /** Parsed version of the now prop, or null if not provided */
  parsedNow: CalendarTimestamp | null;
}

/**
 * Component methods interface
 */
interface TimesMethods {
  /**
   * Marks the current timestamps as present (not past or future)
   */
  setPresent(): void;

  /**
   * Updates internal time tracking based on parsedNow or current system time
   */
  updateTimes(): void;

  /**
   * Gets the current system date/time as a CalendarTimestamp
   */
  getNow(): CalendarTimestamp;

  /**
   * Updates the date portion (year, month, day, weekday) of a timestamp
   * @param source - Source timestamp to copy from
   * @param target - Target timestamp to update
   */
  updateDay(source: CalendarTimestamp, target: CalendarTimestamp): void;

  /**
   * Updates the time portion (hour, minute) of a timestamp
   * @param source - Source timestamp to copy from
   * @param target - Target timestamp to update
   */
  updateTime(source: CalendarTimestamp, target: CalendarTimestamp): void;
}

/**
 * Times mixin for VCalendar components
 * Provides reactive tracking of current time and date for calendar rendering
 */
declare const TimesMixin: VueConstructor<
  Vue & TimesData & TimesComputed & TimesMethods
>;

export default TimesMixin;