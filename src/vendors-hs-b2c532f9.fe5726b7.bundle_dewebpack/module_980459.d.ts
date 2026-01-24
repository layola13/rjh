/**
 * Moment.js locale configuration for Arabic (Tunisia)
 * Defines date/time formatting, calendar labels, and relative time strings
 * for the ar-tn (Arabic - Tunisia) locale.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for Arabic (Tunisia) locale
 */
export interface ArTnLocaleConfig extends LocaleSpecification {
  /** Full month names in Arabic (Tunisian dialect) */
  months: string[];
  
  /** Abbreviated month names in Arabic (Tunisian dialect) */
  monthsShort: string[];
  
  /** Full weekday names in Arabic */
  weekdays: string[];
  
  /** Abbreviated weekday names in Arabic */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Arabic (single character) */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
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
    /** Full date with weekday and time */
    LLLL: string;
  };
  
  /** Calendar-relative date labels */
  calendar: {
    /** Label for today */
    sameDay: string;
    /** Label for tomorrow */
    nextDay: string;
    /** Label for next week */
    nextWeek: string;
    /** Label for yesterday */
    lastDay: string;
    /** Label for last week */
    lastWeek: string;
    /** Fallback format */
    sameElse: string;
  };
  
  /** Relative time formatting rules */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time prefix */
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
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines and registers the Arabic (Tunisia) locale with moment.js
 * @param moment - The moment.js instance to configure
 * @returns The configured locale instance
 */
export function defineArTnLocale(moment: typeof import('moment')): Locale;

/**
 * The default export is the configured locale
 */
declare const arTnLocale: Locale;
export default arTnLocale;