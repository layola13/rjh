/**
 * Moment.js locale configuration for Filipino (Tagalog)
 * Provides localized date/time formatting and relative time strings
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Locale configuration object for Filipino (fil) language
 */
export interface FilipinoLocaleConfig extends LocaleSpecification {
  /**
   * Full month names in Filipino
   * @example ["Enero", "Pebrero", "Marso", ...]
   */
  months: string[];

  /**
   * Abbreviated month names (3 letters)
   * @example ["Ene", "Peb", "Mar", ...]
   */
  monthsShort: string[];

  /**
   * Full weekday names in Filipino
   * @example ["Linggo", "Lunes", "Martes", ...]
   */
  weekdays: string[];

  /**
   * Abbreviated weekday names
   * @example ["Lin", "Lun", "Mar", ...]
   */
  weekdaysShort: string[];

  /**
   * Minimal weekday names (2 letters)
   * @example ["Li", "Lu", "Ma", ...]
   */
  weekdaysMin: string[];

  /**
   * Date and time format patterns
   */
  longDateFormat: {
    /** Time format: "HH:mm" */
    LT: string;
    /** Time with seconds format: "HH:mm:ss" */
    LTS: string;
    /** Short date format: "MM/D/YYYY" */
    L: string;
    /** Long date format: "MMMM D, YYYY" */
    LL: string;
    /** Long date with time: "MMMM D, YYYY HH:mm" */
    LLL: string;
    /** Full date with time: "dddd, MMMM DD, YYYY HH:mm" */
    LLLL: string;
  };

  /**
   * Calendar date formats for relative dates
   */
  calendar: {
    /** Same day format template */
    sameDay: string;
    /** Next day format template */
    nextDay: string;
    /** Next week format template */
    nextWeek: string;
    /** Previous day format template */
    lastDay: string;
    /** Previous week format template */
    lastWeek: string;
    /** Fallback format */
    sameElse: string;
  };

  /**
   * Relative time format strings
   */
  relativeTime: {
    /** Future time prefix template */
    future: string;
    /** Past time suffix template */
    past: string;
    /** Few seconds ago text */
    s: string;
    /** Seconds format with count placeholder */
    ss: string;
    /** Single minute text */
    m: string;
    /** Minutes format with count placeholder */
    mm: string;
    /** Single hour text */
    h: string;
    /** Hours format with count placeholder */
    hh: string;
    /** Single day text */
    d: string;
    /** Days format with count placeholder */
    dd: string;
    /** Single month text */
    M: string;
    /** Months format with count placeholder */
    MM: string;
    /** Single year text */
    y: string;
    /** Years format with count placeholder */
    yy: string;
  };

  /**
   * Regular expression to parse day-of-month ordinal numbers
   * Matches 1 or 2 digit numbers
   */
  dayOfMonthOrdinalParse: RegExp;

  /**
   * Function to format ordinal numbers
   * @param num - The number to format
   * @returns The formatted ordinal string
   */
  ordinal: (num: number) => string | number;

  /**
   * First day of week configuration
   */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year that defines first week of the year */
    doy: number;
  };
}

/**
 * Initializes and registers the Filipino locale with moment.js
 * @param moment - The moment.js instance
 * @returns The registered locale
 */
export function defineFilipino(moment: typeof import('moment')): Locale;

declare module 'moment' {
  /**
   * Filipino (Tagalog) locale identifier
   */
  interface Locales {
    fil: FilipinoLocaleConfig;
  }
}