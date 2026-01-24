/**
 * Moment.js locale configuration for English (India)
 * Defines date/time formatting rules and translations for the en-IN locale
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar format configuration
 * Defines how relative dates are displayed in calendar format
 */
interface CalendarSpec {
  /** Format for dates that fall on the current day */
  sameDay: string;
  /** Format for dates that fall on the next day */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates that fell on the previous day */
  lastDay: string;
  /** Format for dates in the last week */
  lastWeek: string;
  /** Default format for all other dates */
  sameElse: string;
}

/**
 * Relative time format configuration
 * Defines how durations are displayed in human-readable format
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
 * Long date format configuration
 * Defines various date/time display formats
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "3:45 PM") */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with day and time format */
  LLLL: string;
}

/**
 * Week configuration
 * Defines the first day of week and day of year
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year used to determine first week */
  doy: number;
}

/**
 * Complete locale specification for en-IN
 */
interface EnglishIndiaLocaleSpec extends LocaleSpecification {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormatSpec;
  calendar: CalendarSpec;
  relativeTime: RelativeTimeSpec;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (dayOfMonth: number) => string;
  week: WeekSpec;
}

/**
 * Defines the English (India) locale configuration for Moment.js
 * @param moment - The Moment.js instance
 * @returns The configured locale object
 */
export declare function defineEnglishIndiaLocale(moment: typeof import('moment')): Locale;

/**
 * English (India) locale configuration object
 */
export declare const enIndiaLocale: EnglishIndiaLocaleSpec;