/**
 * Moment.js locale configuration for Sinhala (Sri Lanka)
 * @module moment/locale/si
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Meridiem parse result type
 */
type MeridiemType = 'පෙර වරු' | 'පස් වරු' | 'පෙ.ව' | 'ප.ව.';

/**
 * Sinhala locale configuration for moment.js
 */
export interface SinhalaLocaleConfig extends LocaleSpecification {
  /**
   * Full month names in Sinhala
   */
  months: string[];

  /**
   * Abbreviated month names in Sinhala
   */
  monthsShort: string[];

  /**
   * Full weekday names in Sinhala
   */
  weekdays: string[];

  /**
   * Abbreviated weekday names in Sinhala
   */
  weekdaysShort: string[];

  /**
   * Minimal weekday names in Sinhala
   */
  weekdaysMin: string[];

  /**
   * Use exact parsing for weekdays
   */
  weekdaysParseExact: boolean;

  /**
   * Long date format tokens
   */
  longDateFormat: {
    /** Time format (e.g., "a h:mm") */
    LT: string;
    /** Time with seconds format (e.g., "a h:mm:ss") */
    LTS: string;
    /** Short date format (e.g., "YYYY/MM/DD") */
    L: string;
    /** Long date format (e.g., "YYYY MMMM D") */
    LL: string;
    /** Long date with time (e.g., "YYYY MMMM D, a h:mm") */
    LLL: string;
    /** Full date with weekday and time */
    LLLL: string;
  };

  /**
   * Calendar format strings for relative dates
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
   * Relative time format strings
   */
  relativeTime: {
    /** Future time prefix/suffix */
    future: string;
    /** Past time prefix/suffix */
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
   * Regex pattern for parsing ordinal day of month
   */
  dayOfMonthOrdinalParse: RegExp;

  /**
   * Returns ordinal string for a given number
   * @param dayOfMonth - Day of the month (1-31)
   * @returns Ordinal string in Sinhala
   */
  ordinal(dayOfMonth: number): string;

  /**
   * Regex pattern for parsing meridiem (AM/PM)
   */
  meridiemParse: RegExp;

  /**
   * Determines if a meridiem string represents PM
   * @param meridiemString - Meridiem string to check
   * @returns True if PM, false if AM
   */
  isPM(meridiemString: string): boolean;

  /**
   * Returns appropriate meridiem string based on hour
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase/abbreviated form
   * @returns Appropriate meridiem string in Sinhala
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
}

/**
 * Defines and registers the Sinhala locale with moment.js
 * @param moment - Moment.js instance
 * @returns The registered locale
 */
export function defineLocale(moment: typeof import('moment')): Locale;

declare module 'moment' {
  interface Locales {
    si: SinhalaLocaleConfig;
  }
}