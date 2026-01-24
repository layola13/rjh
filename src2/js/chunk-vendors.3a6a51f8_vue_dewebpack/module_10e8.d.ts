/**
 * Moment.js Thai (th) locale configuration
 * Provides localization for date/time formatting in Thai language
 */

declare module 'moment' {
  /**
   * Thai locale configuration interface
   */
  interface ThaiLocaleConfig {
    /** Full month names in Thai */
    months: string[];
    
    /** Abbreviated month names in Thai */
    monthsShort: string[];
    
    /** Whether to use exact parsing for months */
    monthsParseExact: boolean;
    
    /** Full weekday names in Thai */
    weekdays: string[];
    
    /** Short weekday names in Thai */
    weekdaysShort: string[];
    
    /** Minimal weekday names in Thai */
    weekdaysMin: string[];
    
    /** Whether to use exact parsing for weekdays */
    weekdaysParseExact: boolean;
    
    /** Long date format patterns */
    longDateFormat: LongDateFormatConfig;
    
    /** RegExp pattern for parsing AM/PM (before noon/after noon) */
    meridiemParse: RegExp;
    
    /**
     * Determines if the given string represents PM (after noon)
     * @param input - The meridiem string to check
     * @returns True if the time is PM (หลังเที่ยง)
     */
    isPM(input: string): boolean;
    
    /**
     * Returns the appropriate meridiem string for the given time
     * @param hour - Hour of the day (0-23)
     * @param minute - Minute of the hour
     * @param isLowercase - Whether to return lowercase format
     * @returns "ก่อนเที่ยง" (before noon) or "หลังเที่ยง" (after noon)
     */
    meridiem(hour: number, minute: number, isLowercase: boolean): string;
    
    /** Calendar display formats for relative dates */
    calendar: CalendarConfig;
    
    /** Relative time display formats */
    relativeTime: RelativeTimeConfig;
  }

  /**
   * Long date format configuration
   */
  interface LongDateFormatConfig {
    /** Time format (e.g., "H:mm") */
    LT: string;
    
    /** Time with seconds format (e.g., "H:mm:ss") */
    LTS: string;
    
    /** Short date format (e.g., "DD/MM/YYYY") */
    L: string;
    
    /** Long date format (e.g., "D MMMM YYYY") */
    LL: string;
    
    /** Long date with time format */
    LLL: string;
    
    /** Full date with day name and time format */
    LLLL: string;
  }

  /**
   * Calendar display configuration for relative dates
   */
  interface CalendarConfig {
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
    
    /** Format for all other dates */
    sameElse: string;
  }

  /**
   * Relative time display configuration
   */
  interface RelativeTimeConfig {
    /** Format for future times (e.g., "in %s") */
    future: string;
    
    /** Format for past times (e.g., "%s ago") */
    past: string;
    
    /** Format for a few seconds */
    s: string;
    
    /** Format for seconds (plural) */
    ss: string;
    
    /** Format for one minute */
    m: string;
    
    /** Format for minutes (plural) */
    mm: string;
    
    /** Format for one hour */
    h: string;
    
    /** Format for hours (plural) */
    hh: string;
    
    /** Format for one day */
    d: string;
    
    /** Format for days (plural) */
    dd: string;
    
    /** Format for one week */
    w: string;
    
    /** Format for weeks (plural) */
    ww: string;
    
    /** Format for one month */
    M: string;
    
    /** Format for months (plural) */
    MM: string;
    
    /** Format for one year */
    y: string;
    
    /** Format for years (plural) */
    yy: string;
  }

  /**
   * Defines the Thai locale for moment.js
   * @param localeKey - The locale identifier ("th")
   * @param config - Thai locale configuration object
   */
  function defineLocale(localeKey: 'th', config: ThaiLocaleConfig): Locale;
}

export {};