/**
 * Moment.js locale configuration for Uzbek (Latin script)
 * 
 * This module defines locale-specific settings for formatting dates and times
 * in Uzbek using the Latin alphabet.
 * 
 * @module uz-latn
 */

import { Moment, Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for the Uzbek (Latin) locale
 */
interface UzLatnLocaleSpecification extends LocaleSpecification {
  /** Full month names in Uzbek (Latin) */
  months: string[];
  
  /** Abbreviated month names in Uzbek (Latin) */
  monthsShort: string[];
  
  /** Full weekday names in Uzbek (Latin) */
  weekdays: string[];
  
  /** Abbreviated weekday names in Uzbek (Latin) */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Uzbek (Latin) */
  weekdaysMin: string[];
  
  /** Date and time format patterns */
  longDateFormat: {
    /** Time format (24-hour) */
    LT: string;
    /** Time format with seconds */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date and time format */
    LLL: string;
    /** Full date and time format with weekday */
    LLLL: string;
  };
  
  /** Calendar-specific relative time labels */
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
  
  /** Relative time labels and formats */
  relativeTime: {
    /** Format for future dates (%s will be replaced with the time unit) */
    future: string;
    /** Format for past dates (%s will be replaced with the time unit) */
    past: string;
    /** Label for seconds (singular) */
    s: string;
    /** Label for seconds (plural, %d will be replaced with the number) */
    ss: string;
    /** Label for minute (singular) */
    m: string;
    /** Label for minutes (plural, %d will be replaced with the number) */
    mm: string;
    /** Label for hour (singular) */
    h: string;
    /** Label for hours (plural, %d will be replaced with the number) */
    hh: string;
    /** Label for day (singular) */
    d: string;
    /** Label for days (plural, %d will be replaced with the number) */
    dd: string;
    /** Label for month (singular) */
    M: string;
    /** Label for months (plural, %d will be replaced with the number) */
    MM: string;
    /** Label for year (singular) */
    y: string;
    /** Label for years (plural, %d will be replaced with the number) */
    yy: string;
  };
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday, etc.) */
    dow: number;
    /** Day of year that starts the first week */
    doy: number;
  };
}

/**
 * Defines and registers the Uzbek (Latin) locale with Moment.js
 * 
 * @param moment - The Moment.js instance
 * @returns The registered Locale object
 */
export function defineUzLatnLocale(moment: typeof Moment): Locale;

/**
 * The Uzbek (Latin) locale configuration
 */
export const uzLatnLocale: UzLatnLocaleSpecification;

export default uzLatnLocale;