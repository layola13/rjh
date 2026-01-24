/**
 * Icelandic locale configuration for Moment.js
 * @module moment/locale/is
 */

/**
 * Determines if a number should use plural form in Icelandic
 * @param value - The number to check
 * @returns true if the number should use plural form, false otherwise
 * @remarks 
 * In Icelandic, plural form is used when:
 * - The number doesn't end in 1, OR
 * - The number ends in 11 (e.g., 11, 111, 211)
 */
declare function isPlural(value: number): boolean;

/**
 * Unit types for relative time formatting
 */
type RelativeTimeUnit = 
  | 's'   // seconds
  | 'ss'  // seconds (plural)
  | 'm'   // minute
  | 'mm'  // minutes
  | 'h'   // hour
  | 'hh'  // hours
  | 'd'   // day
  | 'dd'  // days
  | 'M'   // month
  | 'MM'  // months
  | 'y'   // year
  | 'yy'; // years

/**
 * Formats relative time durations in Icelandic with proper grammatical forms
 * @param value - The numeric value of the duration
 * @param withoutSuffix - Whether to format without a suffix (nominative case)
 * @param unit - The time unit being formatted
 * @param isFuture - Whether the time is in the future (affects case)
 * @returns Formatted Icelandic string for the relative time
 */
declare function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  unit: RelativeTimeUnit,
  isFuture: boolean
): string;

/**
 * Icelandic locale configuration object
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
  
  /** Date and time format configurations */
  longDateFormat: {
    /** Time format (24-hour) */
    LT: string;
    /** Time format with seconds */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date and time format */
    LLL: string;
    /** Full date and time format with weekday */
    LLLL: string;
  };
  
  /** Calendar-specific date formatting */
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
    /** Format for all other dates */
    sameElse: string;
  };
  
  /** Relative time formatting configuration */
  relativeTime: {
    /** Future time prefix format */
    future: string;
    /** Past time suffix format */
    past: string;
    /** Seconds formatter */
    s: typeof formatRelativeTime;
    /** Seconds (plural) formatter */
    ss: typeof formatRelativeTime;
    /** Minute formatter */
    m: typeof formatRelativeTime;
    /** Minutes formatter */
    mm: typeof formatRelativeTime;
    /** Single hour display */
    h: string;
    /** Hours formatter */
    hh: typeof formatRelativeTime;
    /** Day formatter */
    d: typeof formatRelativeTime;
    /** Days formatter */
    dd: typeof formatRelativeTime;
    /** Month formatter */
    M: typeof formatRelativeTime;
    /** Months formatter */
    MM: typeof formatRelativeTime;
    /** Year formatter */
    y: typeof formatRelativeTime;
    /** Years formatter */
    yy: typeof formatRelativeTime;
  };
  
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Ordinal number formatter */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year for week calculation */
    doy: number;
  };
}

/**
 * Registers the Icelandic locale with Moment.js
 * @param moment - Moment.js instance
 */
declare function defineIcelandicLocale(moment: unknown): void;

export { IcelandicLocaleConfig, formatRelativeTime, isPlural, defineIcelandicLocale };