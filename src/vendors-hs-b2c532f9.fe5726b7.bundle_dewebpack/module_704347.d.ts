/**
 * Moment.js locale configuration for English (Ireland)
 * Defines date/time formatting, calendar strings, and relative time for the en-IE locale.
 */

import { Locale, LocaleSpecification } from 'moment';

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
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration for duration formatting
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
 * Long date format tokens mapping
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
  /** Full date with day and time format */
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
 * Complete locale specification for en-IE
 */
interface EnglishIrelandLocaleSpec extends LocaleSpecification {
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
 * Calculates the ordinal suffix for a given number (1st, 2nd, 3rd, 4th, etc.)
 * @param num - The day of month number
 * @returns The number with its ordinal suffix
 */
declare function getOrdinal(num: number): string;

/**
 * English (Ireland) locale configuration object
 */
declare const enIrelandLocale: EnglishIrelandLocaleSpec;

/**
 * Defines and registers the en-IE locale with moment.js
 * @param moment - The moment.js instance
 * @returns The registered locale instance
 */
declare function defineEnglishIrelandLocale(moment: typeof import('moment')): Locale;

export { 
  enIrelandLocale, 
  defineEnglishIrelandLocale, 
  EnglishIrelandLocaleSpec,
  CalendarSpec,
  RelativeTimeSpec,
  LongDateFormatSpec,
  WeekSpec,
  getOrdinal
};

export default defineEnglishIrelandLocale;