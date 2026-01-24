/**
 * Moment.js locale configuration for Georgian (ka)
 * @module moment-locale-ka
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Weekdays configuration supporting different formats based on context
 */
interface WeekdaysSpecification {
  /** Standalone weekday names (nominative case) */
  standalone: string[];
  /** Formatted weekday names (used with dates, dative case) */
  format: string[];
  /** Regular expression to determine which format to use */
  isFormat: RegExp;
}

/**
 * Calendar display configuration for relative dates
 */
interface CalendarSpecification {
  /** Format for dates occurring today */
  sameDay: string;
  /** Format for dates occurring tomorrow */
  nextDay: string;
  /** Format for dates occurring yesterday */
  lastDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates in the previous week */
  lastWeek: string;
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time configuration with custom formatting functions
 */
interface RelativeTimeSpecification {
  /** Format future dates by replacing suffix patterns */
  future: (timeString: string) => string;
  /** Format past dates with appropriate suffix */
  past: (timeString: string) => string;
  /** Format for "a few seconds" */
  s: string;
  /** Format for seconds (plural) */
  ss: string;
  /** Format for "a minute" */
  m: string;
  /** Format for minutes (plural) */
  mm: string;
  /** Format for "an hour" */
  h: string;
  /** Format for hours (plural) */
  hh: string;
  /** Format for "a day" */
  d: string;
  /** Format for days (plural) */
  dd: string;
  /** Format for "a month" */
  M: string;
  /** Format for months (plural) */
  MM: string;
  /** Format for "a year" */
  y: string;
  /** Format for years (plural) */
  yy: string;
}

/**
 * Long date format tokens configuration
 */
interface LongDateFormatSpecification {
  /** Time format (e.g., "14:30") */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date and time format */
  LLL: string;
  /** Full date and time format with weekday */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpecification {
  /** Day of week (0 = Sunday, 1 = Monday) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Complete locale specification for Georgian
 */
interface GeorgianLocaleSpecification extends LocaleSpecification {
  months: string[];
  monthsShort: string[];
  weekdays: WeekdaysSpecification;
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormatSpecification;
  calendar: CalendarSpecification;
  relativeTime: RelativeTimeSpecification;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (dayOfMonth: number) => string;
  week: WeekSpecification;
}

/**
 * Defines the Georgian (ka) locale configuration for moment.js
 * 
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured locale object
 * 
 * @example
 *