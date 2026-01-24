/**
 * Moment.js locale configuration for Icelandic (is)
 * 
 * This module provides Icelandic language support for moment.js,
 * including month names, weekday names, date formatting, and
 * relative time expressions.
 * 
 * @module moment/locale/is
 */

/**
 * Checks if a number should use plural form in Icelandic.
 * In Icelandic, numbers ending in 1 are singular, except for 11.
 * 
 * @param value - The numeric value to check
 * @returns True if the value should use plural form, false for singular
 */
declare function shouldUsePlural(value: number): boolean;

/**
 * Formats relative time duration in Icelandic.
 * Handles proper grammatical cases and plural forms based on context.
 * 
 * @param count - The numeric value of the duration
 * @param withoutSuffix - Whether the string is without suffix (e.g., "in 2 hours" vs "2 hours")
 * @param unit - The time unit key (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy)
 * @param isFuture - Whether the time is in the future
 * @returns The formatted relative time string in Icelandic
 */
declare function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  unit: 's' | 'ss' | 'm' | 'mm' | 'h' | 'hh' | 'd' | 'dd' | 'M' | 'MM' | 'y' | 'yy',
  isFuture: boolean
): string;

/**
 * Icelandic locale configuration object for moment.js
 */
declare interface IcelandicLocaleConfig {
  /** Full month names in Icelandic */
  months: string[];
  
  /** Abbreviated month names in Icelandic */
  monthsShort: string[];
  
  /** Full weekday names in Icelandic */
  weekdays: string[];
  
  /** Abbreviated weekday names in Icelandic */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Icelandic */
  weekdaysMin: string[];
  
  /** Date and time format templates */
  longDateFormat: {
    /** Time format (e.g., "14:30") */
    LT: string;
    /** Time with seconds format (e.g., "14:30:45") */
    LTS: string;
    /** Short date format (e.g., "25.12.2023") */
    L: string;
    /** Long date format (e.g., "25. desember 2023") */
    LL: string;
    /** Long date with time (e.g., "25. desember 2023 kl. 14:30") */
    LLL: string;
    /** Full date with weekday and time */
    LLLL: string;
  };
  
  /** Calendar date display templates */
  calendar: {
    /** Template for today */
    sameDay: string;
    /** Template for tomorrow */
    nextDay: string;
    /** Template for next week */
    nextWeek: string;
    /** Template for yesterday */
    lastDay: string;
    /** Template for last week */
    lastWeek: string;
    /** Template for other dates */
    sameElse: string;
  };
  
  /** Relative time formatting configuration */
  relativeTime: {
    /** Template for future times */
    future: string;
    /** Template for past times */
    past: string;
    /** Formatter for seconds */
    s: typeof formatRelativeTime;
    /** Formatter for multiple seconds */
    ss: typeof formatRelativeTime;
    /** Formatter for a minute */
    m: typeof formatRelativeTime;
    /** Formatter for multiple minutes */
    mm: typeof formatRelativeTime;
    /** String for one hour */
    h: string;
    /** Formatter for multiple hours */
    hh: typeof formatRelativeTime;
    /** Formatter for a day */
    d: typeof formatRelativeTime;
    /** Formatter for multiple days */
    dd: typeof formatRelativeTime;
    /** Formatter for a month */
    M: typeof formatRelativeTime;
    /** Formatter for multiple months */
    MM: typeof formatRelativeTime;
    /** Formatter for a year */
    y: typeof formatRelativeTime;
    /** Formatter for multiple years */
    yy: typeof formatRelativeTime;
  };
  
  /** Regular expression to parse ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Format string for ordinal numbers */
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
 * Defines and registers the Icelandic locale configuration with moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The configured locale object
 */
declare function defineIcelandicLocale(moment: any): IcelandicLocaleConfig;

export { IcelandicLocaleConfig, defineIcelandicLocale, formatRelativeTime, shouldUsePlural };