/**
 * Moment.js locale configuration for Punjabi (India) - pa-in
 * 
 * This module defines localization settings for the Punjabi language as used in India,
 * including translations for months, weekdays, date formats, and number conversions
 * between Western Arabic numerals and Gurmukhi numerals.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping from Western Arabic numerals (0-9) to Gurmukhi numerals
 */
interface WesternToGurmukhiMap {
  readonly 0: '੦';
  readonly 1: '੧';
  readonly 2: '੨';
  readonly 3: '੩';
  readonly 4: '੪';
  readonly 5: '੫';
  readonly 6: '੬';
  readonly 7: '੭';
  readonly 8: '੮';
  readonly 9: '੯';
}

/**
 * Mapping from Gurmukhi numerals to Western Arabic numerals (0-9)
 */
interface GurmukhiToWesternMap {
  readonly '੦': '0';
  readonly '੧': '1';
  readonly '੨': '2';
  readonly '੩': '3';
  readonly '੪': '4';
  readonly '੫': '5';
  readonly '੬': '6';
  readonly '੭': '7';
  readonly '੮': '8';
  readonly '੯': '9';
}

/**
 * Meridiem periods in Punjabi
 */
type PunjabiMeridiem = 'ਰਾਤ' | 'ਸਵੇਰ' | 'ਦੁਪਹਿਰ' | 'ਸ਼ਾਮ';

/**
 * Extended locale specification for Punjabi (India)
 */
interface PunjabiLocaleSpecification extends LocaleSpecification {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
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
   * Converts Gurmukhi numerals in input string to Western Arabic numerals
   * @param input - String containing Gurmukhi numerals
   * @returns String with Western Arabic numerals
   */
  preparse: (input: string) => string;
  /**
   * Converts Western Arabic numerals in input string to Gurmukhi numerals
   * @param input - String containing Western Arabic numerals
   * @returns String with Gurmukhi numerals
   */
  postformat: (input: string) => string;
  meridiemParse: RegExp;
  /**
   * Converts hour based on meridiem period
   * @param hour - Hour value (0-23)
   * @param meridiem - Punjabi meridiem string
   * @returns Adjusted hour in 24-hour format
   */
  meridiemHour: (hour: number, meridiem: string) => number;
  /**
   * Determines the meridiem period for a given time
   * @param hour - Hour value (0-23)
   * @param minute - Minute value (0-59)
   * @param isLowercase - Whether to return lowercase result
   * @returns Punjabi meridiem string
   */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => PunjabiMeridiem;
  week: {
    dow: number;
    doy: number;
  };
}

/**
 * Defines and exports the Punjabi (India) locale configuration for moment.js
 * @param moment - Moment.js instance
 * @returns Configured Punjabi locale
 */
export function definePunjabiLocale(moment: typeof import('moment')): Locale;

export default definePunjabiLocale;