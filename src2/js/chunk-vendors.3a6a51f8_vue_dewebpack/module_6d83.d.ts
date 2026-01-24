/**
 * Moment.js locale configuration for Arabic (Tunisia)
 * @module ar-tn
 */

import { Moment } from 'moment';

/**
 * Calendar specification for relative date formatting
 */
interface CalendarSpec {
  /** Format for dates that fall on the same day */
  sameDay: string;
  /** Format for dates that fall on the next day */
  nextDay: string;
  /** Format for dates that fall within the next week */
  nextWeek: string;
  /** Format for dates that fell on the previous day */
  lastDay: string;
  /** Format for dates that fell within the previous week */
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
  /** Format for seconds (singular) */
  s: string;
  /** Format for seconds (plural) */
  ss: string;
  /** Format for minute (singular) */
  m: string;
  /** Format for minutes (plural) */
  mm: string;
  /** Format for hour (singular) */
  h: string;
  /** Format for hours (plural) */
  hh: string;
  /** Format for day (singular) */
  d: string;
  /** Format for days (plural) */
  dd: string;
  /** Format for month (singular) */
  M: string;
  /** Format for months (plural) */
  MM: string;
  /** Format for year (singular) */
  y: string;
  /** Format for years (plural) */
  yy: string;
}

/**
 * Long date format tokens
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
  /** Full date with day of week and time */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year that defines the first week of the year */
  doy: number;
}

/**
 * Complete locale configuration specification
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
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpec;
  /** Calendar relative date formats */
  calendar: CalendarSpec;
  /** Relative time duration formats */
  relativeTime: RelativeTimeSpec;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Moment.js instance with locale definition capabilities
 */
interface MomentStatic extends Moment {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., "ar-tn")
   * @param config - The locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeName: string, config: LocaleSpecification): Moment;
}

/**
 * Arabic (Tunisia) locale configuration
 */
declare const localeConfig: LocaleSpecification;

export { LocaleSpecification, CalendarSpec, RelativeTimeSpec, LongDateFormatSpec, WeekSpec, MomentStatic };
export default localeConfig;