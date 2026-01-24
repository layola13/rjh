/**
 * Moment.js locale configuration for Khmer (Cambodia)
 * @module moment/locale/km
 */

import { Locale, MomentInput } from 'moment';

/**
 * Mapping from Arabic numerals to Khmer numerals
 */
type ArabicToKhmerMap = {
  [K in '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9']: string;
};

/**
 * Mapping from Khmer numerals to Arabic numerals
 */
type KhmerToArabicMap = {
  [key: string]: string;
};

/**
 * Long date format tokens for Khmer locale
 */
interface LongDateFormat {
  /** Time format (hours:minutes) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date format with time */
  LLL: string;
  /** Full date format with day name and time */
  LLLL: string;
}

/**
 * Calendar format strings for relative dates
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
 * Relative time format strings
 */
interface RelativeTimeSpec {
  /** Future time prefix/suffix */
  future: string;
  /** Past time prefix/suffix */
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
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year for first week */
  doy: number;
}

/**
 * Locale configuration object for Khmer
 */
interface KhmerLocaleConfig {
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
  /** Use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format tokens */
  longDateFormat: LongDateFormat;
  /** Regular expression to parse meridiem (AM/PM) */
  meridiemParse: RegExp;
  /** Determines if given string represents PM */
  isPM: (input: string) => boolean;
  /** Returns meridiem string based on hour */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  /** Calendar format specifications */
  calendar: CalendarSpec;
  /** Relative time format specifications */
  relativeTime: RelativeTimeSpec;
  /** Regular expression to parse ordinal numbers */
  dayOfMonthOrdinalParse: RegExp;
  /** Returns ordinal string for given number */
  ordinal: string;
  /** Pre-parse function to convert Khmer numerals to Arabic */
  preparse: (input: string) => string;
  /** Post-format function to convert Arabic numerals to Khmer */
  postformat: (input: string) => string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Arabic to Khmer numeral mapping
 */
declare const arabicToKhmerNumerals: ArabicToKhmerMap;

/**
 * Khmer to Arabic numeral mapping
 */
declare const khmerToArabicNumerals: KhmerToArabicMap;

/**
 * Defines the Khmer locale configuration for moment.js
 * @param moment - The moment.js instance
 * @returns The configured Khmer locale
 */
declare function defineKhmerLocale(moment: typeof import('moment')): Locale;

export = defineKhmerLocale;