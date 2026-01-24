/**
 * Moment.js locale configuration for Mongolian (mn)
 * @module MomentLocale_mn
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Relative time formatting function for Mongolian locale
 * @param count - The numeric value
 * @param withoutSuffix - Whether to format without suffix (nominative case)
 * @param key - The time unit key (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy)
 * @param isFuture - Whether the time is in the future (unused in this implementation)
 * @returns Formatted relative time string in Mongolian
 */
declare function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string;

/**
 * Meridiem parser function
 * @param input - The meridiem string to parse
 * @returns True if PM (ҮХ), false otherwise
 */
declare function isPM(input: string): boolean;

/**
 * Meridiem formatter function
 * @param hours - Hour value (0-23)
 * @param minutes - Minute value (0-59)
 * @param isLowercase - Whether to return lowercase (unused in Mongolian)
 * @returns Meridiem string ("ҮӨ" for AM, "ҮХ" for PM)
 */
declare function meridiem(hours: number, minutes: number, isLowercase: boolean): string;

/**
 * Ordinal formatter function
 * @param num - The number to format
 * @param token - The token type (d, D, DDD, etc.)
 * @returns Formatted ordinal string in Mongolian
 */
declare function ordinal(num: number, token: string): string;

/**
 * Mongolian locale configuration object
 */
declare const mongolianLocale: LocaleSpecification;

/**
 * Defines and registers the Mongolian locale with Moment.js
 * @param momentInstance - The Moment.js instance to register the locale with
 * @returns The registered locale object
 */
export default function defineMongolianlLocale(momentInstance: typeof import('moment')): Locale;

/**
 * Mongolian locale configuration interface
 */
export interface MongolianLocaleConfig {
  /** Full month names in Mongolian */
  months: readonly string[];
  
  /** Abbreviated month names in Mongolian */
  monthsShort: readonly string[];
  
  /** Whether to parse month names exactly */
  monthsParseExact: true;
  
  /** Full weekday names in Mongolian */
  weekdays: readonly string[];
  
  /** Short weekday names in Mongolian */
  weekdaysShort: readonly string[];
  
  /** Minimal weekday names in Mongolian */
  weekdaysMin: readonly string[];
  
  /** Whether to parse weekday names exactly */
  weekdaysParseExact: true;
  
  /** Long date format tokens */
  longDateFormat: {
    LT: 'HH:mm';
    LTS: 'HH:mm:ss';
    L: 'YYYY-MM-DD';
    LL: 'YYYY оны MMMMын D';
    LLL: 'YYYY оны MMMMын D HH:mm';
    LLLL: 'dddd, YYYY оны MMMMын D HH:mm';
  };
  
  /** Regular expression to parse meridiem */
  meridiemParse: RegExp;
  
  /** Function to determine if time is PM */
  isPM: typeof isPM;
  
  /** Function to format meridiem */
  meridiem: typeof meridiem;
  
  /** Calendar format strings */
  calendar: {
    sameDay: '[Өнөөдөр] LT';
    nextDay: '[Маргааш] LT';
    nextWeek: '[Ирэх] dddd LT';
    lastDay: '[Өчигдөр] LT';
    lastWeek: '[Өнгөрсөн] dddd LT';
    sameElse: 'L';
  };
  
  /** Relative time format configuration */
  relativeTime: {
    future: '%s дараа';
    past: '%s өмнө';
    s: typeof formatRelativeTime;
    ss: typeof formatRelativeTime;
    m: typeof formatRelativeTime;
    mm: typeof formatRelativeTime;
    h: typeof formatRelativeTime;
    hh: typeof formatRelativeTime;
    d: typeof formatRelativeTime;
    dd: typeof formatRelativeTime;
    M: typeof formatRelativeTime;
    MM: typeof formatRelativeTime;
    y: typeof formatRelativeTime;
    yy: typeof formatRelativeTime;
  };
  
  /** Regular expression to parse day of month ordinals */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinals */
  ordinal: typeof ordinal;
}