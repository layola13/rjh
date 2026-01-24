/**
 * Moment.js locale configuration for Russian (ru)
 * @module moment/locale/ru
 */

import { Moment, LocaleSpecification } from 'moment';

/**
 * Configuration options for Russian language pluralization
 */
interface RelativeTimeUnit {
  /** Singular form */
  singular: string;
  /** Dual/plural form (2-4) */
  dual: string;
  /** Plural form (5+) */
  plural: string;
}

/**
 * Month configuration with format and standalone variants
 */
interface MonthsConfiguration {
  /** Month names in genitive case (for dates) */
  format: string[];
  /** Month names in nominative case (standalone) */
  standalone: string[];
}

/**
 * Weekday configuration with format and standalone variants
 */
interface WeekdaysConfiguration {
  /** Weekday names in nominative case */
  standalone: string[];
  /** Weekday names in accusative case */
  format: string[];
  /** RegExp to detect specific weekday format patterns */
  isFormat: RegExp;
}

/**
 * Returns the properly declined Russian word for relative time expressions
 * @param count - The numeric value
 * @param withoutSuffix - Whether to use the form without preposition
 * @param key - The time unit key (ss, mm, hh, dd, ww, MM, yy)
 * @returns Localized relative time string
 */
export declare function relativeTimeWithPlural(
  count: number,
  withoutSuffix: boolean,
  key: 'm' | 'ss' | 'mm' | 'hh' | 'dd' | 'ww' | 'MM' | 'yy'
): string;

/**
 * Russian locale configuration object
 */
export declare const ruLocale: LocaleSpecification;

/**
 * Month name parsing patterns (regular expressions for each month)
 */
export declare const monthsParse: RegExp[];

/**
 * Calendar format function for next week
 * @param now - Current moment instance
 * @returns Formatted calendar string
 */
export declare function nextWeek(this: Moment, now: Moment): string;

/**
 * Calendar format function for last week
 * @param now - Current moment instance
 * @returns Formatted calendar string
 */
export declare function lastWeek(this: Moment, now: Moment): string;

/**
 * Determines if the time is PM (post meridiem)
 * @param input - The meridiem string to test
 * @returns True if PM, false otherwise
 */
export declare function isPM(input: string): boolean;

/**
 * Returns the appropriate Russian meridiem string
 * @param hour - Hour of the day (0-23)
 * @param minute - Minute of the hour (0-59)
 * @param isLower - Whether to return lowercase form
 * @returns Localized meridiem string ("ночи", "утра", "дня", "вечера")
 */
export declare function meridiem(hour: number, minute: number, isLower: boolean): string;

/**
 * Returns ordinal suffix for Russian numbers
 * @param num - The number to ordinalize
 * @param token - Format token (M, d, D, DDD, w, W, etc.)
 * @returns Number with appropriate ordinal suffix ("-й", "-го", "-я")
 */
export declare function ordinal(num: number, token: string): string;

/**
 * Week configuration for Russian locale
 */
export interface WeekConfiguration {
  /** Day of week (0 = Sunday, 1 = Monday) */
  dow: number;
  /** Day of year that defines first week */
  doy: number;
}

/**
 * Long date format tokens
 */
export interface LongDateFormat {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  LLL: string;
  LLLL: string;
}

/**
 * Calendar format configuration
 */
export interface CalendarConfiguration {
  sameDay: string;
  nextDay: string;
  lastDay: string;
  nextWeek: (this: Moment, now: Moment) => string;
  lastWeek: (this: Moment, now: Moment) => string;
  sameElse: string;
}

/**
 * Relative time configuration
 */
export interface RelativeTimeConfiguration {
  future: string;
  past: string;
  s: string;
  ss: typeof relativeTimeWithPlural;
  m: typeof relativeTimeWithPlural;
  mm: typeof relativeTimeWithPlural;
  h: string;
  hh: typeof relativeTimeWithPlural;
  d: string;
  dd: typeof relativeTimeWithPlural;
  w: string;
  ww: typeof relativeTimeWithPlural;
  M: string;
  MM: typeof relativeTimeWithPlural;
  y: string;
  yy: typeof relativeTimeWithPlural;
}

/**
 * Defines the Russian locale for moment.js
 * This function registers the locale configuration with moment
 */
export declare function defineRuLocale(): LocaleSpecification;

export default ruLocale;