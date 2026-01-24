/**
 * Moment.js locale configuration for Yoruba (yo)
 * 
 * This module provides locale-specific configuration for the Yoruba language,
 * including month names, weekday names, date formats, and relative time expressions.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for Yoruba locale
 */
interface YorubaLocaleConfig extends LocaleSpecification {
  /**
   * Full month names in Yoruba
   */
  months: string[];
  
  /**
   * Abbreviated month names in Yoruba
   */
  monthsShort: string[];
  
  /**
   * Full weekday names in Yoruba
   */
  weekdays: string[];
  
  /**
   * Abbreviated weekday names in Yoruba
   */
  weekdaysShort: string[];
  
  /**
   * Minimal weekday names in Yoruba
   */
  weekdaysMin: string[];
  
  /**
   * Long date format tokens
   */
  longDateFormat: {
    /** Time format (e.g., "3:25 PM") */
    LT: string;
    /** Time with seconds format (e.g., "3:25:50 PM") */
    LTS: string;
    /** Numeric date format (e.g., "15/03/2023") */
    L: string;
    /** Long date format (e.g., "15 March 2023") */
    LL: string;
    /** Long date and time format (e.g., "15 March 2023 3:25 PM") */
    LLL: string;
    /** Full date and time format (e.g., "Wednesday, 15 March 2023 3:25 PM") */
    LLLL: string;
  };
  
  /**
   * Calendar format strings for different relative dates
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
    /** Format for all other dates */
    sameElse: string;
  };
  
  /**
   * Relative time format strings
   */
  relativeTime: {
    /** Future time prefix (e.g., "in %s") */
    future: string;
    /** Past time suffix (e.g., "%s ago") */
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
  
  /**
   * Regular expression for parsing ordinal day of month
   */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Function or string template for formatting ordinal numbers
   */
  ordinal: string;
  
  /**
   * Week configuration
   */
  week: {
    /** Day of week (0 = Sunday, 1 = Monday, etc.) */
    dow: number;
    /** Day of year for the first week */
    doy: number;
  };
}

/**
 * Defines and returns the Yoruba locale configuration for Moment.js
 * 
 * @param moment - The Moment.js instance to configure
 * @returns The configured Yoruba locale
 */
export function defineYorubaLocale(moment: typeof import('moment')): Locale;

/**
 * Default export: Yoruba locale configuration
 */
declare const yorubaLocale: YorubaLocaleConfig;
export default yorubaLocale;