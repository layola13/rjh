/**
 * Moment.js locale configuration for Tamil (ta)
 * @module moment-locale-ta
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping from Western Arabic numerals to Tamil numerals
 */
type WesternToTamilNumeralMap = {
  [key in '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9']: string;
};

/**
 * Mapping from Tamil numerals to Western Arabic numerals
 */
type TamilToWesternNumeralMap = {
  [key: string]: string;
};

/**
 * Tamil locale specification for moment.js
 */
interface TamilLocaleSpecification extends LocaleSpecification {
  /** Month names in Tamil */
  months: string[];
  
  /** Abbreviated month names in Tamil */
  monthsShort: string[];
  
  /** Weekday names in Tamil */
  weekdays: string[];
  
  /** Short weekday names in Tamil */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Tamil */
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
  
  /** Calendar format strings */
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
  
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Returns ordinal string for a given number
   * @param dayOfMonth - Day of month number
   */
  ordinal(dayOfMonth: number): string;
  
  /**
   * Converts Tamil numerals to Western Arabic numerals
   * @param text - Input string with Tamil numerals
   */
  preparse(text: string): string;
  
  /**
   * Converts Western Arabic numerals to Tamil numerals
   * @param text - Input string with Western numerals
   */
  postformat(text: string): string;
  
  /** Regex pattern for parsing meridiem (AM/PM equivalent) */
  meridiemParse: RegExp;
  
  /**
   * Returns Tamil meridiem string based on hour, minute, and lowercase flag
   * @param hour - Hour (0-23)
   * @param minute - Minute (0-59)
   * @param isLowercase - Whether to return lowercase
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
  
  /**
   * Converts 12-hour format to 24-hour format based on Tamil meridiem
   * @param hour - Hour in 12-hour format
   * @param meridiem - Tamil meridiem string
   */
  meridiemHour(hour: number, meridiem: string): number;
  
  /** Week configuration */
  week: {
    /** Day of week (0 = Sunday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Western to Tamil numeral conversion map
 */
export const westernToTamilNumerals: WesternToTamilNumeralMap;

/**
 * Tamil to Western numeral conversion map
 */
export const tamilToWesternNumerals: TamilToWesternNumeralMap;

/**
 * Defines and returns the Tamil locale for moment.js
 * @param moment - Moment.js instance
 * @returns Configured Tamil locale
 */
export function defineTamilLocale(moment: typeof import('moment')): Locale;

/**
 * Tamil locale configuration object
 */
export const tamilLocale: TamilLocaleSpecification;

export default tamilLocale;