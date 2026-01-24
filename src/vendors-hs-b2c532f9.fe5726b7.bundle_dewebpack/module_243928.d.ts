/**
 * Moment.js locale configuration for Portuguese (Brazil)
 * @module pt-br
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for specific time references
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
  lastWeek: string | (() => string);
  /** Default format for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration for moment.js
 */
interface RelativeTimeSpec {
  /** Format for future dates */
  future: string;
  /** Format for past dates */
  past: string;
  /** Format for a few seconds */
  s: string;
  /** Format for seconds */
  ss: string;
  /** Format for a minute */
  m: string;
  /** Format for minutes */
  mm: string;
  /** Format for an hour */
  h: string;
  /** Format for hours */
  hh: string;
  /** Format for a day */
  d: string;
  /** Format for days */
  dd: string;
  /** Format for a month */
  M: string;
  /** Format for months */
  MM: string;
  /** Format for a year */
  y: string;
  /** Format for years */
  yy: string;
}

/**
 * Long date format configuration
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
  /** Full date format with day of week and time */
  LLLL: string;
}

/**
 * Complete locale configuration for Brazilian Portuguese
 */
interface PtBrLocaleSpecification extends LocaleSpecification {
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
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format templates */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configuration */
  calendar: CalendarSpec;
  /** Relative time formatting */
  relativeTime: RelativeTimeSpec;
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: string;
  /** Message displayed for invalid dates */
  invalidDate: string;
}

/**
 * Defines the Brazilian Portuguese locale for moment.js
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured locale object
 */
export declare function definePtBrLocale(momentInstance: typeof import('moment')): Locale;

/**
 * Brazilian Portuguese locale configuration
 */
export declare const ptBrLocaleConfig: PtBrLocaleSpecification;