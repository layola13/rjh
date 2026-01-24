/**
 * Moment.js locale configuration for Serbian (sr)
 * Provides translation and grammatical rules for Serbian language date/time formatting
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Translation helper for Serbian locale
 * Handles plural forms and grammatical cases specific to Serbian language
 */
interface SerbianTranslationHelper {
  /**
   * Word forms for different time units in various grammatical cases
   * Each key corresponds to a moment.js relative time unit code
   */
  words: {
    /** Second forms: [nominative singular, genitive singular, genitive plural] */
    ss: [string, string, string];
    /** Minute singular forms: [nominative, genitive] */
    m: [string, string];
    /** Minute plural forms: [nominative singular, genitive singular, genitive plural] */
    mm: [string, string, string];
    /** Hour singular forms: [nominative, genitive] */
    h: [string, string];
    /** Hour plural forms: [nominative singular, genitive singular, genitive plural] */
    hh: [string, string, string];
    /** Day singular forms: [nominative, genitive] */
    d: [string, string];
    /** Day plural forms: [nominative singular, genitive singular, genitive plural] */
    dd: [string, string, string];
    /** Month singular forms: [nominative, genitive] */
    M: [string, string];
    /** Month plural forms: [nominative singular, genitive singular, genitive plural] */
    MM: [string, string, string];
    /** Year singular forms: [nominative, genitive] */
    y: [string, string];
    /** Year plural forms: [nominative singular, genitive singular, genitive plural] */
    yy: [string, string, string];
  };

  /**
   * Determines correct grammatical case based on Serbian language rules
   * @param number - The number to determine case for
   * @param wordForms - Array of word forms [nominative singular, genitive singular, genitive plural]
   * @returns The appropriate word form based on grammatical rules
   */
  correctGrammaticalCase(number: number, wordForms: string[]): string;

  /**
   * Translates relative time expressions with proper grammatical forms
   * @param number - The numeric value (e.g., 5 for "5 minutes")
   * @param withoutSuffix - Whether to use nominative case (true) or with preposition (false)
   * @param key - The time unit key (e.g., 'mm' for minutes, 'hh' for hours)
   * @param isFuture - Whether the time reference is in the future
   * @returns Translated and grammatically correct time expression
   */
  translate(number: number, withoutSuffix: boolean, key: string, isFuture: boolean): string;
}

/**
 * Serbian locale configuration object
 */
declare const serbianLocale: LocaleSpecification & {
  /** Month names in full form */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Use exact parsing for month names */
  monthsParseExact: boolean;
  /** Weekday names in full form */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimally abbreviated weekday names */
  weekdaysMin: string[];
  /** Use exact parsing for weekday names */
  weekdaysParseExact: boolean;
  /** Date/time format tokens */
  longDateFormat: {
    /** Time format (Hour:minute) */
    LT: string;
    /** Time format with seconds */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date format with time */
    LLL: string;
    /** Full date and time format */
    LLLL: string;
  };
  /** Calendar display rules for relative dates */
  calendar: {
    /** Format for today */
    sameDay: string;
    /** Format for tomorrow */
    nextDay: string;
    /** Function returning format for next week based on day of week */
    nextWeek(): string;
    /** Format for yesterday */
    lastDay: string;
    /** Function returning format for last week based on day of week */
    lastWeek(): string;
    /** Format for other dates */
    sameElse: string;
  };
  /** Relative time translations */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time prefix */
    past: string;
    /** A few seconds */
    s: string;
    /** Seconds (uses translate function) */
    ss: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    /** Minute (uses translate function) */
    m: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    /** Minutes (uses translate function) */
    mm: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    /** Hour (uses translate function) */
    h: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    /** Hours (uses translate function) */
    hh: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    /** Day (uses translate function) */
    d: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    /** Days (uses translate function) */
    dd: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    /** Month (uses translate function) */
    M: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    /** Months (uses translate function) */
    MM: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    /** Year (uses translate function) */
    y: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    /** Years (uses translate function) */
    yy: (number: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
  };
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /**
   * Format ordinal numbers
   * @param num - The number to format
   * @returns Formatted ordinal string
   */
  ordinal(num: number): string;
  /** Week configuration */
  week: {
    /** First day of week (1 = Monday) */
    dow: number;
    /** First day of year for week calculations */
    doy: number;
  };
};

export default serbianLocale;