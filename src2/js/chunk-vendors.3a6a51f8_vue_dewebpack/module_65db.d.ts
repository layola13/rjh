/**
 * Moment.js locale configuration for Esperanto (eo)
 * 
 * This module provides locale-specific strings and formatting rules
 * for the Esperanto language in moment.js
 * 
 * @module moment-locale-eo
 * @requires moment
 */

/**
 * Locale configuration object for Esperanto
 */
export interface EsperantoLocaleConfig {
  /**
   * Full month names in Esperanto
   */
  months: string[];
  
  /**
   * Abbreviated month names in Esperanto
   */
  monthsShort: string[];
  
  /**
   * Full weekday names in Esperanto
   */
  weekdays: string[];
  
  /**
   * Abbreviated weekday names in Esperanto
   */
  weekdaysShort: string[];
  
  /**
   * Minimal weekday abbreviations in Esperanto
   */
  weekdaysMin: string[];
  
  /**
   * Long date format patterns
   */
  longDateFormat: {
    /** Time format (24-hour) */
    LT: string;
    /** Time format with seconds */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date with time format */
    LLL: string;
    /** Full date and time format */
    LLLL: string;
    /** Abbreviated full format */
    llll: string;
  };
  
  /**
   * Regular expression to parse AM/PM indicators (a.t.m/p.t.m in Esperanto)
   */
  meridiemParse: RegExp;
  
  /**
   * Determines if a given meridiem string represents PM (afternoon)
   * @param meridiemString - The meridiem indicator string
   * @returns True if PM, false if AM
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Returns the appropriate meridiem string for a given time
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour
   * @param isLowercase - Whether to return lowercase format
   * @returns Meridiem string (A.T.M. or P.T.M.)
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
  
  /**
   * Calendar display formats for relative dates
   */
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
  
  /**
   * Relative time strings and formats
   */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time prefix */
    past: string;
    /** A few seconds */
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
    /** One month */
    M: string;
    /** Months (plural) */
    MM: string;
    /** One year */
    y: string;
    /** Years (plural) */
    yy: string;
  };
  
  /**
   * Regular expression to parse ordinal day numbers (e.g., "1a", "2a")
   */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Format string for ordinal numbers
   */
  ordinal: string;
  
  /**
   * Week configuration
   */
  week: {
    /** First day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** First week of year calculation offset */
    doy: number;
  };
}

/**
 * Moment.js instance with locale definition capabilities
 */
export interface MomentWithLocale {
  /**
   * Defines a new locale configuration
   * @param localeKey - Locale identifier code
   * @param config - Locale configuration object
   */
  defineLocale(localeKey: string, config: EsperantoLocaleConfig): void;
}

/**
 * Initializes the Esperanto locale for moment.js
 * @param moment - The moment.js instance
 */
export default function defineEsperantoLocale(moment: MomentWithLocale): void;