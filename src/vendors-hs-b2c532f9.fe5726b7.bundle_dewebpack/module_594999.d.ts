/**
 * Moment.js Welsh (Cymraeg) locale configuration
 * 
 * This module provides localization support for the Welsh language in moment.js,
 * including month names, weekday names, date formats, and relative time formatting.
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
  
  /** Whether to use exact parsing for weekday names */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (HH:mm) */
    LT: string;
    /** Time format with seconds (HH:mm:ss) */
    LTS: string;
    /** Short date format (DD/MM/YYYY) */
    L: string;
    /** Long date format (D MMMM YYYY) */
    LL: string;
    /** Long date and time format (D MMMM YYYY HH:mm) */
    LLL: string;
    /** Full date and time format (dddd, D MMMM YYYY HH:mm) */
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
    /** Format for other dates */
    sameElse: string;
  };
  
  /** Relative time format strings */
  relativeTime: {
    /** Future time prefix/suffix */
    future: string;
    /** Past time prefix/suffix */
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
  
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Function to format ordinal numbers in Welsh
   * @param dayOfMonth - The day of the month (1-31)
   * @returns The day with appropriate Welsh ordinal suffix
   */
  ordinal: (dayOfMonth: number) => string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year for week calculation */
    doy: number;
  };
}

/**
 * Defines and registers the Welsh (cy) locale for moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The registered Welsh locale
 */
export function defineWelshLocale(moment: typeof import('moment')): Locale;

/**
 * The Welsh locale configuration exported as default
 */
export default WelshLocaleConfig;