/**
 * Moment.js locale configuration for Bosnian (bs)
 * Provides localized date/time formatting, relative time, and calendar formatting
 */

/**
 * Pluralization helper for Bosnian time units
 * Handles Slavic plural forms based on count
 * 
 * @param count - The numeric value to format
 * @param withoutSuffix - Whether format is standalone (true) or with preposition (false)
 * @param key - Time unit identifier (ss, m, mm, h, hh, dd, MM, yy)
 * @returns Formatted string with appropriate plural form
 */
declare function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  key: string
): string;

/**
 * Bosnian locale configuration object for moment.js
 */
declare interface BosnianLocaleConfig {
  /** Full month names in nominative case */
  months: string[];
  
  /** Abbreviated month names with periods */
  monthsShort: string[];
  
  /** Require exact match for month parsing */
  monthsParseExact: boolean;
  
  /** Full weekday names */
  weekdays: string[];
  
  /** Abbreviated weekday names with periods */
  weekdaysShort: string[];
  
  /** Minimal weekday abbreviations (2 letters) */
  weekdaysMin: string[];
  
  /** Require exact match for weekday parsing */
  weekdaysParseExact: boolean;
  
  /** Date/time format tokens */
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
    /** Full date with weekday and time */
    LLLL: string;
  };
  
  /** Calendar-relative date formatting */
  calendar: {
    /** Format for today */
    sameDay: string;
    /** Format for tomorrow */
    nextDay: string;
    /** Function returning format for next week based on day of week */
    nextWeek: (this: { day(): number }) => string;
    /** Format for yesterday */
    lastDay: string;
    /** Function returning format for last week based on day of week */
    lastWeek: (this: { day(): number }) => string;
    /** Fallback format for other dates */
    sameElse: string;
  };
  
  /** Relative time formatting rules */
  relativeTime: {
    /** Future time format template */
    future: string;
    /** Past time format template */
    past: string;
    /** Seconds (few) */
    s: string;
    /** Seconds formatter function */
    ss: typeof formatRelativeTime;
    /** Minute formatter function */
    m: typeof formatRelativeTime;
    /** Minutes formatter function */
    mm: typeof formatRelativeTime;
    /** Hour formatter function */
    h: typeof formatRelativeTime;
    /** Hours formatter function */
    hh: typeof formatRelativeTime;
    /** Single day */
    d: string;
    /** Days formatter function */
    dd: typeof formatRelativeTime;
    /** Single month */
    M: string;
    /** Months formatter function */
    MM: typeof formatRelativeTime;
    /** Single year */
    y: string;
    /** Years formatter function */
    yy: typeof formatRelativeTime;
  };
  
  /** Pattern for parsing ordinal day numbers */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Format template for ordinal numbers */
  ordinal: string;
  
  /** Week calculation settings */
  week: {
    /** First day of week (1 = Monday) */
    dow: number;
    /** First week of year calculation */
    doy: number;
  };
}

/**
 * Registers the Bosnian locale with moment.js
 * @param moment - Moment.js instance with defineLocale method
 */
declare function defineBosnianLocale(moment: {
  defineLocale(locale: string, config: BosnianLocaleConfig): void;
}): void;

export { BosnianLocaleConfig, formatRelativeTime, defineBosnianLocale };