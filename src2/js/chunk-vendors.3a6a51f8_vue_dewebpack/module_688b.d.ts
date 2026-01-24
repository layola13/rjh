/**
 * Moment.js locale configuration for Māori (mi)
 * @module moment/locale/mi
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Locale specification for Māori language
 */
interface MaoriLocaleSpecification extends LocaleSpecification {
  /** Full month names in Māori */
  months: string[];
  
  /** Abbreviated month names in Māori */
  monthsShort: string[];
  
  /** Regular expression for matching month names (case-insensitive, supports Māori characters) */
  monthsRegex: RegExp;
  
  /** Strict regular expression for matching full month names */
  monthsStrictRegex: RegExp;
  
  /** Regular expression for matching short month names */
  monthsShortRegex: RegExp;
  
  /** Strict regular expression for matching short month names */
  monthsShortStrictRegex: RegExp;
  
  /** Full weekday names in Māori */
  weekdays: string[];
  
  /** Abbreviated weekday names in Māori */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Māori */
  weekdaysMin: string[];
  
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
    /** Long date and time format */
    LLL: string;
    /** Full date and time format with weekday */
    LLLL: string;
  };
  
  /** Calendar date formats for relative dates */
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
  
  /** Relative time configuration */
  relativeTime: {
    /** Future time format template */
    future: string;
    /** Past time format template */
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
   * Function to format ordinal numbers
   * @param num - The number to format
   * @returns Formatted ordinal string
   */
  ordinal: string | ((num: number) => string);
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines and registers the Māori locale configuration with moment.js
 * @param moment - The moment.js instance
 * @returns The registered locale
 */
declare function defineMaoriLocale(moment: typeof import('moment')): Locale;

export default defineMaoriLocale;

export const localeSpecification: MaoriLocaleSpecification;