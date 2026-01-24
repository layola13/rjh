/**
 * Moment.js locale configuration for Malay (Malaysia)
 * @module ms-my
 */

import { Locale, MomentInput } from 'moment';

/**
 * Meridiem period type for Malay locale
 */
type MeridiemPeriod = 'pagi' | 'tengahari' | 'petang' | 'malam';

/**
 * Locale configuration for Malaysian Malay (ms-my)
 */
export interface MsMyLocaleConfig {
  /**
   * Full month names in Malay
   */
  months: string[];

  /**
   * Abbreviated month names in Malay
   */
  monthsShort: string[];

  /**
   * Full weekday names in Malay
   */
  weekdays: string[];

  /**
   * Abbreviated weekday names in Malay
   */
  weekdaysShort: string[];

  /**
   * Minimal weekday names in Malay
   */
  weekdaysMin: string[];

  /**
   * Long date format tokens and their representations
   */
  longDateFormat: {
    /** Time format (HH.mm) */
    LT: string;
    /** Time with seconds format (HH.mm.ss) */
    LTS: string;
    /** Short date format (DD/MM/YYYY) */
    L: string;
    /** Long date format (D MMMM YYYY) */
    LL: string;
    /** Long date with time format */
    LLL: string;
    /** Full date and time format */
    LLLL: string;
  };

  /**
   * Regular expression to parse meridiem periods
   */
  meridiemParse: RegExp;

  /**
   * Convert 12-hour time to 24-hour based on meridiem period
   * @param hour - Hour in 12-hour format
   * @param meridiem - Meridiem period (pagi/tengahari/petang/malam)
   * @returns Hour in 24-hour format
   */
  meridiemHour(hour: number, meridiem: MeridiemPeriod): number | undefined;

  /**
   * Determine meridiem period based on hour and minute
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour
   * @param isLowercase - Whether to return lowercase meridiem
   * @returns Meridiem period string
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): MeridiemPeriod;

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
    /** Format for all other dates */
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
    /** A few seconds */
    s: string;
    /** Seconds (pluralized) */
    ss: string;
    /** A minute */
    m: string;
    /** Minutes (pluralized) */
    mm: string;
    /** An hour */
    h: string;
    /** Hours (pluralized) */
    hh: string;
    /** A day */
    d: string;
    /** Days (pluralized) */
    dd: string;
    /** A month */
    M: string;
    /** Months (pluralized) */
    MM: string;
    /** A year */
    y: string;
    /** Years (pluralized) */
    yy: string;
  };

  /**
   * Week configuration
   */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year for week calculation */
    doy: number;
  };
}

/**
 * Define and register the ms-my locale with Moment.js
 * @param moment - Moment.js instance
 * @returns The registered locale
 */
export function defineLocale(moment: typeof import('moment')): Locale;

export default defineLocale;