/**
 * Moment.js Welsh (Cymraeg) locale configuration
 * 
 * This module provides localization support for the Welsh language in Moment.js,
 * including month names, weekday names, date formats, and relative time expressions.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Welsh locale configuration object
 */
interface WelshLocaleConfig extends LocaleSpecification {
  /** Full month names in Welsh */
  months: string[];
  
  /** Abbreviated month names in Welsh */
  monthsShort: string[];
  
  /** Full weekday names in Welsh */
  weekdays: string[];
  
  /** Abbreviated weekday names in Welsh */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Welsh */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (HH:mm) */
    LT: string;
    /** Time with seconds format (HH:mm:ss) */
    LTS: string;
    /** Short date format (DD/MM/YYYY) */
    L: string;
    /** Long date format (D MMMM YYYY) */
    LL: string;
    /** Long date with time format (D MMMM YYYY HH:mm) */
    LLL: string;
    /** Full date with time format (dddd, D MMMM YYYY HH:mm) */
    LLLL: string;
  };
  
  /** Calendar format strings for relative dates */
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
  
  /** Relative time format strings */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time suffix */
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
  };
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Function to generate ordinal suffix for day of month
   * @param dayOfMonth - The day of the month (1-31)
   * @returns The day with appropriate Welsh ordinal suffix
   */
  ordinal: (dayOfMonth: number) => string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year that defines week 1 */
    doy: number;
  };
}

/**
 * Generates the ordinal suffix for a given day of month in Welsh
 * 
 * @param dayOfMonth - The day of the month (1-31)
 * @returns The day number with the appropriate Welsh ordinal suffix
 * 
 * @example
 * getWelshOrdinal(1) // "1af"
 * getWelshOrdinal(2) // "2il"
 * getWelshOrdinal(21) // "21ain"
 * getWelshOrdinal(40) // "40fed"
 */
declare function getWelshOrdinal(dayOfMonth: number): string;

/**
 * Defines and registers the Welsh locale with Moment.js
 * 
 * @param moment - The Moment.js instance
 * @returns The registered Welsh locale
 */
declare function defineWelshLocale(moment: typeof import('moment')): Locale;

/**
 * Welsh (Cymraeg) locale identifier
 */
export const LOCALE_CODE = 'cy';

/**
 * Welsh ordinal suffixes for days 1-20
 * Index corresponds to the day number
 */
export const WELSH_ORDINAL_SUFFIXES: readonly string[];

export default defineWelshLocale;