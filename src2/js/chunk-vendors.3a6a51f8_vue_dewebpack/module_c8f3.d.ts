/**
 * Moment.js locale configuration for Albanian (sq)
 * @module moment/locale/sq
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Albanian locale configuration interface
 * Extends the base LocaleSpecification with Albanian-specific settings
 */
interface AlbanianLocaleSpecification extends LocaleSpecification {
  /** Full month names in Albanian */
  months: string[];
  
  /** Abbreviated month names in Albanian */
  monthsShort: string[];
  
  /** Full weekday names in Albanian */
  weekdays: string[];
  
  /** Abbreviated weekday names in Albanian */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Albanian */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Regular expression to parse meridiem (AM/PM) indicators */
  meridiemParse: RegExp;
  
  /** 
   * Determines if a given meridiem string represents PM
   * @param meridiemString - The meridiem string to check (e.g., "PD" or "MD")
   * @returns true if the string represents PM (afternoon), false otherwise
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Returns the appropriate meridiem string for a given time
   * @param hour - The hour of the day (0-23)
   * @param minute - The minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase meridiem
   * @returns "PD" for morning (para dreke) or "MD" for afternoon (mbas dreke)
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
  
  /** Long date format tokens and their corresponding format strings */
  longDateFormat: {
    /** Time format (hours:minutes) */
    LT: string;
    
    /** Time format with seconds (hours:minutes:seconds) */
    LTS: string;
    
    /** Short date format (DD/MM/YYYY) */
    L: string;
    
    /** Long date format (Day Month Year) */
    LL: string;
    
    /** Long date and time format */
    LLL: string;
    
    /** Full date and time format with weekday */
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
    
    /** Format for all other dates */
    sameElse: string;
  };
  
  /** Relative time format strings */
  relativeTime: {
    /** Format for future dates */
    future: string;
    
    /** Format for past dates */
    past: string;
    
    /** Format for a few seconds */
    s: string;
    
    /** Format for seconds (plural) */
    ss: string;
    
    /** Format for one minute */
    m: string;
    
    /** Format for minutes (plural) */
    mm: string;
    
    /** Format for one hour */
    h: string;
    
    /** Format for hours (plural) */
    hh: string;
    
    /** Format for one day */
    d: string;
    
    /** Format for days (plural) */
    dd: string;
    
    /** Format for one month */
    M: string;
    
    /** Format for months (plural) */
    MM: string;
    
    /** Format for one year */
    y: string;
    
    /** Format for years (plural) */
    yy: string;
  };
  
  /** Regular expression to parse ordinal day of month (e.g., "1.", "2.") */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Formats a number as an ordinal
   * @param num - The number to format
   * @returns The formatted ordinal string
   */
  ordinal(num: number): string;
  
  /** Week configuration */
  week: {
    /** Day of week that starts the week (1 = Monday) */
    dow: number;
    
    /** Day of year that starts the first week of the year */
    doy: number;
  };
}

/**
 * Defines and registers the Albanian locale configuration with moment.js
 * @param localeKey - The locale identifier ("sq" for Albanian)
 * @param config - The Albanian locale configuration object
 * @returns The defined locale
 */
declare function defineLocale(localeKey: 'sq', config: AlbanianLocaleSpecification): Locale;

export { AlbanianLocaleSpecification, defineLocale };