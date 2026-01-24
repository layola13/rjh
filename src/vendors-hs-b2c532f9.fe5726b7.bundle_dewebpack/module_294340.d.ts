/**
 * Moment.js Hebrew (he) locale configuration
 * Defines Hebrew language settings for date/time formatting and relative time expressions
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Plural form resolver for hours in Hebrew
 * @param count - Number of hours
 * @returns Formatted string with proper Hebrew plural form
 */
declare function hebrewHoursPlural(count: number): string;

/**
 * Plural form resolver for days in Hebrew
 * @param count - Number of days
 * @returns Formatted string with proper Hebrew plural form
 */
declare function hebrewDaysPlural(count: number): string;

/**
 * Plural form resolver for months in Hebrew
 * @param count - Number of months
 * @returns Formatted string with proper Hebrew plural form
 */
declare function hebrewMonthsPlural(count: number): string;

/**
 * Plural form resolver for years in Hebrew
 * @param count - Number of years
 * @returns Formatted string with proper Hebrew plural form
 */
declare function hebrewYearsPlural(count: number): string;

/**
 * Hebrew locale configuration object
 */
declare const hebrewLocaleConfig: LocaleSpecification & {
  /** Full month names in Hebrew */
  months: string[];
  
  /** Abbreviated month names in Hebrew */
  monthsShort: string[];
  
  /** Full weekday names in Hebrew */
  weekdays: string[];
  
  /** Abbreviated weekday names in Hebrew */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Hebrew */
  weekdaysMin: string[];
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (HH:mm) */
    LT: string;
    /** Time with seconds format (HH:mm:ss) */
    LTS: string;
    /** Short date format (DD/MM/YYYY) */
    L: string;
    /** Long date format with month name */
    LL: string;
    /** Long date format with time */
    LLL: string;
    /** Full date format with weekday */
    LLLL: string;
    /** Short lowercase date */
    l: string;
    /** Medium lowercase date */
    ll: string;
    /** Medium lowercase date with time */
    lll: string;
    /** Full lowercase date with time */
    llll: string;
  };
  
  /** Calendar relative time strings */
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
    /** Format for other dates */
    sameElse: string;
  };
  
  /** Relative time expressions */
  relativeTime: {
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
    /** Hours (plural) with Hebrew dual/plural forms */
    hh: typeof hebrewHoursPlural;
    /** Day (singular) */
    d: string;
    /** Days (plural) with Hebrew dual/plural forms */
    dd: typeof hebrewDaysPlural;
    /** Month (singular) */
    M: string;
    /** Months (plural) with Hebrew dual/plural forms */
    MM: typeof hebrewMonthsPlural;
    /** Year (singular) */
    y: string;
    /** Years (plural) with Hebrew dual/plural forms */
    yy: typeof hebrewYearsPlural;
  };
  
  /** Regular expression for parsing meridiem (AM/PM) in Hebrew */
  meridiemParse: RegExp;
  
  /**
   * Determines if the given meridiem string represents PM
   * @param meridiemString - Hebrew meridiem string
   * @returns True if PM, false otherwise
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Returns appropriate Hebrew meridiem string based on hour
   * @param hour - Hour of day (0-23)
   * @param minute - Minute of hour (0-59)
   * @param isLowercase - Whether to return abbreviated form
   * @returns Appropriate Hebrew meridiem string
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
};

/**
 * Defines and registers the Hebrew locale with moment.js
 * @param momentInstance - The moment.js instance
 * @returns The registered Hebrew locale
 */
declare function defineHebrewLocale(momentInstance: typeof import('moment')): Locale;

export { hebrewLocaleConfig, defineHebrewLocale };
export default defineHebrewLocale;