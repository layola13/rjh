/**
 * Moment.js locale configuration for Scottish Gaelic (gd)
 * 
 * This module provides localization settings for the Scottish Gaelic language,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module moment-locale-gd
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Scottish Gaelic locale configuration object
 */
interface ScottishGaelicLocaleConfig extends LocaleSpecification {
  /** Full month names in Scottish Gaelic */
  months: string[];
  
  /** Abbreviated month names in Scottish Gaelic */
  monthsShort: string[];
  
  /** Whether to use exact parsing for month names */
  monthsParseExact: boolean;
  
  /** Full weekday names in Scottish Gaelic */
  weekdays: string[];
  
  /** Abbreviated weekday names in Scottish Gaelic */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Scottish Gaelic */
  weekdaysMin: string[];
  
  /** Long date format patterns */
  longDateFormat: {
    /** Time format (hours:minutes) */
    LT: string;
    /** Time format with seconds */
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
  
  /** Calendar display formats for relative dates */
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
    /** Future time prefix template */
    future: string;
    /** Past time prefix template */
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
  
  /** Regular expression for parsing day of month ordinals */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers */
  ordinal: (num: number) => string;
  
  /** Week settings */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines the Scottish Gaelic locale configuration for moment.js
 * 
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured locale object
 */
export function defineScottishGaelicLocale(momentInstance: typeof import('moment')): Locale;

/**
 * Get the ordinal suffix for a number in Scottish Gaelic
 * 
 * @param num - The number to get the ordinal for
 * @returns The number with appropriate Scottish Gaelic ordinal suffix
 * 
 * @example
 * getOrdinal(1)  // "1d"
 * getOrdinal(2)  // "2na"
 * getOrdinal(5)  // "5mh"
 */
export function getOrdinal(num: number): string;

declare module 'moment' {
  interface Moment {
    /**
     * Scottish Gaelic locale is available as 'gd'
     */
    locale(language: 'gd'): Moment;
  }
}