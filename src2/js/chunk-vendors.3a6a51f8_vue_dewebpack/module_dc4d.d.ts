/**
 * Moment.js Hindi (hi) Locale Configuration
 * 
 * This module provides Hindi language locale configuration for moment.js,
 * including month names, weekday names, date formats, and number translations
 * between Arabic and Devanagari numerals.
 * 
 * @module HindiLocale
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping from Arabic numerals to Devanagari numerals
 */
export type ArabicToDevanagariMap = {
  readonly [K in '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9']: string;
};

/**
 * Mapping from Devanagari numerals to Arabic numerals
 */
export type DevanagariToArabicMap = {
  readonly [key: string]: string;
};

/**
 * Time of day periods in Hindi
 */
export type MeridiemPeriod = 'रात' | 'सुबह' | 'दोपहर' | 'शाम';

/**
 * Configuration object for Hindi locale months
 */
export interface MonthsConfiguration {
  /** Month names used in date formatting contexts */
  format: string[];
  /** Month names used in standalone contexts */
  standalone: string[];
}

/**
 * Configuration object for calendar display strings
 */
export interface CalendarConfiguration {
  /** Format for today's date */
  sameDay: string;
  /** Format for tomorrow's date */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for yesterday's date */
  lastDay: string;
  /** Format for dates in the previous week */
  lastWeek: string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Configuration object for relative time strings
 */
export interface RelativeTimeConfiguration {
  /** Future time format template */
  future: string;
  /** Past time format template */
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
 * Configuration object for long date formats
 */
export interface LongDateFormatConfiguration {
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
}

/**
 * Configuration object for week settings
 */
export interface WeekConfiguration {
  /** Day of week (0 = Sunday) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Complete Hindi locale specification for moment.js
 */
export interface HindiLocaleSpecification extends LocaleSpecification {
  months: MonthsConfiguration;
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormatConfiguration;
  monthsParse: RegExp[];
  longMonthsParse: RegExp[];
  shortMonthsParse: RegExp[];
  monthsRegex: RegExp;
  monthsShortRegex: RegExp;
  monthsStrictRegex: RegExp;
  monthsShortStrictRegex: RegExp;
  calendar: CalendarConfiguration;
  relativeTime: RelativeTimeConfiguration;
  preparse: (input: string) => string;
  postformat: (input: string) => string;
  meridiemParse: RegExp;
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  meridiem: (hour: number, minute: number, isLower: boolean) => MeridiemPeriod;
  week: WeekConfiguration;
}

/**
 * Arabic to Devanagari numeral mapping
 */
export declare const ARABIC_TO_DEVANAGARI: ArabicToDevanagariMap;

/**
 * Devanagari to Arabic numeral mapping
 */
export declare const DEVANAGARI_TO_ARABIC: DevanagariToArabicMap;

/**
 * Regular expressions for parsing month names (with variations)
 */
export declare const MONTH_PARSE_PATTERNS: RegExp[];

/**
 * Regular expressions for strict parsing of month names
 */
export declare const MONTH_PARSE_PATTERNS_STRICT: RegExp[];

/**
 * Converts Devanagari numerals in a string to Arabic numerals
 * 
 * @param input - String containing Devanagari numerals
 * @returns String with Arabic numerals
 */
export declare function preparseNumbers(input: string): string;

/**
 * Converts Arabic numerals in a string to Devanagari numerals
 * 
 * @param input - String containing Arabic numerals
 * @returns String with Devanagari numerals
 */
export declare function postformatNumbers(input: string): string;

/**
 * Determines the hour value based on 12-hour format and meridiem period
 * 
 * @param hour - Hour in 12-hour format
 * @param meridiem - Time of day period (रात/सुबह/दोपहर/शाम)
 * @returns Hour in 24-hour format, or undefined if invalid
 */
export declare function getMeridiemHour(hour: number, meridiem: string): number | undefined;

/**
 * Determines the appropriate meridiem period for a given time
 * 
 * @param hour - Hour in 24-hour format
 * @param minute - Minute value
 * @param isLower - Whether to return lowercase (not used in Hindi)
 * @returns Meridiem period string
 */
export declare function getMeridiem(hour: number, minute: number, isLower: boolean): MeridiemPeriod;

/**
 * The complete Hindi locale configuration object
 */
export declare const hindiLocaleConfig: HindiLocaleSpecification;

/**
 * Registers the Hindi locale with moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The registered locale
 */
export declare function defineHindiLocale(moment: typeof import('moment')): Locale;

export default hindiLocaleConfig;