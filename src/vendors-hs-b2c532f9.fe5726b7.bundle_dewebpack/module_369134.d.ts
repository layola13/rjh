/**
 * Moment.js Italian (it) locale configuration
 * 
 * Defines localization settings for Italian language including:
 * - Month and weekday names
 * - Date/time formatting patterns
 * - Relative time expressions
 * - Calendar display rules
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for Italian locale
 */
interface ItalianLocaleConfig extends LocaleSpecification {
  /** Full month names in Italian */
  months: string[];
  
  /** Abbreviated month names (3 letters) */
  monthsShort: string[];
  
  /** Full weekday names in Italian */
  weekdays: string[];
  
  /** Abbreviated weekday names (3 letters) */
  weekdaysShort: string[];
  
  /** Minimal weekday names (2 letters) */
  weekdaysMin: string[];
  
  /** Long date format patterns */
  longDateFormat: {
    /** Time format (24-hour) */
    LT: string;
    /** Time format with seconds */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date with time */
    LLL: string;
    /** Full date and time with weekday */
    LLLL: string;
  };
  
  /** Calendar display configuration */
  calendar: {
    /** Format for today's dates */
    sameDay: (this: moment.Moment) => string;
    /** Format for tomorrow's dates */
    nextDay: (this: moment.Moment) => string;
    /** Format for next week dates */
    nextWeek: (this: moment.Moment) => string;
    /** Format for yesterday's dates */
    lastDay: (this: moment.Moment) => string;
    /** Format for last week dates */
    lastWeek: (this: moment.Moment) => string;
    /** Default format for other dates */
    sameElse: string;
  };
  
  /** Relative time expressions */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time suffix */
    past: string;
    /** Few seconds ago */
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
    /** One week */
    w: string;
    /** Weeks (plural) */
    ww: string;
    /** One month */
    M: string;
    /** Months (plural) */
    MM: string;
    /** One year */
    y: string;
    /** Years (plural) */
    yy: string;
  };
  
  /** Pattern for parsing ordinal day numbers */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines and registers the Italian locale for moment.js
 * 
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured Italian locale
 */
export function defineItalianLocale(momentInstance: typeof moment): Locale;

/**
 * Italian locale configuration export
 */
declare const italianLocale: Locale;
export default italianLocale;