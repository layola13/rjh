/**
 * Moment.js French locale configuration module
 * Defines French language settings for date/time formatting
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Month name pattern matching both short and long formats
 * Matches: janv., février, mars, avr., mai, juin, juil., août, sept., oct., nov., déc.
 * and their full forms
 */
export const FRENCH_MONTHS_REGEX: RegExp;

/**
 * Array of regular expressions for parsing individual month names
 */
export const FRENCH_MONTHS_PARSE: RegExp[];

/**
 * French locale configuration for moment.js
 */
export interface FrenchLocaleConfig extends LocaleSpecification {
  /** Full month names */
  months: string[];
  
  /** Abbreviated month names */
  monthsShort: string[];
  
  /** Regular expression for matching month names (any format) */
  monthsRegex: RegExp;
  
  /** Regular expression for matching short month names */
  monthsShortRegex: RegExp;
  
  /** Strict regex for full month names only */
  monthsStrictRegex: RegExp;
  
  /** Strict regex for abbreviated month names only */
  monthsShortStrictRegex: RegExp;
  
  /** Parsers for month names */
  monthsParse: RegExp[];
  longMonthsParse: RegExp[];
  shortMonthsParse: RegExp[];
  
  /** Full weekday names */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names (2 letters) */
  weekdaysMin: string[];
  
  /** Whether to use exact matching for weekday parsing */
  weekdaysParseExact: boolean;
  
  /** Date/time format templates */
  longDateFormat: {
    /** Time format (24-hour) */
    LT: string;
    /** Time with seconds format */
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
  
  /** Calendar-relative time expressions */
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
  
  /** Regex pattern for day of month ordinal parsing */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Returns the ordinal suffix for a given number in a specific context
   * @param dayOfMonth - The day number
   * @param token - The format token (D, M, Q, DDD, d, w, W)
   * @returns The number with appropriate ordinal suffix (1er, 2e, 1re, etc.)
   */
  ordinal(dayOfMonth: number, token: string): string;
  
  /** Week settings */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year for week 1 */
    doy: number;
  };
}

/**
 * Defines and registers the French locale for moment.js
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured French locale
 */
export default function defineFrenchLocale(momentInstance: typeof import('moment')): Locale;