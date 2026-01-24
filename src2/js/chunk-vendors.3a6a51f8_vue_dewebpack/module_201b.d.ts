/**
 * Georgian (ka) locale configuration for Moment.js
 * Provides localization for date/time formatting, relative time, and calendar display
 */

/**
 * Locale data structure for Georgian language support
 */
interface GeorgianLocaleData {
  /** Full month names in Georgian */
  months: string[];
  
  /** Abbreviated month names in Georgian */
  monthsShort: string[];
  
  /** Weekday names with different forms for standalone and formatted usage */
  weekdays: {
    /** Weekday names in nominative case (standalone) */
    standalone: string[];
    
    /** Weekday names in dative case (used in date formats) */
    format: string[];
    
    /** Regular expression to determine which format to use based on context */
    isFormat: RegExp;
  };
  
  /** Short weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names (2 characters) */
  weekdaysMin: string[];
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (hours:minutes) */
    LT: string;
    
    /** Time format with seconds */
    LTS: string;
    
    /** Short date format */
    L: string;
    
    /** Long date format */
    LL: string;
    
    /** Long date with time */
    LLL: string;
    
    /** Full date and time with weekday */
    LLLL: string;
  };
  
  /** Calendar display formats for relative dates */
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
    
    /** Default format for other dates */
    sameElse: string;
  };
  
  /** Relative time formatting rules */
  relativeTime: {
    /** Function to format future relative times */
    future: (timeString: string) => string;
    
    /** Function to format past relative times */
    past: (timeString: string) => string;
    
    /** Format for "a few seconds" */
    s: string;
    
    /** Format for seconds (plural) */
    ss: string;
    
    /** Format for "a minute" */
    m: string;
    
    /** Format for minutes (plural) */
    mm: string;
    
    /** Format for "an hour" */
    h: string;
    
    /** Format for hours (plural) */
    hh: string;
    
    /** Format for "a day" */
    d: string;
    
    /** Format for days (plural) */
    dd: string;
    
    /** Format for "a month" */
    M: string;
    
    /** Format for months (plural) */
    MM: string;
    
    /** Format for "a year" */
    y: string;
    
    /** Format for years (plural) */
    yy: string;
  };
  
  /** Regular expression to parse ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers */
  ordinal: (num: number) => string;
  
  /** Week configuration */
  week: {
    /** First day of week (1 = Monday) */
    dow: number;
    
    /** First week of year calculation method */
    doy: number;
  };
}

/**
 * Moment.js instance with locale definition capability
 */
interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeKey - The locale identifier (e.g., "ka" for Georgian)
   * @param config - The locale configuration object
   */
  defineLocale(localeKey: string, config: GeorgianLocaleData): void;
}

/**
 * Converts future tense time expressions to proper Georgian grammatical form
 * @param timeString - The time expression to convert
 * @returns The properly formatted future tense string
 */
declare function formatFutureTime(timeString: string): string;

/**
 * Converts past tense time expressions to proper Georgian grammatical form
 * @param timeString - The time expression to convert
 * @returns The properly formatted past tense string
 */
declare function formatPastTime(timeString: string): string;

/**
 * Formats ordinal numbers according to Georgian language rules
 * @param num - The number to format as ordinal
 * @returns The formatted ordinal string
 */
declare function formatOrdinal(num: number): string;

/**
 * Registers the Georgian locale configuration with Moment.js
 * @param moment - The Moment.js instance
 */
declare function defineGeorgianLocale(moment: MomentStatic): void;

export { GeorgianLocaleData, MomentStatic, formatFutureTime, formatPastTime, formatOrdinal, defineGeorgianLocale };