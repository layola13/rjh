/**
 * Moment.js locale configuration for Nepali (ne)
 * @module moment/locale/ne
 */

import { Moment } from 'moment';

/**
 * Mapping from Arabic numerals to Devanagari numerals
 */
type ArabicToDevanagariMap = {
  [key: string]: string;
};

/**
 * Mapping from Devanagari numerals to Arabic numerals
 */
type DevanagariToArabicMap = {
  [key: string]: string;
};

/**
 * Nepali time of day period
 */
type NepaliMeridiem = 'राति' | 'बिहान' | 'दिउँसो' | 'साँझ';

/**
 * Long date format tokens for Nepali locale
 */
interface LongDateFormat {
  /** Time format (e.g., "2:30 PM") */
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
 * Calendar configuration for relative date display
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
 * Relative time configuration
 */
interface RelativeTimeSpec {
  /** Future time prefix */
  future: string;
  /** Past time suffix */
  past: string;
  /** A few seconds */
  s: string;
  /** Seconds format */
  ss: string;
  /** One minute */
  m: string;
  /** Minutes format */
  mm: string;
  /** One hour */
  h: string;
  /** Hours format */
  hh: string;
  /** One day */
  d: string;
  /** Days format */
  dd: string;
  /** One month */
  M: string;
  /** Months format */
  MM: string;
  /** One year */
  y: string;
  /** Years format */
  yy: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0 = Sunday) */
  dow: number;
  /** Day of year */
  doy: number;
}

/**
 * Complete locale configuration for Nepali
 */
interface NepaliLocaleConfig {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format tokens */
  longDateFormat: LongDateFormat;
  /** Parse Devanagari numerals to Arabic */
  preparse: (input: string) => string;
  /** Format Arabic numerals to Devanagari */
  postformat: (input: string) => string;
  /** Regex to parse meridiem (time of day) */
  meridiemParse: RegExp;
  /** Convert 12-hour format to 24-hour based on meridiem */
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  /** Get meridiem string based on hour and minute */
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
  /** Calendar display specifications */
  calendar: CalendarSpec;
  /** Relative time specifications */
  relativeTime: RelativeTimeSpec;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Arabic to Devanagari numeral mapping
 */
export declare const arabicToDevanagari: ArabicToDevanagariMap;

/**
 * Devanagari to Arabic numeral mapping
 */
export declare const devanagariToArabic: DevanagariToArabicMap;

/**
 * Converts Devanagari numerals in a string to Arabic numerals
 * @param input - String containing Devanagari numerals
 * @returns String with Arabic numerals
 */
export declare function preparse(input: string): string;

/**
 * Converts Arabic numerals in a string to Devanagari numerals
 * @param input - String containing Arabic numerals
 * @returns String with Devanagari numerals
 */
export declare function postformat(input: string): string;

/**
 * Converts 12-hour format hour to 24-hour format based on Nepali meridiem
 * @param hour - Hour in 12-hour format
 * @param meridiem - Nepali time of day period
 * @returns Hour in 24-hour format, or undefined if invalid
 */
export declare function meridiemHour(hour: number, meridiem: string): number | undefined;

/**
 * Returns the Nepali meridiem (time of day) for given hour
 * @param hour - Hour in 24-hour format
 * @param minute - Minute
 * @param isLower - Whether to return lowercase (not used in Nepali)
 * @returns Nepali meridiem string
 */
export declare function meridiem(hour: number, minute: number, isLower: boolean): string;

/**
 * Complete Nepali locale configuration object
 */
export declare const nepaliLocale: NepaliLocaleConfig;

/**
 * Defines the Nepali locale in moment.js
 * @param moment - Moment.js instance
 */
export declare function defineNepaliLocale(moment: typeof Moment): void;