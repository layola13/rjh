/**
 * Moment.js Swedish (sv) locale configuration
 * @module moment-locale-sv
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for relative dates
 */
interface CalendarSpec {
  /** Format for today */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format for yesterday */
  lastDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for last week */
  lastWeek: string;
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time display configuration
 */
interface RelativeTimeSpec {
  /** Future time prefix */
  future: string;
  /** Past time suffix */
  past: string;
  /** Seconds (singular) */
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
 * Long date format tokens
 */
interface LongDateFormatSpec {
  /** Time */
  LT: string;
  /** Time with seconds */
  LTS: string;
  /** Date */
  L: string;
  /** Date with month name */
  LL: string;
  /** Date with month name and time */
  LLL: string;
  /** Full date with weekday and time */
  LLLL: string;
  /** Short date with abbreviated month and time */
  lll: string;
  /** Short date with abbreviated weekday, month and time */
  llll: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year for first week */
  doy: number;
}

/**
 * Swedish locale configuration for Moment.js
 */
interface SwedishLocaleSpec extends LocaleSpecification {
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
  /** Relative time display configuration */
  relativeTime: RelativeTimeSpec;
  /** Pattern for parsing day of month ordinals */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to generate ordinal suffix for day of month */
  ordinal: (dayOfMonth: number) => string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Defines the Swedish locale configuration for Moment.js
 * @param moment - The Moment.js instance
 * @returns The configured Swedish locale
 */
export declare function defineSwedishLocale(moment: typeof import('moment')): Locale;

/**
 * Swedish locale configuration object
 */
export declare const swedishLocaleConfig: SwedishLocaleSpec;

/**
 * Generate ordinal suffix for a given day of month in Swedish
 * @param dayOfMonth - The day of the month (1-31)
 * @returns The day with appropriate ordinal suffix (":e" or ":a")
 * @example
 * getOrdinal(1) // "1:a"
 * getOrdinal(2) // "2:a"
 * getOrdinal(3) // "3:e"
 * getOrdinal(21) // "21:a"
 */
export declare function getOrdinal(dayOfMonth: number): string;

export default defineSwedishLocale;