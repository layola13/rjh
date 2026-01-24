/**
 * Moment.js locale configuration for Mongolian (mn)
 * Provides localized date/time formatting, relative time, and calendar strings for Mongolian language
 */

/**
 * Formats relative time duration with appropriate Mongolian suffix
 * @param value - The numeric value of the time unit
 * @param withoutSuffix - If true, returns nominative case; if false, returns genitive case
 * @param key - The unit of time (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy)
 * @param isFuture - Indicates if the time is in the future (unused in this implementation)
 * @returns Formatted time string in Mongolian
 */
declare function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string;

/**
 * Mongolian locale configuration object for moment.js
 */
declare interface MongolianLocaleConfig {
  /** Full month names in Mongolian */
  months: string[];
  
  /** Abbreviated month names (numeric format) */
  monthsShort: string[];
  
  /** Use exact parsing for months */
  monthsParseExact: boolean;
  
  /** Full weekday names in Mongolian */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names (2 characters) */
  weekdaysMin: string[];
  
  /** Use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (24-hour) */
    LT: string;
    /** Time format with seconds */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date with time */
    LLL: string;
    /** Full date with weekday and time */
    LLLL: string;
  };
  
  /** Regular expression to parse AM/PM indicators in Mongolian */
  meridiemParse: RegExp;
  
  /**
   * Determines if the given meridiem string represents PM
   * @param meridiemString - The meridiem indicator string
   * @returns True if PM (ҮХ), false otherwise
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Returns the appropriate meridiem string for the given time
   * @param hours - Hour of the day (0-23)
   * @param minutes - Minute of the hour
   * @param isLowercase - Whether to return lowercase (unused in Mongolian)
   * @returns "ҮӨ" (AM) or "ҮХ" (PM)
   */
  meridiem(hours: number, minutes: number, isLowercase: boolean): string;
  
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
  
  /** Relative time format configuration */
  relativeTime: {
    /** Format for future time */
    future: string;
    /** Format for past time */
    past: string;
    /** Handler for seconds */
    s: typeof formatRelativeTime;
    /** Handler for multiple seconds */
    ss: typeof formatRelativeTime;
    /** Handler for minute */
    m: typeof formatRelativeTime;
    /** Handler for minutes */
    mm: typeof formatRelativeTime;
    /** Handler for hour */
    h: typeof formatRelativeTime;
    /** Handler for hours */
    hh: typeof formatRelativeTime;
    /** Handler for day */
    d: typeof formatRelativeTime;
    /** Handler for days */
    dd: typeof formatRelativeTime;
    /** Handler for month */
    M: typeof formatRelativeTime;
    /** Handler for months */
    MM: typeof formatRelativeTime;
    /** Handler for year */
    y: typeof formatRelativeTime;
    /** Handler for years */
    yy: typeof formatRelativeTime;
  };
  
  /** Regular expression to parse ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Returns the ordinal format for a number based on the token type
   * @param number - The number to format
   * @param token - The format token (d, D, DDD for day ordinals)
   * @returns Formatted ordinal string
   */
  ordinal(number: number, token: string): string;
}

/**
 * Moment.js instance with locale definition capabilities
 */
declare interface MomentStatic {
  /**
   * Defines a new locale configuration
   * @param localeName - The locale identifier (e.g., "mn")
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: MongolianLocaleConfig): void;
}

declare const moment: MomentStatic;

export { MongolianLocaleConfig, MomentStatic, formatRelativeTime };