/**
 * Moment.js locale configuration for Urdu (ur)
 * Defines localization settings including month names, weekday names, date formats,
 * and relative time strings in Urdu language.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Urdu month names (used for both full and short forms)
 */
export type UrduMonthName =
  | 'جنوری'
  | 'فروری'
  | 'مارچ'
  | 'اپریل'
  | 'مئی'
  | 'جون'
  | 'جولائی'
  | 'اگست'
  | 'ستمبر'
  | 'اکتوبر'
  | 'نومبر'
  | 'دسمبر';

/**
 * Urdu weekday names (used for full, short, and min forms)
 */
export type UrduWeekdayName =
  | 'اتوار'
  | 'پیر'
  | 'منگل'
  | 'بدھ'
  | 'جمعرات'
  | 'جمعہ'
  | 'ہفتہ';

/**
 * Meridiem values in Urdu
 */
export type UrduMeridiem = 'صبح' | 'شام';

/**
 * Long date format keys for Urdu locale
 */
export interface UrduLongDateFormat {
  /** Time format (HH:mm) */
  LT: string;
  /** Time with seconds format (HH:mm:ss) */
  LTS: string;
  /** Short date format (DD/MM/YYYY) */
  L: string;
  /** Long date format (D MMMM YYYY) */
  LL: string;
  /** Long date with time format (D MMMM YYYY HH:mm) */
  LLL: string;
  /** Full date with weekday and time (dddd، D MMMM YYYY HH:mm) */
  LLLL: string;
}

/**
 * Calendar format strings for Urdu locale
 */
export interface UrduCalendarFormat {
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
 * Relative time format strings for Urdu locale
 */
export interface UrduRelativeTimeFormat {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Few seconds */
  s: string;
  /** Seconds with count */
  ss: string;
  /** One minute */
  m: string;
  /** Minutes with count */
  mm: string;
  /** One hour */
  h: string;
  /** Hours with count */
  hh: string;
  /** One day */
  d: string;
  /** Days with count */
  dd: string;
  /** One month */
  M: string;
  /** Months with count */
  MM: string;
  /** One year */
  y: string;
  /** Years with count */
  yy: string;
}

/**
 * Week configuration for Urdu locale
 */
export interface UrduWeekConfig {
  /** Day of week (1 = Monday) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Complete Urdu locale specification for moment.js
 */
export interface UrduLocaleSpecification extends LocaleSpecification {
  /** Full month names */
  months: readonly UrduMonthName[];
  /** Short month names */
  monthsShort: readonly UrduMonthName[];
  /** Full weekday names */
  weekdays: readonly UrduWeekdayName[];
  /** Short weekday names */
  weekdaysShort: readonly UrduWeekdayName[];
  /** Minimal weekday names */
  weekdaysMin: readonly UrduWeekdayName[];
  /** Long date format configurations */
  longDateFormat: UrduLongDateFormat;
  /** Regular expression to parse meridiem */
  meridiemParse: RegExp;
  /** Check if time is PM */
  isPM: (meridiemString: string) => boolean;
  /** Get meridiem string for given hour */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => UrduMeridiem;
  /** Calendar format strings */
  calendar: UrduCalendarFormat;
  /** Relative time format strings */
  relativeTime: UrduRelativeTimeFormat;
  /** Pre-process date string before parsing */
  preparse: (dateString: string) => string;
  /** Post-process formatted date string */
  postformat: (dateString: string) => string;
  /** Week configuration */
  week: UrduWeekConfig;
}

/**
 * Checks if the given meridiem string represents PM (afternoon/evening)
 * @param meridiemString - The meridiem string to check ('صبح' or 'شام')
 * @returns true if the string is 'شام' (PM), false otherwise
 */
export declare function isPM(meridiemString: string): boolean;

/**
 * Returns the appropriate meridiem string based on the hour
 * @param hour - Hour of the day (0-23)
 * @param minute - Minute of the hour (0-59)
 * @param isLowercase - Whether to return lowercase (not used in Urdu)
 * @returns 'صبح' (morning) for hours < 12, 'شام' (evening) otherwise
 */
export declare function meridiem(
  hour: number,
  minute: number,
  isLowercase: boolean
): UrduMeridiem;

/**
 * Pre-processes date string by replacing Urdu comma with standard comma
 * @param dateString - The date string to preprocess
 * @returns Processed date string with standard commas
 */
export declare function preparse(dateString: string): string;

/**
 * Post-processes formatted date string by replacing standard comma with Urdu comma
 * @param dateString - The formatted date string to postprocess
 * @returns Processed date string with Urdu commas
 */
export declare function postformat(dateString: string): string;

/**
 * The complete Urdu locale definition
 */
export declare const urduLocale: Locale;

export default urduLocale;