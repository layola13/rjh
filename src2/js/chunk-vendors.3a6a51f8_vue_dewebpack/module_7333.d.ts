/**
 * Moment.js locale configuration for English (Israel)
 * @module en-il
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration
 * Defines how dates are displayed relative to the current date
 */
interface CalendarSpec {
  /** Format for today's date */
  sameDay: string;
  /** Format for tomorrow's date */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for yesterday's date */
  lastDay: string;
  /** Format for dates in the last week */
  lastWeek: string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration
 * Defines how durations are displayed in human-readable format
 */
interface RelativeTimeSpec {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Few seconds label */
  s: string;
  /** Seconds label template */
  ss: string;
  /** Single minute label */
  m: string;
  /** Minutes label template */
  mm: string;
  /** Single hour label */
  h: string;
  /** Hours label template */
  hh: string;
  /** Single day label */
  d: string;
  /** Days label template */
  dd: string;
  /** Single month label */
  M: string;
  /** Months label template */
  MM: string;
  /** Single year label */
  y: string;
  /** Years label template */
  yy: string;
}

/**
 * Long date format configuration
 * Defines various date and time display formats
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
  /** Long date with time format */
  LLL: string;
  /** Full date with day name and time */
  LLLL: string;
}

/**
 * English (Israel) locale configuration
 */
interface EnglishIsraelLocaleSpec extends LocaleSpecification {
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
  /** Long date format specifications */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display specifications */
  calendar: CalendarSpec;
  /** Relative time specifications */
  relativeTime: RelativeTimeSpec;
  /** Regular expression for parsing ordinal day numbers */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal day numbers */
  ordinal: (dayOfMonth: number) => string;
}

/**
 * Defines the English (Israel) locale for moment.js
 * Uses DD/MM/YYYY date format and 24-hour time format
 */
export function defineEnglishIsraelLocale(moment: typeof import('moment')): Locale;

/**
 * Calculates the ordinal suffix for a day of the month
 * @param dayOfMonth - The day number (1-31)
 * @returns The day number with its ordinal suffix (e.g., "1st", "2nd", "3rd", "4th")
 * 
 * @example
 * getOrdinalSuffix(1)  // returns "1st"
 * getOrdinalSuffix(2)  // returns "2nd"
 * getOrdinalSuffix(11) // returns "11th"
 * getOrdinalSuffix(21) // returns "21st"
 */
export function getOrdinalSuffix(dayOfMonth: number): string;

/**
 * English (Israel) locale configuration object
 */
export const enIlLocaleConfig: EnglishIsraelLocaleSpec;