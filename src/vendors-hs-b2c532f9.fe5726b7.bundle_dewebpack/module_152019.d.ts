/**
 * Moment.js locale configuration for Irish (Gaelic)
 * 
 * This module provides localization settings for the Irish language,
 * including month names, weekday names, date formats, and relative time strings.
 * 
 * @module moment-locale-ga
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for Irish (ga) locale
 */
interface IrishLocaleConfiguration extends LocaleSpecification {
  /** Full month names in Irish */
  months: string[];
  
  /** Abbreviated month names in Irish */
  monthsShort: string[];
  
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  
  /** Full weekday names in Irish */
  weekdays: string[];
  
  /** Abbreviated weekday names in Irish */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Irish */
  weekdaysMin: string[];
  
  /** Long date format tokens and their corresponding formats */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  
  /** Calendar format strings for relative dates */
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
    /** Default format for other dates */
    sameElse: string;
  };
  
  /** Relative time format strings */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time suffix */
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
  
  /** Function to generate ordinal suffix for a number */
  ordinal: (num: number) => string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year for week calculation */
    doy: number;
  };
}

/**
 * Defines and registers the Irish (ga) locale for Moment.js
 * 
 * @param moment - The Moment.js instance
 * @returns The registered locale object
 */
declare function defineIrishLocale(moment: typeof import('moment')): Locale;

/**
 * Irish locale configuration object
 */
export const irishLocaleConfig: IrishLocaleConfiguration;

export default defineIrishLocale;