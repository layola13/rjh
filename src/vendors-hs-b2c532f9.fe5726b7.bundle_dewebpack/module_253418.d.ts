/**
 * Moment.js Greek (el) locale configuration
 * Defines localized date/time formats, month names, weekday names, and relative time strings for Greek
 */

import { Locale, Moment } from 'moment';

/**
 * Configuration object for Greek locale
 */
interface GreekLocaleConfig {
  /** Month names in nominative case (used as standalone) */
  monthsNominativeEl: string[];
  
  /** Month names in genitive case (used with dates) */
  monthsGenitiveEl: string[];
  
  /**
   * Returns appropriate month name based on context
   * @param moment - The moment instance
   * @param format - The format string being used
   * @returns Month name string or array of month names
   */
  months(moment: Moment | null, format: string): string | string[];
  
  /** Abbreviated month names */
  monthsShort: string[];
  
  /** Full weekday names */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names */
  weekdaysMin: string[];
  
  /**
   * Returns appropriate meridiem string (AM/PM equivalent)
   * @param hours - Hour of the day (0-23)
   * @param minutes - Minutes
   * @param isLowercase - Whether to return lowercase format
   * @returns Meridiem string ("πμ"/"μμ" or "ΠΜ"/"ΜΜ")
   */
  meridiem(hours: number, minutes: number, isLowercase: boolean): string;
  
  /**
   * Determines if the given meridiem string represents PM
   * @param input - The meridiem string to check
   * @returns True if PM, false otherwise
   */
  isPM(input: string): boolean;
  
  /** Regular expression to parse meridiem strings */
  meridiemParse: RegExp;
  
  /** Standard date/time format strings */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  
  /** Calendar format templates for relative dates */
  calendarEl: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek(this: Moment): string;
    sameElse: string;
  };
  
  /**
   * Returns formatted calendar string with proper Greek grammar
   * @param key - The calendar key (sameDay, nextDay, etc.)
   * @param moment - The moment instance being formatted
   * @returns Formatted calendar string
   */
  calendar(key: string, moment: Moment): string;
  
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
  
  /**
   * Returns ordinal format for day of month
   * @param num - The day number
   * @returns Ordinal string (e.g., "1η", "2η")
   */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines the Greek locale for moment.js
 * @param moment - The moment.js instance
 * @returns The configured Greek locale
 */
declare function defineGreekLocale(moment: typeof Moment): Locale;

export default defineGreekLocale;