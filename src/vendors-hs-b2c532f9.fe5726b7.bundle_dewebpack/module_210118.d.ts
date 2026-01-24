/**
 * Moment.js locale configuration for Tamazight Latin (tzm-latn)
 * 
 * This module provides localization support for the Tamazight language
 * using Latin script in moment.js date/time library.
 * 
 * @module tzm-latn-locale
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for relative time references
 */
interface CalendarSpec {
  /** Format for times occurring today */
  sameDay: string;
  /** Format for times occurring tomorrow */
  nextDay: string;
  /** Format for times occurring next week */
  nextWeek: string;
  /** Format for times that occurred yesterday */
  lastDay: string;
  /** Format for times that occurred last week */
  lastWeek: string;
  /** Format for all other times */
  sameElse: string;
}

/**
 * Relative time format configuration
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
  /** Long date with time format (e.g., "D MMMM YYYY HH:mm") */
  LLL: string;
  /** Full date with time format (e.g., "dddd D MMMM YYYY HH:mm") */
  LLLL: string;
}

/**
 * Week configuration specifying start of week and year
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 6=Saturday) */
  dow: number;
  /** Day of year that defines week 1 */
  doy: number;
}

/**
 * Complete locale specification for Tamazight Latin
 */
interface TzmLatnLocaleSpecification extends LocaleSpecification {
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
  /** Long date format configurations */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configurations */
  calendar: CalendarSpec;
  /** Relative time format configurations */
  relativeTime: RelativeTimeSpec;
  /** Week start and year start configuration */
  week: WeekSpec;
}

/**
 * Defines and registers the Tamazight Latin locale configuration with moment.js
 * 
 * @param moment - The moment.js instance to register the locale with
 * @returns The registered locale object
 * 
 * @example
 *