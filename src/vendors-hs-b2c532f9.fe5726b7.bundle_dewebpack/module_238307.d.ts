/**
 * Moment.js Portuguese (pt) locale configuration module
 * Provides localized date/time formatting for Portuguese language
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display functions for relative time expressions
 */
interface CalendarSpec {
  /** Format for same day */
  sameDay: string;
  /** Format for next day */
  nextDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for last day */
  lastDay: string;
  /** Format for last week (dynamic based on day of week) */
  lastWeek: (this: moment.Moment) => string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time format strings
 */
interface RelativeTimeSpec {
  /** Future time prefix */
  future: string;
  /** Past time prefix */
  past: string;
  /** Seconds (plural) */
  s: string;
  /** Seconds with count */
  ss: string;
  /** One minute */
  m: string;
  /** Minutes with count */
  mm: string;
  /** One hour */
  h: string;
  /** Hours with count */
  hh: string;
  /** One day */
  d: string;
  /** Days with count */
  dd: string;
  /** One week */
  w: string;
  /** Weeks with count */
  ww: string;
  /** One month */
  M: string;
  /** Months with count */
  MM: string;
  /** One year */
  y: string;
  /** Years with count */
  yy: string;
}

/**
 * Long date format tokens
 */
interface LongDateFormatSpec {
  /** Time format (HH:mm) */
  LT: string;
  /** Time with seconds format (HH:mm:ss) */
  LTS: string;
  /** Short date format (DD/MM/YYYY) */
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
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Portuguese locale configuration for Moment.js
 */
export interface PortugueseLocaleConfig extends LocaleSpecification {
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
  /** Whether to parse weekdays exactly */
  weekdaysParseExact: boolean;
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configuration */
  calendar: CalendarSpec;
  /** Relative time format strings */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Ordinal number format */
  ordinal: string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Defines the Portuguese locale configuration for Moment.js
 * 
 * @param momentInstance - The Moment.js instance to configure
 * @returns The configured Portuguese locale
 */
declare function definePortugueseLocale(momentInstance: typeof moment): Locale;

export default definePortugueseLocale;