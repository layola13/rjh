/**
 * Moment.js locale configuration for Arabic (Kuwait)
 * Configures date/time formatting, calendar labels, and relative time strings for the ar-kw locale
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for Arabic (Kuwait) locale
 */
export interface ArKwLocaleConfig extends LocaleSpecification {
  /** Full month names in Arabic (Kuwait dialect) */
  months: string[];
  
  /** Abbreviated month names in Arabic (Kuwait dialect) */
  monthsShort: string[];
  
  /** Full weekday names in Arabic */
  weekdays: string[];
  
  /** Abbreviated weekday names in Arabic */
  weekdaysShort: string[];
  
  /** Minimal weekday names (single character) in Arabic */
  weekdaysMin: string[];
  
  /** Use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
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
    /** Long date format with time */
    LLL: string;
    /** Full date format with weekday and time */
    LLLL: string;
  };
  
  /** Calendar-relative date labels */
  calendar: {
    /** Label for today with time */
    sameDay: string;
    /** Label for tomorrow with time */
    nextDay: string;
    /** Label for next week with time */
    nextWeek: string;
    /** Label for yesterday with time */
    lastDay: string;
    /** Label for last week with time */
    lastWeek: string;
    /** Fallback format for other dates */
    sameElse: string;
  };
  
  /** Relative time labels and patterns */
  relativeTime: {
    /** Future time prefix template */
    future: string;
    /** Past time prefix template */
    past: string;
    /** Seconds (singular) */
    s: string;
    /** Seconds (plural) template */
    ss: string;
    /** Minute (singular) */
    m: string;
    /** Minutes (plural) template */
    mm: string;
    /** Hour (singular) */
    h: string;
    /** Hours (plural) template */
    hh: string;
    /** Day (singular) */
    d: string;
    /** Days (plural) template */
    dd: string;
    /** Month (singular) */
    M: string;
    /** Months (plural) template */
    MM: string;
    /** Year (singular) */
    y: string;
    /** Years (plural) template */
    yy: string;
  };
  
  /** Week configuration */
  week: {
    /** First day of week (0 = Sunday) */
    dow: number;
    /** First week of year configuration */
    doy: number;
  };
}

/**
 * Defines the Arabic (Kuwait) locale configuration for moment.js
 * @param moment - The moment.js instance
 * @returns The configured locale object
 */
export declare function defineArKwLocale(moment: any): Locale;

/**
 * Arabic (Kuwait) locale configuration
 */
export declare const arKwLocale: ArKwLocaleConfig;

export default defineArKwLocale;