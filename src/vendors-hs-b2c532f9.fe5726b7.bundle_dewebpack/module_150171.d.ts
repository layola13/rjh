/**
 * Moment.js locale configuration for Norwegian Nynorsk (nn)
 * 
 * This module defines localization settings for the Norwegian Nynorsk language,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module MomentLocaleNorwegianNynorsk
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for Norwegian Nynorsk locale
 */
interface NorwegianNynorskLocaleConfig extends LocaleSpecification {
  /** Full month names in Norwegian Nynorsk */
  months: string[];
  
  /** Abbreviated month names in Norwegian Nynorsk */
  monthsShort: string[];
  
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  
  /** Full weekday names in Norwegian Nynorsk */
  weekdays: string[];
  
  /** Abbreviated weekday names in Norwegian Nynorsk */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Norwegian Nynorsk */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (Hours:Minutes) */
    LT: string;
    /** Time format with seconds (Hours:Minutes:Seconds) */
    LTS: string;
    /** Short date format (Day.Month.Year) */
    L: string;
    /** Long date format (Day Month Year) */
    LL: string;
    /** Long date and time format */
    LLL: string;
    /** Full date and time format with weekday */
    LLLL: string;
  };
  
  /** Calendar expressions for relative dates */
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
  
  /** Relative time expressions */
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
  
  /** Regular expression for parsing ordinal day of month */
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
 * Defines the Norwegian Nynorsk locale configuration for Moment.js
 * 
 * @param moment - The Moment.js instance
 * @returns The configured Norwegian Nynorsk locale
 */
export declare function defineNorwegianNynorskLocale(moment: typeof import('moment')): Locale;

/**
 * Norwegian Nynorsk locale configuration object
 */
export declare const norwegianNynorskLocale: NorwegianNynorskLocaleConfig;

export default defineNorwegianNynorskLocale;