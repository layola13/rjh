/**
 * Moment.js locale configuration for Yoruba (yo)
 * 
 * This module provides localization settings for the Yoruba language,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module locale/yo
 */

import { Moment } from 'moment';

/**
 * Locale configuration object for Yoruba language
 */
export interface YorubaLocaleConfig {
  /**
   * Full month names in Yoruba
   * @example ["Sẹ́rẹ́", "Èrèlè", "Ẹrẹ̀nà", ...]
   */
  months: string[];
  
  /**
   * Abbreviated month names in Yoruba
   * @example ["Sẹ́r", "Èrl", "Ẹrn", ...]
   */
  monthsShort: string[];
  
  /**
   * Full weekday names in Yoruba
   * @example ["Àìkú", "Ajé", "Ìsẹ́gun", ...]
   */
  weekdays: string[];
  
  /**
   * Abbreviated weekday names in Yoruba
   * @example ["Àìk", "Ajé", "Ìsẹ́", ...]
   */
  weekdaysShort: string[];
  
  /**
   * Minimal weekday names in Yoruba
   * @example ["Àì", "Aj", "Ìs", ...]
   */
  weekdaysMin: string[];
  
  /**
   * Long date format tokens
   */
  longDateFormat: {
    /** Time format (e.g., "1:30 PM") */
    LT: string;
    /** Time with seconds format (e.g., "1:30:45 PM") */
    LTS: string;
    /** Short date format (e.g., "25/12/2023") */
    L: string;
    /** Long date format (e.g., "25 December 2023") */
    LL: string;
    /** Long date with time format */
    LLL: string;
    /** Full date and time format with weekday */
    LLLL: string;
  };
  
  /**
   * Calendar date formats for relative dates
   */
  calendar: {
    /** Format for today's date */
    sameDay: string;
    /** Format for tomorrow's date */
    nextDay: string;
    /** Format for dates in the next week */
    nextWeek: string;
    /** Format for yesterday's date */
    lastDay: string;
    /** Format for dates in the last week */
    lastWeek: string;
    /** Format for all other dates */
    sameElse: string;
  };
  
  /**
   * Relative time expressions
   */
  relativeTime: {
    /** Future time format template (e.g., "in %s") */
    future: string;
    /** Past time format template (e.g., "%s ago") */
    past: string;
    /** Seconds (singular, a few seconds) */
    s: string;
    /** Seconds (plural, %d seconds) */
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
   * Matches patterns like "ọjọ́ 1", "ọjọ́ 15", etc.
   */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Format string for ordinal numbers
   * @param num - The day number to format
   * @returns Formatted ordinal string (e.g., "ọjọ́ 1")
   */
  ordinal: string;
  
  /**
   * Week configuration
   */
  week: {
    /** Day of week (0=Sunday, 1=Monday) - Monday is first day */
    dow: number;
    /** Day of year for week calculation */
    doy: number;
  };
}

/**
 * Define and register the Yoruba locale configuration with moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The configured locale
 */
declare function defineYorubaLocale(moment: typeof Moment): void;

export default defineYorubaLocale;