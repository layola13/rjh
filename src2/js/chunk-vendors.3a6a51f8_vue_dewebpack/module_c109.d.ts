/**
 * Moment.js locale configuration for Central Atlas Tamazight (tzm)
 * 
 * This module provides localization support for the Tamazight language,
 * including month names, weekday names, date formats, and relative time expressions
 * written in Tifinagh script.
 * 
 * @module moment/locale/tzm
 */

import { Moment } from 'moment';

/**
 * Locale-specific configuration object for Tamazight (tzm)
 */
interface LocaleConfiguration {
  /**
   * Full month names in Tifinagh script
   */
  months: string[];
  
  /**
   * Abbreviated month names in Tifinagh script
   */
  monthsShort: string[];
  
  /**
   * Full weekday names in Tifinagh script
   */
  weekdays: string[];
  
  /**
   * Abbreviated weekday names in Tifinagh script
   */
  weekdaysShort: string[];
  
  /**
   * Minimal weekday names in Tifinagh script
   */
  weekdaysMin: string[];
  
  /**
   * Date and time format tokens
   */
  longDateFormat: LongDateFormatConfiguration;
  
  /**
   * Calendar-specific relative time strings
   */
  calendar: CalendarConfiguration;
  
  /**
   * Relative time format strings
   */
  relativeTime: RelativeTimeConfiguration;
  
  /**
   * Week configuration
   */
  week: WeekConfiguration;
}

/**
 * Long date format configuration with standard tokens
 */
interface LongDateFormatConfiguration {
  /** Time format (HH:mm) */
  LT: string;
  
  /** Time with seconds format (HH:mm:ss) */
  LTS: string;
  
  /** Short date format (DD/MM/YYYY) */
  L: string;
  
  /** Long date format (D MMMM YYYY) */
  LL: string;
  
  /** Long date with time format (D MMMM YYYY HH:mm) */
  LLL: string;
  
  /** Full date with time format (dddd D MMMM YYYY HH:mm) */
  LLLL: string;
}

/**
 * Calendar relative time configuration
 */
interface CalendarConfiguration {
  /** Format for today (same day) */
  sameDay: string;
  
  /** Format for tomorrow (next day) */
  nextDay: string;
  
  /** Format for next week */
  nextWeek: string;
  
  /** Format for yesterday (last day) */
  lastDay: string;
  
  /** Format for last week */
  lastWeek: string;
  
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time strings configuration
 */
interface RelativeTimeConfiguration {
  /** Future time prefix format */
  future: string;
  
  /** Past time format */
  past: string;
  
  /** Singular second */
  s: string;
  
  /** Plural seconds (with %d placeholder) */
  ss: string;
  
  /** Singular minute */
  m: string;
  
  /** Plural minutes (with %d placeholder) */
  mm: string;
  
  /** Singular hour */
  h: string;
  
  /** Plural hours (with %d placeholder) */
  hh: string;
  
  /** Singular day */
  d: string;
  
  /** Plural days (with %d placeholder) */
  dd: string;
  
  /** Singular month */
  M: string;
  
  /** Plural months (with %d placeholder) */
  MM: string;
  
  /** Singular year */
  y: string;
  
  /** Plural years (with %d placeholder) */
  yy: string;
}

/**
 * Week configuration for locale
 */
interface WeekConfiguration {
  /**
   * Day of week (0-6, where 0 is Sunday)
   * 6 = Saturday is the first day of the week
   */
  dow: number;
  
  /**
   * Day of year (1-366)
   * Used to calculate the first week of the year
   */
  doy: number;
}

/**
 * Moment.js instance with locale definition capability
 */
interface MomentStatic {
  /**
   * Define a new locale configuration
   * 
   * @param localeKey - The locale identifier (e.g., 'tzm')
   * @param config - The locale configuration object
   */
  defineLocale(localeKey: string, config: LocaleConfiguration): void;
}

/**
 * Initializes the Tamazight (tzm) locale for moment.js
 * 
 * @param moment - The moment.js instance to configure
 */
declare function initializeTzmLocale(moment: MomentStatic): void;

export { LocaleConfiguration, MomentStatic, initializeTzmLocale };