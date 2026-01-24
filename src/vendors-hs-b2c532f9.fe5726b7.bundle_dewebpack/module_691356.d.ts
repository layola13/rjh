/**
 * Moment.js locale configuration for Faroese (fo)
 * Provides localization support for dates, times, and relative time formatting in Faroese language
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for Faroese locale
 * Contains translations and formatting rules for dates and times
 */
interface FaroeseLocaleConfig extends LocaleSpecification {
  /** Full month names in Faroese */
  months: string[];
  
  /** Abbreviated month names in Faroese */
  monthsShort: string[];
  
  /** Full weekday names in Faroese */
  weekdays: string[];
  
  /** Abbreviated weekday names in Faroese */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Faroese */
  weekdaysMin: string[];
  
  /** Long date format tokens and their representations */
  longDateFormat: {
    /** Time format (hours:minutes) */
    LT: string;
    /** Time format with seconds (hours:minutes:seconds) */
    LTS: string;
    /** Short date format (day/month/year) */
    L: string;
    /** Long date format (day month year) */
    LL: string;
    /** Long date and time format */
    LLL: string;
    /** Full date and time format with weekday */
    LLLL: string;
  };
  
  /** Calendar-specific date formatting for relative dates */
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
  
  /** Relative time formatting strings */
  relativeTime: {
    /** Future time prefix template */
    future: string;
    /** Past time suffix template */
    past: string;
    /** Few seconds label */
    s: string;
    /** Seconds label with count placeholder */
    ss: string;
    /** One minute label */
    m: string;
    /** Minutes label with count placeholder */
    mm: string;
    /** One hour label */
    h: string;
    /** Hours label with count placeholder */
    hh: string;
    /** One day label */
    d: string;
    /** Days label with count placeholder */
    dd: string;
    /** One month label */
    M: string;
    /** Months label with count placeholder */
    MM: string;
    /** One year label */
    y: string;
    /** Years label with count placeholder */
    yy: string;
  };
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function or template string for formatting ordinal numbers */
  ordinal: string | ((num: number) => string);
  
  /** Week numbering configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines and registers the Faroese locale configuration with moment.js
 * @param moment - The moment.js instance to register the locale with
 * @returns The registered locale object
 */
declare function defineFaroeseLocale(moment: typeof import('moment')): Locale;

export default defineFaroeseLocale;