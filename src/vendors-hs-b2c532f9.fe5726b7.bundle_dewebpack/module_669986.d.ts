/**
 * Moment.js locale configuration for Persian/Farsi (fa)
 * 
 * This module provides Persian language support for moment.js including:
 * - Persian digit conversion (۰-۹ ↔ 0-9)
 * - Month and weekday names in Persian
 * - Date/time formatting rules
 * - Relative time descriptions
 * - Calendar expressions
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping from Western digits to Persian digits
 */
export type WesternToPersianDigitMap = {
  readonly '1': '۱';
  readonly '2': '۲';
  readonly '3': '۳';
  readonly '4': '۴';
  readonly '5': '۵';
  readonly '6': '۶';
  readonly '7': '۷';
  readonly '8': '۸';
  readonly '9': '۹';
  readonly '0': '۰';
};

/**
 * Mapping from Persian digits to Western digits
 */
export type PersianToWesternDigitMap = {
  readonly '۱': '1';
  readonly '۲': '2';
  readonly '۳': '3';
  readonly '۴': '4';
  readonly '۵': '5';
  readonly '۶': '6';
  readonly '۷': '7';
  readonly '۸': '8';
  readonly '۹': '9';
  readonly '۰': '0';
};

/**
 * Persian (Farsi) locale configuration for moment.js
 */
export interface PersianLocaleConfig extends LocaleSpecification {
  /** Month names in Persian */
  months: string[];
  
  /** Abbreviated month names in Persian */
  monthsShort: string[];
  
  /** Weekday names in Persian */
  weekdays: string[];
  
  /** Short weekday names in Persian */
  weekdaysShort: string[];
  
  /** Minimal weekday names (single character) in Persian */
  weekdaysMin: string[];
  
  /** Use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (hours:minutes) */
    LT: string;
    /** Time format with seconds */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date with time */
    LLL: string;
    /** Full date with weekday and time */
    LLLL: string;
  };
  
  /** Regex pattern to parse meridiem (AM/PM) */
  meridiemParse: RegExp;
  
  /**
   * Determines if the given meridiem string represents PM
   * @param meridiemString - The meridiem string to check
   * @returns True if PM, false otherwise
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Returns the appropriate meridiem string
   * @param hours - Hour of the day (0-23)
   * @param minutes - Minutes
   * @param isLowercase - Whether to return lowercase version
   * @returns Persian meridiem string
   */
  meridiem(hours: number, minutes: number, isLowercase: boolean): string;
  
  /** Calendar expressions for relative dates */
  calendar: {
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
    /** Default format for other dates */
    sameElse: string;
  };
  
  /** Relative time descriptions */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time suffix */
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
  };
  
  /**
   * Preprocesses input string by converting Persian digits to Western
   * @param text - Input text with Persian digits
   * @returns Text with Western digits
   */
  preparse(text: string): string;
  
  /**
   * Post-processes output string by converting Western digits to Persian
   * @param text - Input text with Western digits
   * @returns Text with Persian digits
   */
  postformat(text: string): string;
  
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Formats ordinal numbers
   * @param number - The number to format
   * @returns Formatted ordinal string
   */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** First day of week (0=Sunday, 6=Saturday) */
    dow: number;
    /** First week of year calculation (day of year) */
    doy: number;
  };
}

/**
 * Initializes and registers the Persian locale with moment.js
 * @param momentInstance - The moment.js instance to configure
 * @returns The registered locale object
 */
export default function initializePersianLocale(momentInstance: typeof import('moment')): Locale;