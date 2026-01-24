/**
 * Moment.js Swahili (sw) locale configuration module
 * Provides localization for dates, times, and relative time formatting in Swahili language
 */

import { Moment, Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display format configuration
 * Defines how dates are displayed relative to the current day
 */
interface CalendarSpec {
  /** Format for today's date */
  sameDay: string;
  /** Format for tomorrow's date */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for yesterday's date */
  lastDay: string;
  /** Format for dates in the last week */
  lastWeek: string;
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time format configuration
 * Defines how time differences are expressed in Swahili
 */
interface RelativeTimeSpec {
  /** Future time indicator (e.g., "in 5 minutes") */
  future: string;
  /** Past time indicator (e.g., "5 minutes ago") */
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
 * Defines various date and time display formats
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "3:45 PM") */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date and time format with weekday */
  LLLL: string;
}

/**
 * Week configuration
 * Defines first day of week and day of year
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year to use for week-year calculations */
  doy: number;
}

/**
 * Complete Swahili locale specification for Moment.js
 */
interface SwahiliLocaleSpec extends LocaleSpecification {
  /** Full month names in Swahili */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names in Swahili */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday abbreviations */
  weekdaysMin: string[];
  /** Enable strict weekday parsing */
  weekdaysParseExact: boolean;
  /** Long date format templates */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display formats */
  calendar: CalendarSpec;
  /** Relative time formatting rules */
  relativeTime: RelativeTimeSpec;
  /** Week calculation settings */
  week: WeekSpec;
}

/**
 * Defines and registers the Swahili locale configuration with Moment.js
 * @param momentInstance - The Moment.js instance to configure
 * @returns The registered Swahili locale object
 */
export declare function defineSwahiliLocale(momentInstance: typeof Moment): Locale;

/**
 * Swahili locale configuration object
 * Contains all localization data for the Swahili (sw) language
 */
export declare const swahiliLocale: SwahiliLocaleSpec;

/**
 * Default export: Configured Swahili locale for Moment.js
 */
declare const _default: Locale;
export default _default;