/**
 * Moment.js locale configuration for Maltese (mt)
 * 
 * This module provides localization settings for the Maltese language,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module MomentLocaleMaltese
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for different time periods
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
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time format configuration
 */
interface RelativeTimeSpec {
  /** Future time prefix format */
  future: string;
  /** Past time suffix format */
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
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "HH:mm") */
  LT: string;
  /** Time with seconds format (e.g., "HH:mm:ss") */
  LTS: string;
  /** Short date format (e.g., "DD/MM/YYYY") */
  L: string;
  /** Long date format (e.g., "D MMMM YYYY") */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with day name and time */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year that marks the start of the first week */
  doy: number;
}

/**
 * Complete Maltese locale specification
 */
interface MalteseLocaleSpec extends LocaleSpecification {
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
  /** Long date format definitions */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display formats */
  calendar: CalendarSpec;
  /** Relative time formats */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal dates */
  dayOfMonthOrdinalParse: RegExp;
  /** Ordinal number format */
  ordinal: string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Defines the Maltese locale for Moment.js
 * 
 * @param moment - The Moment.js instance to register the locale with
 * @returns The registered Locale object
 */
export function defineMalteseLocale(moment: typeof import('moment')): Locale;

/**
 * Maltese locale configuration object
 */
export const malteseLocale: MalteseLocaleSpec;

/**
 * Default export - the locale definition function
 */
export default defineMalteseLocale;