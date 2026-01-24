/**
 * Moment.js locale configuration for English (United Kingdom)
 * Defines date/time formatting rules, calendar expressions, and relative time strings for en-GB locale
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
 * Relative time formatting configuration
 * Defines how time differences are expressed in natural language
 */
interface RelativeTimeSpec {
  /** Future time prefix (e.g., "in 5 minutes") */
  future: string;
  /** Past time suffix (e.g., "5 minutes ago") */
  past: string;
  /** Format for seconds (singular) */
  s: string;
  /** Format for seconds (plural) */
  ss: string;
  /** Format for minute (singular) */
  m: string;
  /** Format for minutes (plural) */
  mm: string;
  /** Format for hour (singular) */
  h: string;
  /** Format for hours (plural) */
  hh: string;
  /** Format for day (singular) */
  d: string;
  /** Format for days (plural) */
  dd: string;
  /** Format for month (singular) */
  M: string;
  /** Format for months (plural) */
  MM: string;
  /** Format for year (singular) */
  y: string;
  /** Format for years (plural) */
  yy: string;
}

/**
 * Long date format tokens
 * Defines standard date/time format strings
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "14:30") */
  LT: string;
  /** Time with seconds format (e.g., "14:30:45") */
  LTS: string;
  /** Short date format (e.g., "31/12/2023") */
  L: string;
  /** Long date format (e.g., "31 December 2023") */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with day and time format */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year that defines week 1 */
  doy: number;
}

/**
 * Complete locale specification for en-GB
 */
interface EnGbLocaleSpec extends LocaleSpecification {
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
 * Defines the en-GB locale for moment.js
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured locale
 */
export function defineEnGbLocale(momentInstance: typeof import('moment')): Locale;

/**
 * Returns the ordinal suffix for a given number (e.g., 1st, 2nd, 3rd, 4th)
 * @param num - The number to get the ordinal for
 * @returns The number with its ordinal suffix
 */
export function getOrdinal(num: number): string;

/**
 * en-GB locale configuration object
 */
export const enGbLocaleConfig: EnGbLocaleSpec;

export default enGbLocaleConfig;