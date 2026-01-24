/**
 * Moment.js locale configuration for Bambara (bm)
 * Defines date/time formatting rules for the Bambara language
 * @module moment-locale-bm
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Long date format configuration
 * Defines various date/time display formats
 */
interface LongDateFormat {
  /** Time format (24-hour with minutes) */
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
 * Calendar display configuration
 * Defines how to display dates relative to today
 */
interface CalendarSpec {
  /** Format for today */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for yesterday */
  lastDay: string;
  /** Format for last week */
  lastWeek: string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration
 * Defines how to express time durations
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
 * Week configuration
 * Defines week start and day of year
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year that defines the first week */
  doy: number;
}

/**
 * Complete Bambara locale specification
 */
interface BambaraLocaleSpec extends LocaleSpecification {
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
  /** Long date format patterns */
  longDateFormat: LongDateFormat;
  /** Calendar display rules */
  calendar: CalendarSpec;
  /** Relative time expressions */
  relativeTime: RelativeTimeSpec;
  /** Week calculation settings */
  week: WeekSpec;
}

/**
 * Defines the Bambara locale for Moment.js
 * @param momentInstance - The Moment.js instance to configure
 * @returns The configured locale object
 */
export function defineBambaraLocale(momentInstance: typeof import('moment')): Locale;

/**
 * Bambara locale configuration object
 */
export const bambaraLocale: BambaraLocaleSpec;

/**
 * Default export: Locale definition function
 */
export default defineBambaraLocale;