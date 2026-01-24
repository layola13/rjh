/**
 * Moment.js locale configuration for Swati (ss)
 * Defines date and time formatting rules for the Swati language
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Swati (ss) locale configuration
 */
export interface SwatiLocaleConfig extends LocaleSpecification {
  /** Full month names in Swati */
  months: string[];
  
  /** Abbreviated month names in Swati */
  monthsShort: string[];
  
  /** Full weekday names in Swati */
  weekdays: string[];
  
  /** Abbreviated weekday names in Swati */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Swati */
  weekdaysMin: string[];
  
  /** Use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (e.g., "h:mm A") */
    LT: string;
    /** Time with seconds format (e.g., "h:mm:ss A") */
    LTS: string;
    /** Date format (e.g., "DD/MM/YYYY") */
    L: string;
    /** Long date format (e.g., "D MMMM YYYY") */
    LL: string;
    /** Long date with time format */
    LLL: string;
    /** Full date with weekday and time format */
    LLLL: string;
  };
  
  /** Calendar date formatting for relative dates */
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
  
  /** Relative time formatting */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time prefix */
    past: string;
    /** Few seconds */
    s: string;
    /** Seconds (plural) */
    ss: string;
    /** One minute */
    m: string;
    /** Minutes (plural) */
    mm: string;
    /** One hour */
    h: string;
    /** Hours (plural) */
    hh: string;
    /** One day */
    d: string;
    /** Days (plural) */
    dd: string;
    /** One month */
    M: string;
    /** Months (plural) */
    MM: string;
    /** One year */
    y: string;
    /** Years (plural) */
    yy: string;
  };
  
  /** Regular expression for parsing meridiem (AM/PM) */
  meridiemParse: RegExp;
  
  /**
   * Get meridiem string for given hour
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase
   * @returns Meridiem string in Swati
   */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  
  /**
   * Convert 12-hour format to 24-hour format
   * @param hour - Hour in 12-hour format (1-12)
   * @param meridiem - Meridiem string in Swati
   * @returns Hour in 24-hour format (0-23)
   */
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  
  /** Regular expression for parsing day of month ordinal */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Format ordinal number
   * @param num - Number to format
   * @returns Formatted ordinal string
   */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year that starts the first week */
    doy: number;
  };
}

/**
 * Defines the Swati locale for moment.js
 * @param moment - Moment.js instance
 * @returns Configured locale
 */
export function defineSwatiLocale(moment: typeof import('moment')): Locale;

export default defineSwatiLocale;