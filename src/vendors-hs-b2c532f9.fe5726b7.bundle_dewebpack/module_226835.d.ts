/**
 * Moment.js locale configuration for English (Australia)
 * Defines Australian English locale settings including date/time formats,
 * calendar strings, and relative time expressions.
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for relative dates
 */
interface CalendarSpec {
  /** Format for dates that fall on today */
  sameDay: string;
  /** Format for dates that fall on tomorrow */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates that fell on yesterday */
  lastDay: string;
  /** Format for dates in the last week */
  lastWeek: string;
  /** Default format for all other dates */
  sameElse: string;
}

/**
 * Relative time format strings
 */
interface RelativeTimeSpec {
  /** Future time prefix/format */
  future: string;
  /** Past time prefix/format */
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
  /** Time format */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with time format */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year used to determine first week of year */
  doy: number;
}

/**
 * Complete locale specification for English (Australia)
 */
interface EnglishAustraliaLocaleSpec extends LocaleSpecification {
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
 * Calculates the ordinal suffix for a given day of month
 * @param dayOfMonth - The day number (1-31)
 * @returns The day with appropriate suffix (e.g., "1st", "2nd", "3rd", "4th")
 */
declare function getOrdinal(dayOfMonth: number): string;

/**
 * Defines and registers the English (Australia) locale with moment.js
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured locale object
 */
declare function defineEnglishAustraliaLocale(momentInstance: typeof import('moment')): Locale;

/**
 * English (Australia) locale configuration object
 */
declare const enAuLocale: EnglishAustraliaLocaleSpec;

export { enAuLocale, defineEnglishAustraliaLocale, getOrdinal };
export type { 
  EnglishAustraliaLocaleSpec, 
  CalendarSpec, 
  RelativeTimeSpec, 
  LongDateFormatSpec, 
  WeekSpec 
};