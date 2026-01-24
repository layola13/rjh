/**
 * Moment.js locale configuration for French Canadian (fr-ca)
 * 
 * This module provides localization settings for the Moment.js library,
 * specifically tailored for French Canadian date and time formatting.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for French Canadian locale
 */
interface FrenchCanadianLocaleConfig extends LocaleSpecification {
  /** Full month names in French Canadian */
  months: string[];
  
  /** Abbreviated month names in French Canadian */
  monthsShort: string[];
  
  /** Whether to use exact parsing for month names */
  monthsParseExact: boolean;
  
  /** Full weekday names in French Canadian */
  weekdays: string[];
  
  /** Abbreviated weekday names in French Canadian */
  weekdaysShort: string[];
  
  /** Minimal weekday names in French Canadian */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekday names */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (hours:minutes) */
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
  };
  
  /** Calendar date descriptions relative to current date */
  calendar: {
    /** Format for dates occurring today */
    sameDay: string;
    /** Format for dates occurring tomorrow */
    nextDay: string;
    /** Format for dates in the next week */
    nextWeek: string;
    /** Format for dates that occurred yesterday */
    lastDay: string;
    /** Format for dates in the last week */
    lastWeek: string;
    /** Format for all other dates */
    sameElse: string;
  };
  
  /** Relative time descriptions */
  relativeTime: {
    /** Format for future dates */
    future: string;
    /** Format for past dates */
    past: string;
    /** Description for a few seconds */
    s: string;
    /** Description for multiple seconds */
    ss: string;
    /** Description for one minute */
    m: string;
    /** Description for multiple minutes */
    mm: string;
    /** Description for one hour */
    h: string;
    /** Description for multiple hours */
    hh: string;
    /** Description for one day */
    d: string;
    /** Description for multiple days */
    dd: string;
    /** Description for one month */
    M: string;
    /** Description for multiple months */
    MM: string;
    /** Description for one year */
    y: string;
    /** Description for multiple years */
    yy: string;
  };
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Returns the ordinal suffix for a given number based on context
   * @param dayOfMonth - The day number
   * @param token - The format token indicating context (e.g., 'D' for day, 'M' for month)
   * @returns The number with its appropriate ordinal suffix
   */
  ordinal: (dayOfMonth: number, token: string) => string;
}

/**
 * Defines and exports the French Canadian locale for Moment.js
 * @param momentInstance - The Moment.js instance to configure
 * @returns The configured locale object
 */
export function defineFrenchCanadianLocale(momentInstance: {
  defineLocale(localeName: string, config: FrenchCanadianLocaleConfig): Locale;
}): Locale;

/**
 * Default export: The configured French Canadian locale
 */
declare const frenchCanadianLocale: Locale;
export default frenchCanadianLocale;