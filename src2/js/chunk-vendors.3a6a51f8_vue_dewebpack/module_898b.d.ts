/**
 * Moment.js locale configuration for Spanish (es)
 * Configures date/time formatting, month names, weekday names, and relative time expressions
 */

import { Locale, MomentInput } from 'moment';

/**
 * Abbreviated month names with periods
 */
declare const MONTHS_SHORT_WITH_DOTS: ReadonlyArray<string>;

/**
 * Abbreviated month names without periods
 */
declare const MONTHS_SHORT_WITHOUT_DOTS: ReadonlyArray<string>;

/**
 * Regular expressions for parsing month abbreviations
 */
declare const MONTHS_PARSE_PATTERNS: ReadonlyArray<RegExp>;

/**
 * Regular expression for matching full and abbreviated month names
 */
declare const MONTHS_REGEX: RegExp;

/**
 * Configuration interface for moment.js locale
 */
interface LocaleConfig {
  /** Full month names */
  months: string | string[];
  
  /** 
   * Abbreviated month names (context-sensitive)
   * @param momentInstance - The moment instance being formatted
   * @param format - The format string being applied
   * @returns Appropriate month abbreviation or array of abbreviations
   */
  monthsShort: (momentInstance: MomentInput, format: string) => string | string[];
  
  /** Regular expression for matching month names */
  monthsRegex: RegExp;
  
  /** Regular expression for matching abbreviated month names */
  monthsShortRegex: RegExp;
  
  /** Strict regular expression for full month names */
  monthsStrictRegex: RegExp;
  
  /** Strict regular expression for abbreviated month names */
  monthsShortStrictRegex: RegExp;
  
  /** Patterns for parsing month names */
  monthsParse: RegExp[];
  
  /** Patterns for parsing full month names */
  longMonthsParse: RegExp[];
  
  /** Patterns for parsing abbreviated month names */
  shortMonthsParse: RegExp[];
  
  /** Full weekday names */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday abbreviations */
  weekdaysMin: string[];
  
  /** Whether to use exact matching for weekday parsing */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (e.g., "H:mm") */
    LT: string;
    /** Time with seconds format */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date with time format */
    LLL: string;
    /** Full date and time format */
    LLLL: string;
  };
  
  /** Calendar-specific formatting functions */
  calendar: {
    /** Format for today */
    sameDay: (this: { hours: () => number }) => string;
    /** Format for tomorrow */
    nextDay: (this: { hours: () => number }) => string;
    /** Format for next week */
    nextWeek: (this: { hours: () => number }) => string;
    /** Format for yesterday */
    lastDay: (this: { hours: () => number }) => string;
    /** Format for last week */
    lastWeek: (this: { hours: () => number }) => string;
    /** Default format for other dates */
    sameElse: string;
  };
  
  /** Relative time expressions */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time prefix */
    past: string;
    /** Seconds (singular) */
    s: string;
    /** Seconds (plural) */
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
    /** Week (singular) */
    w: string;
    /** Weeks (plural) */
    ww: string;
    /** Month (singular) */
    M: string;
    /** Months (plural) */
    MM: string;
    /** Year (singular) */
    y: string;
    /** Years (plural) */
    yy: string;
  };
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** 
   * Ordinal number formatter
   * @param num - The number to format
   * @returns Formatted ordinal string
   */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday, etc.) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
  
  /** Invalid date message */
  invalidDate: string;
}

/**
 * Defines the Spanish locale configuration for moment.js
 * @param locale - The moment.js locale object
 */
declare function defineSpanishLocale(locale: typeof import('moment')): void;

export { LocaleConfig, defineSpanishLocale };