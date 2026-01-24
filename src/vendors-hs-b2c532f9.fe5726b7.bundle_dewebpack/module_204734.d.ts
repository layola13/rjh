/**
 * Moment.js locale configuration for Chuvash (cv)
 * Defines date/time formatting, calendar strings, and relative time rules for the Chuvash language.
 * 
 * @module MomentLocaleChuvash
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Locale specification for Chuvash language
 */
interface ChuvashLocaleSpecification extends LocaleSpecification {
  /** Month names in Chuvash */
  months: string[];
  
  /** Abbreviated month names */
  monthsShort: string[];
  
  /** Weekday names in Chuvash */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names */
  weekdaysMin: string[];
  
  /** Long date format patterns */
  longDateFormat: {
    /** Time format (24-hour) */
    LT: string;
    /** Time format with seconds */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format with month name */
    LL: string;
    /** Long date and time format */
    LLL: string;
    /** Full date and time with weekday */
    LLLL: string;
  };
  
  /** Calendar-relative date strings */
  calendar: {
    /** Format for today */
    sameDay: string;
    /** Format for tomorrow */
    nextDay: string;
    /** Format for yesterday */
    lastDay: string;
    /** Format for next week */
    nextWeek: string;
    /** Format for last week */
    lastWeek: string;
    /** Fallback format */
    sameElse: string;
  };
  
  /** Relative time configuration */
  relativeTime: {
    /**
     * Formats future relative time with appropriate suffix
     * @param time - The time string to format
     * @returns Formatted string with correct Chuvash suffix
     */
    future: (time: string) => string;
    
    /** Past time format template */
    past: string;
    
    /** Seconds (singular) */
    s: string;
    /** Seconds (plural) - %d placeholder for count */
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
  
  /** Pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Formats day number as ordinal
   * @param num - Day number
   * @returns Formatted ordinal string
   */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines and registers the Chuvash locale with moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The configured Chuvash locale
 */
export function defineChuvashLocale(moment: typeof import('moment')): Locale;

/**
 * The Chuvash locale configuration object
 */
export const chuvashLocale: ChuvashLocaleSpecification;

export default defineChuvashLocale;