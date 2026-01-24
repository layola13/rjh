/**
 * Moment.js locale configuration for Tamazight Latin (tzm-latn)
 * @module moment/locale/tzm-latn
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for relative dates
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
 * Relative time configuration for duration formatting
 */
interface RelativeTimeSpec {
  /** Format for future times */
  future: string;
  /** Format for past times */
  past: string;
  /** Format for seconds */
  s: string;
  /** Format for multiple seconds */
  ss: string;
  /** Format for a minute */
  m: string;
  /** Format for multiple minutes */
  mm: string;
  /** Format for an hour */
  h: string;
  /** Format for multiple hours */
  hh: string;
  /** Format for a day */
  d: string;
  /** Format for multiple days */
  dd: string;
  /** Format for a month */
  M: string;
  /** Format for multiple months */
  MM: string;
  /** Format for a year */
  y: string;
  /** Format for multiple years */
  yy: string;
}

/**
 * Long date format tokens configuration
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
  /** Full date with weekday and time format */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 6=Saturday) */
  dow: number;
  /** Day of year for the first week */
  doy: number;
}

/**
 * Complete Tamazight Latin locale specification
 */
interface TzmLatnLocaleSpec extends LocaleSpecification {
  /** Full month names in Tamazight Latin */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Long date format patterns */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configuration */
  calendar: CalendarSpec;
  /** Relative time formatting */
  relativeTime: RelativeTimeSpec;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Defines the Tamazight Latin (tzm-latn) locale for Moment.js
 * 
 * This locale includes:
 * - Tamazight month names
 * - Tamazight weekday names
 * - Standard date/time formatting patterns
 * - Relative time expressions in Tamazight
 * - Calendar formatting for contextual dates
 * 
 * @param moment - The Moment.js instance to configure
 * @returns The configured Locale instance
 */
export function defineLocale(moment: typeof import('moment')): Locale;

/**
 * The complete locale configuration object
 */
export const localeConfig: TzmLatnLocaleSpec;

/**
 * Locale identifier
 */
export const LOCALE_ID: 'tzm-latn';