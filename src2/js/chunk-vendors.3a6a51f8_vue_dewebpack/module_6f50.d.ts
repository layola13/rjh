/**
 * Moment.js locale configuration for English (New Zealand)
 * @module en-nz-locale
 */

import { Moment } from 'moment';

/**
 * Calendar specification for relative time display
 */
interface CalendarSpec {
  /** Format for times today */
  sameDay: string;
  /** Format for times tomorrow */
  nextDay: string;
  /** Format for times next week */
  nextWeek: string;
  /** Format for times yesterday */
  lastDay: string;
  /** Format for times last week */
  lastWeek: string;
  /** Format for all other times */
  sameElse: string;
}

/**
 * Relative time configuration
 */
interface RelativeTimeSpec {
  /** Future time format (e.g., "in 5 minutes") */
  future: string;
  /** Past time format (e.g., "5 minutes ago") */
  past: string;
  /** A few seconds */
  s: string;
  /** Seconds format */
  ss: string;
  /** A minute */
  m: string;
  /** Minutes format */
  mm: string;
  /** An hour */
  h: string;
  /** Hours format */
  hh: string;
  /** A day */
  d: string;
  /** Days format */
  dd: string;
  /** A month */
  M: string;
  /** Months format */
  MM: string;
  /** A year */
  y: string;
  /** Years format */
  yy: string;
}

/**
 * Long date format tokens
 */
interface LongDateFormat {
  /** Time format (e.g., "h:mm A") */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date and time format */
  LLL: string;
  /** Full date and time format */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year for first week */
  doy: number;
}

/**
 * Locale configuration for Moment.js
 */
interface LocaleSpecification {
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
  /** Long date format tokens */
  longDateFormat: LongDateFormat;
  /** Calendar display specification */
  calendar: CalendarSpec;
  /** Relative time configuration */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to generate ordinal suffix for day of month */
  ordinal: (dayOfMonth: number) => string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Defines the English (New Zealand) locale for Moment.js
 * @param moment - The Moment.js instance
 */
export function defineEnNzLocale(moment: typeof Moment): void;

/**
 * English (New Zealand) locale configuration
 */
export const localeConfig: LocaleSpecification;