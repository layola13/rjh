/**
 * Moment.js locale configuration for English (Australia)
 * Configures date/time formatting, calendar display, and relative time strings
 * according to Australian English conventions.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration
 * Defines how dates are displayed relative to the current day
 */
interface CalendarSpec {
  /** Format for dates on the same day */
  sameDay: string;
  /** Format for dates on the next day */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates on the previous day */
  lastDay: string;
  /** Format for dates in the previous week */
  lastWeek: string;
  /** Default format for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration
 * Defines how time durations are displayed in human-readable format
 */
interface RelativeTimeSpec {
  /** Future time prefix/suffix */
  future: string;
  /** Past time prefix/suffix */
  past: string;
  /** Seconds (singular, < 45) */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (plural) */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (plural) */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Long date format configuration
 * Defines various date/time display formats
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "3:45 PM") */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date and time format */
  LLL: string;
  /** Full date and time format with day of week */
  LLLL: string;
}

/**
 * Week configuration
 * Defines the start of the week and day of year
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year used to determine the first week of the year */
  doy: number;
}

/**
 * Complete locale specification for en-AU
 */
interface EnAuLocaleSpec extends LocaleSpecification {
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
  /** Long date format configurations */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configurations */
  calendar: CalendarSpec;
  /** Relative time configurations */
  relativeTime: RelativeTimeSpec;
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to generate ordinal suffix for day of month */
  ordinal: (dayOfMonth: number) => string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Generates the ordinal suffix for a given day of month
 * @param dayOfMonth - The day of the month (1-31)
 * @returns The day with its ordinal suffix (e.g., "1st", "2nd", "3rd", "21st")
 */
declare function getOrdinal(dayOfMonth: number): string;

/**
 * Defines the en-AU (English - Australia) locale configuration for Moment.js
 * @param moment - The Moment.js instance
 * @returns The configured locale
 */
declare function defineEnAuLocale(moment: typeof import('moment')): Locale;

export { EnAuLocaleSpec, CalendarSpec, RelativeTimeSpec, LongDateFormatSpec, WeekSpec, getOrdinal, defineEnAuLocale };