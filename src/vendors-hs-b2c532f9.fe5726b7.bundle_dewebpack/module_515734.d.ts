/**
 * Moment.js locale configuration for Tetum (tet) language
 * Tetum is spoken in East Timor (Timor-Leste)
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Day of month ordinal parser configuration
 */
interface OrdinalParseConfig {
  /** Regular expression to match ordinal suffixes (1st, 2nd, 3rd, etc.) */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to generate ordinal suffix for a given number */
  ordinal: (dayOfMonth: number) => string;
}

/**
 * Calendar display configuration for relative dates
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
 * Relative time display configuration
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
  /** Full date with day name and time */
  LLLL: string;
}

/**
 * Week configuration (first day of week and first week of year)
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year to start counting weeks */
  doy: number;
}

/**
 * Complete Tetum locale specification for Moment.js
 */
export interface TetumLocaleSpec extends LocaleSpecification {
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
  /** Relative time display configurations */
  relativeTime: RelativeTimeSpec;
  /** Ordinal number parser and formatter */
  dayOfMonthOrdinalParse: RegExp;
  /** Ordinal number formatter function */
  ordinal: (dayOfMonth: number) => string;
  /** Week start configuration */
  week: WeekSpec;
}

/**
 * Defines and registers the Tetum (tet) locale configuration for Moment.js
 * 
 * @param momentInstance - The Moment.js instance to register the locale with
 * @returns The registered Locale object
 */
export function defineTetumLocale(momentInstance: typeof import('moment')): Locale;

/**
 * Tetum locale configuration object
 * Can be imported and used to configure Moment.js with Tetum language support
 */
export const tetLocaleConfig: TetumLocaleSpec;