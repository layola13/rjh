/**
 * Moment.js locale configuration for Bengali (Bangladesh)
 * Locale: bn-bd
 * 
 * This module provides localization settings for Bengali language in Bangladesh,
 * including month names, weekday names, date formats, and number conversions
 * between Western Arabic numerals (0-9) and Bengali numerals (০-৯).
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping from Western Arabic numerals to Bengali numerals
 */
interface NumeralMap {
  [key: string]: string;
}

/**
 * Western Arabic to Bengali numeral mapping
 */
declare const WESTERN_TO_BENGALI: Readonly<NumeralMap>;

/**
 * Bengali to Western Arabic numeral mapping
 */
declare const BENGALI_TO_WESTERN: Readonly<NumeralMap>;

/**
 * Bengali (Bangladesh) locale configuration
 */
declare const bnBdLocale: LocaleSpecification;

/**
 * Long date format tokens configuration
 */
interface LongDateFormat {
  /** Time format (e.g., "A h:mm সময়") */
  LT: string;
  /** Time with seconds format (e.g., "A h:mm:ss সময়") */
  LTS: string;
  /** Short date format (e.g., "DD/MM/YYYY") */
  L: string;
  /** Long date format (e.g., "D MMMM YYYY") */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with weekday and time format */
  LLLL: string;
}

/**
 * Calendar display strings for relative dates
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
 * Relative time strings configuration
 */
interface RelativeTimeSpec {
  /** Future time prefix */
  future: string;
  /** Past time prefix */
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
  /** Day of week (0 = Sunday) */
  dow: number;
  /** Day of year that starts the first week */
  doy: number;
}

/**
 * Converts Bengali numerals in a string to Western Arabic numerals
 * @param input - String containing Bengali numerals
 * @returns String with Western Arabic numerals
 */
declare function preparse(input: string): string;

/**
 * Converts Western Arabic numerals in a string to Bengali numerals
 * @param input - String containing Western Arabic numerals
 * @returns String with Bengali numerals
 */
declare function postformat(input: string): string;

/**
 * Determines the hour in 24-hour format based on 12-hour time and Bengali meridiem
 * @param hour - Hour in 12-hour format
 * @param meridiem - Bengali meridiem string (রাত, ভোর, সকাল, দুপুর, বিকাল, সন্ধ্যা)
 * @returns Hour in 24-hour format, or undefined if invalid
 */
declare function meridiemHour(hour: number, meridiem: string): number | undefined;

/**
 * Returns the appropriate Bengali meridiem string for a given time
 * @param hour - Hour of the day (0-23)
 * @param minute - Minute of the hour
 * @param isLowercase - Whether to return lowercase version
 * @returns Bengali meridiem string
 */
declare function meridiem(hour: number, minute: number, isLowercase: boolean): string;

/**
 * Defines and registers the Bengali (Bangladesh) locale with moment.js
 * @param moment - Moment.js instance
 * @returns Configured locale
 */
export default function defineBnBdLocale(moment: typeof import('moment')): Locale;

export {
  WESTERN_TO_BENGALI,
  BENGALI_TO_WESTERN,
  bnBdLocale,
  preparse,
  postformat,
  meridiemHour,
  meridiem,
  LongDateFormat,
  CalendarSpec,
  RelativeTimeSpec,
  WeekSpec
};