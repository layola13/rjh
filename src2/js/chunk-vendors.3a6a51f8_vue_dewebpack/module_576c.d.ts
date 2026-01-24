/**
 * Moment.js locale configuration for Tetum (tet)
 * Tetum is spoken in Timor-Leste (East Timor)
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Day of week numbering configuration
 */
interface WeekSpecification {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year used to calculate the first week of the year */
  doy: number;
}

/**
 * Long date format tokens
 */
interface LongDateFormatSpecification {
  /** Time format (e.g., "HH:mm") */
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
 * Calendar date display configuration
 */
interface CalendarSpecification {
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
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time configuration
 */
interface RelativeTimeSpecification {
  /** Future time prefix/suffix pattern */
  future: string;
  /** Past time prefix/suffix pattern */
  past: string;
  /** Seconds (few) */
  s: string;
  /** Seconds (with number) */
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
 * Complete Tetum locale configuration for Moment.js
 */
export interface TetumLocaleConfiguration extends LocaleSpecification {
  /** Full month names in Tetum */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names in Tetum */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpecification;
  /** Calendar date display rules */
  calendar: CalendarSpecification;
  /** Relative time display rules */
  relativeTime: RelativeTimeSpecification;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers (1st, 2nd, 3rd, etc.) */
  ordinal: (dayOfMonth: number) => string;
  /** Week numbering configuration */
  week: WeekSpecification;
}

/**
 * Defines and registers the Tetum locale with Moment.js
 * @param moment - The Moment.js instance
 * @returns The registered Tetum locale
 */
declare function defineTetumLocale(moment: typeof import('moment')): Locale;

export default defineTetumLocale;