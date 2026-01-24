/**
 * Moment.js locale configuration for Northern Sami (se)
 * 
 * This module defines the locale settings for Northern Sami language,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module MomentLocaleSe
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for moment.js locale "se" (Northern Sami)
 */
export interface MomentLocaleSe extends LocaleSpecification {
  /**
   * Full month names in Northern Sami
   * From January to December
   */
  months: string[];

  /**
   * Abbreviated month names in Northern Sami
   * 4-character short forms
   */
  monthsShort: string[];

  /**
   * Full weekday names in Northern Sami
   * From Sunday to Saturday
   */
  weekdays: string[];

  /**
   * Abbreviated weekday names in Northern Sami
   * 4-character short forms
   */
  weekdaysShort: string[];

  /**
   * Minimal weekday names in Northern Sami
   * Single character representations
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
    /** Long date and time format */
    LLL: string;
    /** Full date and time format with weekday */
    LLLL: string;
  };

  /**
   * Calendar date formats for relative dates
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
    /** Format for other dates */
    sameElse: string;
  };

  /**
   * Relative time expressions
   */
  relativeTime: {
    /** Future time prefix/suffix */
    future: string;
    /** Past time prefix/suffix */
    past: string;
    /** Few seconds */
    s: string;
    /** Seconds (with number placeholder) */
    ss: string;
    /** One minute */
    m: string;
    /** Minutes (with number placeholder) */
    mm: string;
    /** One hour */
    h: string;
    /** Hours (with number placeholder) */
    hh: string;
    /** One day */
    d: string;
    /** Days (with number placeholder) */
    dd: string;
    /** One month */
    M: string;
    /** Months (with number placeholder) */
    MM: string;
    /** One year */
    y: string;
    /** Years (with number placeholder) */
    yy: string;
  };

  /**
   * Regular expression to parse day of month ordinal numbers
   */
  dayOfMonthOrdinalParse: RegExp;

  /**
   * Ordinal number formatter
   * @param num - The number to format
   */
  ordinal: string;

  /**
   * Week configuration
   */
  week: {
    /** First day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** First day of year (1-7) */
    doy: number;
  };
}

/**
 * Defines and returns the Northern Sami locale configuration for moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The configured locale object
 */
export function defineLocaleSe(moment: typeof import('moment')): Locale;

/**
 * Northern Sami locale configuration
 * Can be imported and used with moment.js to support Northern Sami language formatting
 */
declare const localeSe: Locale;

export default localeSe;