/**
 * Moment.js locale configuration for English (Singapore)
 * Defines date/time formatting rules and localized strings for the en-sg locale
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for relative dates
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
 * Relative time formatting configuration
 */
interface RelativeTimeSpec {
  /** Format for future dates */
  future: string;
  /** Format for past dates */
  past: string;
  /** Text for a few seconds */
  s: string;
  /** Format for multiple seconds */
  ss: string;
  /** Text for one minute */
  m: string;
  /** Format for multiple minutes */
  mm: string;
  /** Text for one hour */
  h: string;
  /** Format for multiple hours */
  hh: string;
  /** Text for one day */
  d: string;
  /** Format for multiple days */
  dd: string;
  /** Text for one month */
  M: string;
  /** Format for multiple months */
  MM: string;
  /** Text for one year */
  y: string;
  /** Format for multiple years */
  yy: string;
}

/**
 * Long date format tokens
 */
interface LongDateFormatSpec {
  /** Time format (hours:minutes) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date format with time */
  LLL: string;
  /** Full date format with day name and time */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year for week numbering */
  doy: number;
}

/**
 * Complete locale specification for en-sg
 */
interface EnSgLocaleSpec extends LocaleSpecification {
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
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configuration */
  calendar: CalendarSpec;
  /** Relative time formatting */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to generate ordinal suffix for day of month */
  ordinal: (dayOfMonth: number) => string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Generates the ordinal suffix for a given day of month
 * @param dayOfMonth - The day of the month (1-31)
 * @returns The day with its ordinal suffix (e.g., "1st", "2nd", "3rd", "4th")
 */
declare function getOrdinal(dayOfMonth: number): string;

/**
 * Defines the English (Singapore) locale configuration for moment.js
 * Uses DD/MM/YYYY date format and 24-hour time format
 * Week starts on Monday (dow: 1)
 */
declare const enSgLocale: EnSgLocaleSpec;

export { EnSgLocaleSpec, CalendarSpec, RelativeTimeSpec, LongDateFormatSpec, WeekSpec, getOrdinal, enSgLocale };
export default enSgLocale;