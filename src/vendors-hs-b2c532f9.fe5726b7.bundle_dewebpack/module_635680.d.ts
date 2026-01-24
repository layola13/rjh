/**
 * Moment.js locale configuration for Tibetan (bo)
 * 
 * This module provides localization support for the Tibetan language,
 * including month names, weekday names, time formats, and number conversions
 * between Arabic and Tibetan numerals.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping from Arabic numerals to Tibetan numerals
 */
declare const ARABIC_TO_TIBETAN_NUMERALS: Readonly<{
  1: '༡';
  2: '༢';
  3: '༣';
  4: '༤';
  5: '༥';
  6: '༦';
  7: '༧';
  8: '༨';
  9: '༩';
  0: '༠';
}>;

/**
 * Mapping from Tibetan numerals to Arabic numerals
 */
declare const TIBETAN_TO_ARABIC_NUMERALS: Readonly<{
  '༡': '1';
  '༢': '2';
  '༣': '3';
  '༤': '4';
  '༥': '5';
  '༦': '6';
  '༧': '7';
  '༨': '8';
  '༩': '9';
  '༠': '0';
}>;

/**
 * Tibetan locale configuration specification
 */
declare interface TibetanLocaleConfig extends LocaleSpecification {
  /** Full month names in Tibetan */
  months: string[];
  
  /** Abbreviated month names in Tibetan */
  monthsShort: string[];
  
  /** Regular expression for parsing short month names */
  monthsShortRegex: RegExp;
  
  /** Whether to parse month names exactly */
  monthsParseExact: boolean;
  
  /** Full weekday names in Tibetan */
  weekdays: string[];
  
  /** Abbreviated weekday names in Tibetan */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Tibetan */
  weekdaysMin: string[];
  
  /** Long date format tokens */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  
  /** Calendar format strings for relative dates */
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  
  /** Relative time format strings */
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: string;
    m: string;
    mm: string;
    h: string;
    hh: string;
    d: string;
    dd: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
  };
  
  /**
   * Converts Tibetan numerals to Arabic numerals during parsing
   * @param text - Input text containing Tibetan numerals
   * @returns Text with Arabic numerals
   */
  preparse(text: string): string;
  
  /**
   * Converts Arabic numerals to Tibetan numerals during formatting
   * @param text - Input text containing Arabic numerals
   * @returns Text with Tibetan numerals
   */
  postformat(text: string): string;
  
  /** Regular expression for parsing meridiem (AM/PM) indicators */
  meridiemParse: RegExp;
  
  /**
   * Converts 12-hour format to 24-hour format based on meridiem
   * @param hour - Hour in 12-hour format
   * @param meridiem - Tibetan meridiem indicator
   * @returns Hour in 24-hour format
   */
  meridiemHour(hour: number, meridiem: string): number;
  
  /**
   * Returns the appropriate Tibetan meridiem indicator for given time
   * @param hour - Hour in 24-hour format
   * @param minute - Minute
   * @param isLowercase - Whether to return lowercase (unused in Tibetan)
   * @returns Tibetan meridiem string
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
  
  /** Week configuration */
  week: {
    /** Day of week (0 = Sunday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines and exports the Tibetan locale for moment.js
 * @param moment - The moment.js instance
 * @returns The configured Tibetan locale
 */
declare function defineTibetanLocale(moment: typeof import('moment')): Locale;

export default defineTibetanLocale;
export { TibetanLocaleConfig, ARABIC_TO_TIBETAN_NUMERALS, TIBETAN_TO_ARABIC_NUMERALS };