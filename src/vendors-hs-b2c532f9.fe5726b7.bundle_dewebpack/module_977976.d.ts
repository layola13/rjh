/**
 * Moment.js locale configuration for Italian (Switzerland)
 * Configures date/time formatting, calendar displays, and relative time expressions
 * for the it-CH locale (Italian as spoken in Switzerland)
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for Italian (Switzerland) locale
 */
export interface ItChLocaleConfig extends LocaleSpecification {
  /** Full month names in Italian */
  months: string[];
  
  /** Abbreviated month names */
  monthsShort: string[];
  
  /** Full weekday names in Italian */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names (2 letters) */
  weekdaysMin: string[];
  
  /** Long date format patterns */
  longDateFormat: {
    /** Time format (hours:minutes) */
    LT: string;
    /** Time with seconds format */
    LTS: string;
    /** Short date format (DD.MM.YYYY) */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date with time format */
    LLL: string;
    /** Full date with weekday and time */
    LLLL: string;
  };
  
  /** Calendar display strings for relative dates */
  calendar: {
    /** Format for today */
    sameDay: string;
    /** Format for tomorrow */
    nextDay: string;
    /** Format for next week */
    nextWeek: string;
    /** Format for yesterday */
    lastDay: string;
    /** Function to format last week based on day of week */
    lastWeek: (this: moment.Moment) => string;
    /** Format for other dates */
    sameElse: string;
  };
  
  /** Relative time expressions */
  relativeTime: {
    /** Function to format future time expressions */
    future: (relativeTime: string) => string;
    /** Format for past time */
    past: string;
    /** Label for "a few seconds" */
    s: string;
    /** Format for multiple seconds */
    ss: string;
    /** Label for "one minute" */
    m: string;
    /** Format for multiple minutes */
    mm: string;
    /** Label for "one hour" */
    h: string;
    /** Format for multiple hours */
    hh: string;
    /** Label for "one day" */
    d: string;
    /** Format for multiple days */
    dd: string;
    /** Label for "one month" */
    M: string;
    /** Format for multiple months */
    MM: string;
    /** Label for "one year" */
    y: string;
    /** Format for multiple years */
    yy: string;
  };
  
  /** Regular expression pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function or string to format ordinal numbers */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines the Italian (Switzerland) locale for moment.js
 * @param moment - The moment.js instance
 * @returns The configured locale object
 */
export function defineItChLocale(moment: typeof import('moment')): Locale;

/**
 * Italian (Switzerland) locale module
 * Can be imported and used with moment.js to enable it-CH localization
 */
declare const itChLocale: Locale;

export default itChLocale;