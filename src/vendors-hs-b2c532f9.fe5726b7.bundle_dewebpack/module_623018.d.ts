/**
 * Moment.js locale configuration for Frisian (fy)
 * Provides localized date/time formatting for the Frisian language
 */

import type { Locale, MomentInput } from 'moment';

/**
 * Month abbreviations with period (used in certain contexts)
 */
declare const MONTHS_SHORT_WITH_PERIOD: readonly [
  'jan.', 'feb.', 'mrt.', 'apr.', 'mai', 'jun.',
  'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'des.'
];

/**
 * Month abbreviations without period (used in -MMM- format)
 */
declare const MONTHS_SHORT_WITHOUT_PERIOD: readonly [
  'jan', 'feb', 'mrt', 'apr', 'mai', 'jun',
  'jul', 'aug', 'sep', 'okt', 'nov', 'des'
];

/**
 * Locale configuration object for Frisian
 */
export interface FrisianLocaleConfig {
  /** Full month names in Frisian */
  months: readonly string[];
  
  /** 
   * Month abbreviations (context-dependent)
   * @param momentInstance - The moment instance
   * @param format - The format string being used
   * @returns Appropriate month abbreviation based on format context
   */
  monthsShort: (momentInstance: MomentInput, format: string) => string[] | string;
  
  /** Whether to use exact parsing for months */
  monthsParseExact: true;
  
  /** Full weekday names in Frisian */
  weekdays: readonly string[];
  
  /** Short weekday names in Frisian */
  weekdaysShort: readonly string[];
  
  /** Minimal weekday names in Frisian */
  weekdaysMin: readonly string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: true;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (24-hour) */
    LT: 'HH:mm';
    /** Time format with seconds */
    LTS: 'HH:mm:ss';
    /** Short date format */
    L: 'DD-MM-YYYY';
    /** Long date format */
    LL: 'D MMMM YYYY';
    /** Long date and time format */
    LLL: 'D MMMM YYYY HH:mm';
    /** Full date and time format with weekday */
    LLLL: 'dddd D MMMM YYYY HH:mm';
  };
  
  /** Calendar format strings for relative dates */
  calendar: {
    /** Format for today */
    sameDay: '[hjoed om] LT';
    /** Format for tomorrow */
    nextDay: '[moarn om] LT';
    /** Format for next week */
    nextWeek: 'dddd [om] LT';
    /** Format for yesterday */
    lastDay: '[juster om] LT';
    /** Format for last week */
    lastWeek: '[ôfrûne] dddd [om] LT';
    /** Format for other dates */
    sameElse: 'L';
  };
  
  /** Relative time format strings */
  relativeTime: {
    /** Future time prefix */
    future: 'oer %s';
    /** Past time suffix */
    past: '%s lyn';
    /** Few seconds */
    s: 'in pear sekonden';
    /** Seconds (plural) */
    ss: '%d sekonden';
    /** One minute */
    m: 'ien minút';
    /** Minutes (plural) */
    mm: '%d minuten';
    /** One hour */
    h: 'ien oere';
    /** Hours (plural) */
    hh: '%d oeren';
    /** One day */
    d: 'ien dei';
    /** Days (plural) */
    dd: '%d dagen';
    /** One month */
    M: 'ien moanne';
    /** Months (plural) */
    MM: '%d moannen';
    /** One year */
    y: 'ien jier';
    /** Years (plural) */
    yy: '%d jierren';
  };
  
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Returns ordinal suffix for day of month
   * @param dayOfMonth - The day of the month (1-31)
   * @returns Day with appropriate ordinal suffix ('ste' or 'de')
   */
  ordinal: (dayOfMonth: number) => string;
  
  /** Week configuration */
  week: {
    /** Day of week (Monday = 1) */
    dow: 1;
    /** Day of year that defines week 1 */
    doy: 4;
  };
}

/**
 * Initializes and registers the Frisian locale with Moment.js
 * @param moment - The Moment.js instance
 * @returns The configured Frisian locale
 */
declare function defineFrisianLocale(moment: typeof import('moment')): Locale;

export default defineFrisianLocale;