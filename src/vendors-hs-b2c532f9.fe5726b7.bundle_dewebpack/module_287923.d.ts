/**
 * Moment.js Thai (th) locale configuration
 * Provides localization for dates, times, and relative time formatting in Thai language
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Thai locale configuration object
 * Defines months, weekdays, date formats, and relative time strings for Thai language
 */
export interface ThaiLocaleConfig extends LocaleSpecification {
  /** Full month names in Thai */
  months: string[];
  
  /** Abbreviated month names in Thai */
  monthsShort: string[];
  
  /** Whether to use exact month parsing */
  monthsParseExact: boolean;
  
  /** Full weekday names in Thai */
  weekdays: string[];
  
  /** Short weekday names in Thai */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Thai */
  weekdaysMin: string[];
  
  /** Whether to use exact weekday parsing */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (H:mm) */
    LT: string;
    /** Time with seconds format (H:mm:ss) */
    LTS: string;
    /** Short date format (DD/MM/YYYY) */
    L: string;
    /** Long date format (D MMMM YYYY) */
    LL: string;
    /** Long date with time format */
    LLL: string;
    /** Full date with weekday and time format */
    LLLL: string;
  };
  
  /** Regular expression to parse AM/PM in Thai */
  meridiemParse: RegExp;
  
  /** 
   * Determines if a given meridiem string represents PM
   * @param meridiemString - The meridiem string to check
   * @returns true if PM (หลังเที่ยง), false otherwise
   */
  isPM: (meridiemString: string) => boolean;
  
  /**
   * Returns the appropriate meridiem string for a given time
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour
   * @param isLowercase - Whether to return lowercase (unused in Thai)
   * @returns Thai meridiem string (ก่อนเที่ยง or หลังเที่ยง)
   */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  
  /** Calendar format strings for relative days */
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
  
  /** Relative time format strings */
  relativeTime: {
    /** Future time prefix template */
    future: string;
    /** Past time suffix template */
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
}

/**
 * Defines and registers the Thai locale with moment.js
 * @param moment - Moment.js instance
 * @returns The registered Thai locale
 */
export function defineThaiLocale(moment: typeof import('moment')): Locale;

/**
 * Thai locale instance for moment.js
 * Can be imported and used to set Thai localization
 */
declare const thaiLocale: Locale;

export default thaiLocale;