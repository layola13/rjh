/**
 * Moment.js locale configuration for Gom-Deva (Konkani in Devanagari script)
 * @module moment-locale-gom-deva
 */

import { Locale, MomentInput } from 'moment';

/**
 * Configuration options for moment.js locale
 */
interface LocaleSpecification {
  /** Month names configuration */
  months: {
    /** Standalone month names */
    standalone: string[];
    /** Month names in sentence format */
    format: string[];
    /** Regex to determine which format to use */
    isFormat: RegExp;
  };
  /** Abbreviated month names */
  monthsShort: string[];
  /** Whether to parse month names exactly */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to parse weekday names exactly */
  weekdaysParseExact: boolean;
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpec;
  /** Calendar format configuration */
  calendar: CalendarSpec;
  /** Relative time format configuration */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: (num: number, token: string) => string | number;
  /** Week configuration */
  week: WeekSpec;
  /** Regex pattern for parsing meridiem (AM/PM) */
  meridiemParse: RegExp;
  /** Function to convert 12-hour format to 24-hour based on meridiem */
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  /** Function to determine meridiem from hour */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
}

/**
 * Long date format specification
 */
interface LongDateFormatSpec {
  /** Time format */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with time format */
  LLLL: string;
  /** Abbreviated full date with time format */
  llll: string;
}

/**
 * Calendar format specification for different time periods
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
 * Relative time format specification
 */
interface RelativeTimeSpec {
  /** Future time prefix/suffix */
  future: string;
  /** Past time prefix/suffix */
  past: string;
  /** Seconds formatter */
  s: RelativeTimeFormatter;
  /** Seconds formatter (plural) */
  ss: RelativeTimeFormatter;
  /** Minute formatter */
  m: RelativeTimeFormatter;
  /** Minutes formatter */
  mm: RelativeTimeFormatter;
  /** Hour formatter */
  h: RelativeTimeFormatter;
  /** Hours formatter */
  hh: RelativeTimeFormatter;
  /** Day formatter */
  d: RelativeTimeFormatter;
  /** Days formatter */
  dd: RelativeTimeFormatter;
  /** Month formatter */
  M: RelativeTimeFormatter;
  /** Months formatter */
  MM: RelativeTimeFormatter;
  /** Year formatter */
  y: RelativeTimeFormatter;
  /** Years formatter */
  yy: RelativeTimeFormatter;
}

/**
 * Function type for formatting relative time
 */
type RelativeTimeFormatter = (
  num: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0 = Sunday) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Relative time translation map
 */
interface RelativeTimeTranslations {
  /** Seconds translations [future, past] */
  s: [string, string];
  /** Seconds with number translations */
  ss: [string, string];
  /** Minute translations */
  m: [string, string];
  /** Minutes with number translations */
  mm: [string, string];
  /** Hour translations */
  h: [string, string];
  /** Hours with number translations */
  hh: [string, string];
  /** Day translations */
  d: [string, string];
  /** Days with number translations */
  dd: [string, string];
  /** Month translations */
  M: [string, string];
  /** Months with number translations */
  MM: [string, string];
  /** Year translations */
  y: [string, string];
  /** Years with number translations */
  yy: [string, string];
}

/**
 * Formats relative time in Konkani (Gom-Deva script)
 * @param num - The numeric value
 * @param withoutSuffix - Whether to include suffix
 * @param key - The time unit key (s, m, h, d, M, y, etc.)
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string
 */
declare function formatRelativeTime(
  num: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string;

/**
 * Defines the Gom-Deva locale for moment.js
 * @param moment - The moment.js instance
 */
declare function defineGomDevaLocale(moment: Locale): void;

export { 
  LocaleSpecification, 
  RelativeTimeFormatter, 
  formatRelativeTime, 
  defineGomDevaLocale 
};