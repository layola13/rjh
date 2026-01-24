/**
 * Moment.js Romanian (ro) locale configuration
 * Provides localization support for dates, times, and relative time formatting in Romanian
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration options for Romanian locale
 */
interface RomanianLocaleConfig extends LocaleSpecification {
  /** Full month names in Romanian */
  months: string[];
  /** Abbreviated month names in Romanian */
  monthsShort: string[];
  /** Whether to parse month names exactly */
  monthsParseExact: boolean;
  /** Full weekday names in Romanian */
  weekdays: string[];
  /** Abbreviated weekday names in Romanian */
  weekdaysShort: string[];
  /** Minimal weekday names in Romanian */
  weekdaysMin: string[];
  /** Long date format patterns */
  longDateFormat: LongDateFormat;
  /** Calendar format strings */
  calendar: CalendarSpec;
  /** Relative time format strings */
  relativeTime: RelativeTimeSpec;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Long date format patterns for Romanian locale
 */
interface LongDateFormat {
  /** Time format (e.g., "H:mm") */
  LT: string;
  /** Time with seconds format (e.g., "H:mm:ss") */
  LTS: string;
  /** Short date format (e.g., "DD.MM.YYYY") */
  L: string;
  /** Long date format (e.g., "D MMMM YYYY") */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with weekday and time */
  LLLL: string;
}

/**
 * Calendar format specification for relative dates
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
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time format specification
 */
interface RelativeTimeSpec {
  /** Future time prefix format */
  future: string;
  /** Past time prefix format */
  past: string;
  /** Seconds format */
  s: string;
  /** Seconds with count (function or string) */
  ss: string | RelativeTimeFunction;
  /** Minute singular format */
  m: string;
  /** Minutes with count (function or string) */
  mm: string | RelativeTimeFunction;
  /** Hour singular format */
  h: string;
  /** Hours with count (function or string) */
  hh: string | RelativeTimeFunction;
  /** Day singular format */
  d: string;
  /** Days with count (function or string) */
  dd: string | RelativeTimeFunction;
  /** Week singular format */
  w: string;
  /** Weeks with count (function or string) */
  ww: string | RelativeTimeFunction;
  /** Month singular format */
  M: string;
  /** Months with count (function or string) */
  MM: string | RelativeTimeFunction;
  /** Year singular format */
  y: string;
  /** Years with count (function or string) */
  yy: string | RelativeTimeFunction;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** First day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** First week of year calculation */
  doy: number;
}

/**
 * Function signature for relative time formatting
 */
type RelativeTimeFunction = (
  number: number,
  withoutSuffix: boolean,
  key: string
) => string;

/**
 * Time unit identifiers used in Romanian locale
 */
type TimeUnitKey = 'ss' | 'mm' | 'hh' | 'dd' | 'ww' | 'MM' | 'yy';

/**
 * Map of time units to their Romanian translations
 */
type TimeUnitTranslations = Record<TimeUnitKey, string>;

/**
 * Formats relative time with proper Romanian grammar rules
 * @param count - The number of time units
 * @param withoutSuffix - Whether to include prefix/suffix
 * @param key - The time unit key (ss, mm, hh, dd, ww, MM, yy)
 * @returns Formatted relative time string in Romanian
 */
export declare function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  key: TimeUnitKey
): string;

/**
 * Defines the Romanian locale configuration for moment.js
 * @param momentInstance - The moment.js instance
 * @returns The configured locale object
 */
export declare function defineRomanianLocale(momentInstance: typeof Locale): Locale;

/**
 * Romanian locale configuration object
 */
export declare const romanianLocale: RomanianLocaleConfig;