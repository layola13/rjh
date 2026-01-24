/**
 * Moment.js locale configuration for French (Switzerland)
 * @module fr-ch
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration
 * Defines how dates are displayed relative to the current day
 */
interface CalendarSpec {
  /** Format for today's dates */
  sameDay: string;
  /** Format for tomorrow's dates */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for yesterday's dates */
  lastDay: string;
  /** Format for dates in the last week */
  lastWeek: string;
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time configuration
 * Defines how to display relative time differences
 */
interface RelativeTimeSpec {
  /** Future time format template */
  future: string;
  /** Past time format template */
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
 * Long date format configuration
 * Defines various date/time display formats
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
  /** Long date with time */
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
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Complete locale specification for French (Switzerland)
 */
interface FrenchSwissLocaleSpec extends LocaleSpecification {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Use exact parsing for months */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format configurations */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configurations */
  calendar: CalendarSpec;
  /** Relative time configurations */
  relativeTime: RelativeTimeSpec;
  /** Pattern for parsing day of month ordinals */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to generate ordinal suffix */
  ordinal: (dayOfMonth: number, period: string) => string;
  /** Week calculation configuration */
  week: WeekSpec;
}

/**
 * Defines the French (Switzerland) locale for moment.js
 * @param moment - The moment.js instance
 * @returns The configured locale
 */
export function defineFrenchSwissLocale(moment: typeof import('moment')): Locale;

/**
 * French (Switzerland) locale configuration
 */
declare const frenchSwissLocale: FrenchSwissLocaleSpec;

export default frenchSwissLocale;