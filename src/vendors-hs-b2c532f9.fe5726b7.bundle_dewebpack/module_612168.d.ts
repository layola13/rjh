/**
 * Moment.js locale configuration for Spanish (United States)
 * Configures date/time formatting, month/weekday names, and relative time strings
 * for the es-us locale.
 */

import { Locale, LocaleSpecification, Moment } from 'moment';

/**
 * Month abbreviations with periods (used in certain contexts)
 */
declare const MONTHS_SHORT_WITH_PERIODS: readonly string[];

/**
 * Month abbreviations without periods (used after dates)
 */
declare const MONTHS_SHORT_WITHOUT_PERIODS: readonly string[];

/**
 * Regular expressions for parsing individual months
 */
declare const MONTH_PARSE_PATTERNS: readonly RegExp[];

/**
 * Combined regex pattern for matching month names (full or abbreviated)
 */
declare const MONTH_REGEX_COMBINED: RegExp;

/**
 * Configuration options for the es-us locale
 */
interface EsUsLocaleConfig extends LocaleSpecification {
  /** Full month names in Spanish */
  months: string[];
  
  /** 
   * Returns appropriate month abbreviation based on context
   * @param momentInstance - The moment instance (null for standalone usage)
   * @param format - The format string being used
   * @returns Month abbreviation with or without period, or array of all abbreviations
   */
  monthsShort(momentInstance: Moment | null, format: string): string | string[];
  
  /** Flexible regex for matching month names */
  monthsRegex: RegExp;
  
  /** Flexible regex for matching short month names */
  monthsShortRegex: RegExp;
  
  /** Strict regex for full month names */
  monthsStrictRegex: RegExp;
  
  /** Strict regex for abbreviated month names */
  monthsShortStrictRegex: RegExp;
  
  /** Patterns for parsing month names */
  monthsParse: RegExp[];
  
  /** Patterns for parsing full month names */
  longMonthsParse: RegExp[];
  
  /** Patterns for parsing short month names */
  shortMonthsParse: RegExp[];
  
  /** Full weekday names in Spanish */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday abbreviations */
  weekdaysMin: string[];
  
  /** Whether to parse weekday names exactly */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (e.g., "3:45 PM") */
    LT: string;
    /** Time with seconds format */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date with time format */
    LLL: string;
    /** Full date with weekday and time */
    LLLL: string;
  };
  
  /** Calendar-relative date formats */
  calendar: {
    /** Format for today */
    sameDay(this: Moment): string;
    /** Format for tomorrow */
    nextDay(this: Moment): string;
    /** Format for next week */
    nextWeek(this: Moment): string;
    /** Format for yesterday */
    lastDay(this: Moment): string;
    /** Format for last week */
    lastWeek(this: Moment): string;
    /** Fallback format for other dates */
    sameElse: string;
  };
  
  /** Relative time strings */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time prefix */
    past: string;
    /** A few seconds */
    s: string;
    /** Multiple seconds */
    ss: string;
    /** One minute */
    m: string;
    /** Multiple minutes */
    mm: string;
    /** One hour */
    h: string;
    /** Multiple hours */
    hh: string;
    /** One day */
    d: string;
    /** Multiple days */
    dd: string;
    /** One week */
    w: string;
    /** Multiple weeks */
    ww: string;
    /** One month */
    M: string;
    /** Multiple months */
    MM: string;
    /** One year */
    y: string;
    /** Multiple years */
    yy: string;
  };
  
  /** Regex for parsing ordinal numbers (e.g., "1º", "2º") */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Formats a number as an ordinal
   * @param num - The number to format
   * @returns The ordinal string (e.g., "1º")
   */
  ordinal(num: number): string;
  
  /** Week configuration */
  week: {
    /** Day of week (0 = Sunday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines and registers the es-us locale with moment.js
 * @param momentInstance - The moment.js instance to extend
 * @returns The registered locale
 */
declare function defineEsUsLocale(momentInstance: typeof import('moment')): Locale;

export { EsUsLocaleConfig, defineEsUsLocale };
export default defineEsUsLocale;