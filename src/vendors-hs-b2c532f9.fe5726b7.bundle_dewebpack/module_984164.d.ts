/**
 * Moment.js locale configuration for Danish (da)
 * @module DanishLocale
 */

/**
 * Day of week configuration
 * dow: 1 = Monday is the first day of the week
 * doy: 4 = The week that contains Jan 4th is the first week of the year
 */
interface WeekConfig {
  /** First day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year that defines the first week */
  doy: number;
}

/**
 * Long date format tokens and their patterns
 */
interface LongDateFormat {
  /** Time format (e.g., "14:30") */
  LT: string;
  /** Time with seconds format (e.g., "14:30:45") */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with day name and time */
  LLLL: string;
}

/**
 * Calendar display strings for relative dates
 */
interface CalendarConfig {
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
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time format strings
 */
interface RelativeTimeConfig {
  /** Future time prefix/suffix pattern */
  future: string;
  /** Past time prefix/suffix pattern */
  past: string;
  /** Seconds (singular/few) */
  s: string;
  /** Seconds (plural) - %d will be replaced with number */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (plural) - %d will be replaced with number */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (plural) - %d will be replaced with number */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (plural) - %d will be replaced with number */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (plural) - %d will be replaced with number */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural) - %d will be replaced with number */
  yy: string;
}

/**
 * Complete locale configuration for Danish
 */
interface DanishLocaleConfig {
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
  /** Calendar display configuration */
  calendar: CalendarConfig;
  /** Relative time format strings */
  relativeTime: RelativeTimeConfig;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Ordinal number format - %d will be replaced with number */
  ordinal: string;
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Moment.js instance with locale methods
 */
interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., "da" for Danish)
   * @param config - The locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeName: string, config: DanishLocaleConfig): unknown;
}

/**
 * Defines the Danish locale configuration for Moment.js
 * @param moment - Moment.js instance
 * @returns The configured Danish locale
 */
declare function defineDanishLocale(moment: MomentStatic): unknown;

export = defineDanishLocale;