/**
 * Moment.js locale configuration for Arabic (Morocco)
 * Defines date/time formatting rules, month names, weekday names, and relative time strings
 * following Moroccan Arabic conventions.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Locale configuration object for Moroccan Arabic (ar-ma)
 */
export interface ArMaLocaleConfig extends LocaleSpecification {
  /** Full month names in Moroccan Arabic */
  months: string[];
  
  /** Abbreviated month names in Moroccan Arabic */
  monthsShort: string[];
  
  /** Full weekday names in Moroccan Arabic */
  weekdays: string[];
  
  /** Abbreviated weekday names in Moroccan Arabic */
  weekdaysShort: string[];
  
  /** Minimal weekday names (single character) in Moroccan Arabic */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekday names */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (HH:mm) */
    LT: string;
    /** Time format with seconds (HH:mm:ss) */
    LTS: string;
    /** Short date format (DD/MM/YYYY) */
    L: string;
    /** Long date format (D MMMM YYYY) */
    LL: string;
    /** Long date with time format (D MMMM YYYY HH:mm) */
    LLL: string;
    /** Full date with weekday and time format (dddd D MMMM YYYY HH:mm) */
    LLLL: string;
  };
  
  /** Calendar-specific date formatting rules */
  calendar: {
    /** Format for dates that fall on today */
    sameDay: string;
    /** Format for dates that fall on tomorrow */
    nextDay: string;
    /** Format for dates in the next week */
    nextWeek: string;
    /** Format for dates that fell on yesterday */
    lastDay: string;
    /** Format for dates in the last week */
    lastWeek: string;
    /** Format for all other dates */
    sameElse: string;
  };
  
  /** Relative time formatting rules */
  relativeTime: {
    /** Future time prefix template */
    future: string;
    /** Past time prefix template */
    past: string;
    /** Few seconds label */
    s: string;
    /** Seconds label (with count placeholder) */
    ss: string;
    /** One minute label */
    m: string;
    /** Minutes label (with count placeholder) */
    mm: string;
    /** One hour label */
    h: string;
    /** Hours label (with count placeholder) */
    hh: string;
    /** One day label */
    d: string;
    /** Days label (with count placeholder) */
    dd: string;
    /** One month label */
    M: string;
    /** Months label (with count placeholder) */
    MM: string;
    /** One year label */
    y: string;
    /** Years label (with count placeholder) */
    yy: string;
  };
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year used to determine first week of year */
    doy: number;
  };
}

/**
 * Defines and registers the Moroccan Arabic locale with moment.js
 * 
 * @param moment - The moment.js instance to configure
 * @returns The configured locale object
 */
export function defineArMaLocale(moment: typeof import('moment')): Locale;

/**
 * The configured Moroccan Arabic locale
 * Can be used via moment.locale('ar-ma')
 */
declare const arMaLocale: Locale;

export default arMaLocale;