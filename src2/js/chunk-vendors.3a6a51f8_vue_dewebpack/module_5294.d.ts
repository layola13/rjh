/**
 * Moment.js locale configuration for Urdu (ur)
 * 
 * This module provides Urdu language localization for moment.js,
 * including month names, weekday names, date formats, and relative time strings.
 */

import { Locale } from 'moment';

/**
 * Urdu month names (same for both full and short format)
 */
export const URDU_MONTHS: readonly string[] = [
  "جنوری",
  "فروری", 
  "مارچ",
  "اپریل",
  "مئی",
  "جون",
  "جولائی",
  "اگست",
  "ستمبر",
  "اکتوبر",
  "نومبر",
  "دسمبر"
];

/**
 * Urdu weekday names (same for full, short, and min format)
 */
export const URDU_WEEKDAYS: readonly string[] = [
  "اتوار",
  "پیر",
  "منگل",
  "بدھ",
  "جمعرات",
  "جمعہ",
  "ہفتہ"
];

/**
 * Long date format tokens for Urdu locale
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
  /** Full date with time format (dddd، D MMMM YYYY HH:mm) */
  LLLL: string;
}

/**
 * Calendar strings for relative dates
 */
export interface UrduCalendar {
  /** Same day format */
  sameDay: string;
  /** Next day format */
  nextDay: string;
  /** Next week format */
  nextWeek: string;
  /** Last day format */
  lastDay: string;
  /** Last week format */
  lastWeek: string;
  /** Other dates format */
  sameElse: string;
}

/**
 * Relative time strings for Urdu
 */
export interface UrduRelativeTime {
  /** Future time format */
  future: string;
  /** Past time format */
  past: string;
  /** Few seconds */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** One minute */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** One hour */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** One day */
  d: string;
  /** Days (plural) */
  dd: string;
  /** One month */
  M: string;
  /** Months (plural) */
  MM: string;
  /** One year */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Week configuration for Urdu locale
 */
export interface UrduWeekConfig {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year */
  doy: number;
}

/**
 * Complete Urdu locale configuration
 */
export interface UrduLocaleSpec {
  /** Month names (full format) */
  months: readonly string[];
  /** Month names (short format) */
  monthsShort: readonly string[];
  /** Weekday names (full format) */
  weekdays: readonly string[];
  /** Weekday names (short format) */
  weekdaysShort: readonly string[];
  /** Weekday names (minimal format) */
  weekdaysMin: readonly string[];
  /** Long date format tokens */
  longDateFormat: UrduLongDateFormat;
  /** Regex for parsing meridiem (morning/evening) */
  meridiemParse: RegExp;
  /** Determines if time string represents PM */
  isPM: (input: string) => boolean;
  /** Returns meridiem string based on hour */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  /** Calendar format strings */
  calendar: UrduCalendar;
  /** Relative time format strings */
  relativeTime: UrduRelativeTime;
  /** Pre-parse function for input strings */
  preparse: (input: string) => string;
  /** Post-format function for output strings */
  postformat: (input: string) => string;
  /** Week configuration */
  week: UrduWeekConfig;
}

/**
 * Checks if the given meridiem string represents PM (evening)
 * @param meridiemString - The meridiem string to check ("صبح" or "شام")
 * @returns true if the string represents PM (evening), false otherwise
 */
export function isPM(meridiemString: string): boolean;

/**
 * Returns the appropriate meridiem string for the given time
 * @param hour - Hour of the day (0-23)
 * @param minute - Minute of the hour (0-59)
 * @param isLowercase - Whether to return lowercase (not used in Urdu)
 * @returns "صبح" (morning) if hour < 12, "شام" (evening) otherwise
 */
export function meridiem(hour: number, minute: number, isLowercase: boolean): string;

/**
 * Pre-parses Urdu formatted strings by replacing Urdu comma with standard comma
 * @param input - The input string to pre-parse
 * @returns String with Urdu commas replaced by standard commas
 */
export function preparse(input: string): string;

/**
 * Post-formats strings by replacing standard commas with Urdu commas
 * @param input - The input string to post-format
 * @returns String with standard commas replaced by Urdu commas
 */
export function postformat(input: string): string;

/**
 * The complete Urdu locale specification for moment.js
 */
export const urduLocale: UrduLocaleSpec;

/**
 * Defines the Urdu locale in moment.js
 * This function is automatically called when the module is imported
 */
export function defineUrduLocale(): Locale;