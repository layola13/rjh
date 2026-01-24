import { Moment, LocaleSpecification } from 'moment';

/**
 * Moment.js locale configuration for English (Israel)
 * 
 * This module provides locale-specific settings for formatting dates and times
 * in English for the Israeli region, using DD/MM/YYYY date format and 24-hour time.
 */

/**
 * Calendar display format configuration
 * Defines how dates are displayed relative to the current date
 */
interface CalendarSpec {
  /** Format for dates occurring today */
  sameDay: string;
  /** Format for dates occurring tomorrow */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates that occurred yesterday */
  lastDay: string;
  /** Format for dates in the last week */
  lastWeek: string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time format configuration
 * Defines how time differences are displayed in human-readable format
 */
interface RelativeTimeSpec {
  /** Format for future times */
  future: string;
  /** Format for past times */
  past: string;
  /** Label for a few seconds */
  s: string;
  /** Format for multiple seconds */
  ss: string;
  /** Label for one minute */
  m: string;
  /** Format for multiple minutes */
  mm: string;
  /** Label for one hour */
  h: string;
  /** Format for multiple hours */
  hh: string;
  /** Label for one day */
  d: string;
  /** Format for multiple days */
  dd: string;
  /** Label for one month */
  M: string;
  /** Format for multiple months */
  MM: string;
  /** Label for one year */
  y: string;
  /** Format for multiple years */
  yy: string;
}

/**
 * Long date format tokens
 * Defines various date and time format patterns
 */
interface LongDateFormatSpec {
  /** Time format (24-hour) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time */
  LLL: string;
  /** Full date and time with weekday */
  LLLL: string;
}

/**
 * Complete locale specification for en-IL
 */
interface EnglishIsraelLocale extends LocaleSpecification {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Long date format patterns */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display formats */
  calendar: CalendarSpec;
  /** Relative time formats */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal numbers */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to generate ordinal number suffix */
  ordinal: (dayOfMonth: number) => string;
}

/**
 * Generates the ordinal suffix for a given day of the month
 * 
 * @param dayOfMonth - The day number (1-31)
 * @returns The day number with appropriate suffix (st, nd, rd, th)
 * 
 * @example
 *