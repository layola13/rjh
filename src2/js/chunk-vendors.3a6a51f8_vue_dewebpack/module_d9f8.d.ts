import type { Moment, LocaleSpecification } from 'moment';

/**
 * Moment.js locale configuration for French (Canada)
 * @module fr-ca
 */

/**
 * Configuration object for the French Canadian locale
 */
interface FrenchCanadianLocaleConfig extends LocaleSpecification {
  /** Full month names in French Canadian */
  months: string[];
  
  /** Abbreviated month names in French Canadian */
  monthsShort: string[];
  
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  
  /** Full weekday names in French Canadian */
  weekdays: string[];
  
  /** Abbreviated weekday names in French Canadian */
  weekdaysShort: string[];
  
  /** Minimal weekday names in French Canadian */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays */
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
    /** Long date format with time */
    LLL: string;
    /** Full date format with weekday and time */
    LLLL: string;
  };
  
  /** Calendar date references */
  calendar: {
    /** Format for dates that are today */
    sameDay: string;
    /** Format for dates that are tomorrow */
    nextDay: string;
    /** Format for dates in the next week */
    nextWeek: string;
    /** Format for dates that are yesterday */
    lastDay: string;
    /** Format for dates in the last week */
    lastWeek: string;
    /** Format for all other dates */
    sameElse: string;
  };
  
  /** Relative time strings */
  relativeTime: {
    /** Future time prefix/suffix template */
    future: string;
    /** Past time prefix/suffix template */
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
  
  /** Regular expression to parse ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Function to format ordinal numbers based on context
   * @param num - The number to format
   * @param token - The token context (M=month, Q=quarter, D=day, etc.)
   * @returns The formatted ordinal string
   */
  ordinal: (num: number, token: string) => string;
}

/**
 * Defines the French Canadian locale for moment.js
 * @param moment - The moment.js instance
 */
declare function defineFrenchCanadianLocale(moment: typeof Moment): void;

export { FrenchCanadianLocaleConfig, defineFrenchCanadianLocale };