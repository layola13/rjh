/**
 * Moment.js locale configuration for Macedonian (mk)
 * 
 * This module provides locale-specific configurations for formatting dates and times
 * in the Macedonian language using the Moment.js library.
 * 
 * @module moment-locale-mk
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for Macedonian locale
 */
interface MacedonianLocaleConfig extends LocaleSpecification {
  /** Full month names in Macedonian */
  months: string[];
  
  /** Abbreviated month names in Macedonian */
  monthsShort: string[];
  
  /** Full weekday names in Macedonian */
  weekdays: string[];
  
  /** Abbreviated weekday names in Macedonian */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Macedonian */
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
  
  /** Calendar display configurations */
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: () => string;
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
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers */
  ordinal: (num: number) => string;
  
  /** Week configuration */
  week: {
    /** Day of week (0 = Sunday, 1 = Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines the Macedonian locale configuration for Moment.js
 * 
 * @param moment - The Moment.js instance
 * @returns The configured Macedonian locale
 */
export function defineMacedonianLocale(moment: typeof import('moment')): Locale;

/**
 * Default export of the Macedonian locale configuration
 */
export default defineMacedonianLocale;