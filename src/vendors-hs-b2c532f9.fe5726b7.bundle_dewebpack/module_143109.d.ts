/**
 * Moment.js locale configuration for English (New Zealand)
 * Defines locale-specific date/time formatting, calendar expressions, and relative time strings
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration
 * Defines how dates are displayed relative to today
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
  /** Default format for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration
 * Defines how to display time differences in human-readable format
 */
interface RelativeTimeSpec {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Display for a few seconds */
  s: string;
  /** Display for multiple seconds (%d placeholder) */
  ss: string;
  /** Display for one minute */
  m: string;
  /** Display for multiple minutes (%d placeholder) */
  mm: string;
  /** Display for one hour */
  h: string;
  /** Display for multiple hours (%d placeholder) */
  hh: string;
  /** Display for one day */
  d: string;
  /** Display for multiple days (%d placeholder) */
  dd: string;
  /** Display for one month */
  M: string;
  /** Display for multiple months (%d placeholder) */
  MM: string;
  /** Display for one year */
  y: string;
  /** Display for multiple years (%d placeholder) */
  yy: string;
}

/**
 * Long date format configuration
 * Defines various date/time display formats
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "3:45 PM") */
  LT: string;
  /** Time with seconds format (e.g., "3:45:30 PM") */
  LTS: string;
  /** Short date format (e.g., "25/12/2023") */
  L: string;
  /** Long date format (e.g., "25 December 2023") */
  LL: string;
  /** Long date with time (e.g., "25 December 2023 3:45 PM") */
  LLL: string;
  /** Full date with day and time (e.g., "Monday, 25 December 2023 3:45 PM") */
  LLLL: string;
}

/**
 * Week configuration
 * Defines week-related settings
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Complete locale specification for en-NZ
 */
interface EnNzLocaleSpec extends LocaleSpecification {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormatSpec;
  calendar: CalendarSpec;
  relativeTime: RelativeTimeSpec;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
  week: WeekSpec;
}

/**
 * Defines the English (New Zealand) locale for moment.js
 * @param moment - The moment.js instance
 * @returns The configured locale
 */
export declare function defineEnNzLocale(moment: typeof import('moment')): Locale;

/**
 * English (New Zealand) locale configuration
 */
export declare const enNzLocale: EnNzLocaleSpec;