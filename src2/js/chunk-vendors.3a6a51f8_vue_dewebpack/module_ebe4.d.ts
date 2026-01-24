/**
 * Moment.js locale configuration for Malay (ms)
 * 
 * This module provides localization settings for the Malay language,
 * including month names, weekday names, date formats, and relative time expressions.
 */

import { Locale, MomentInput } from 'moment';

/**
 * Meridiem period types in Malay
 */
type MeridiemPeriod = 'pagi' | 'tengahari' | 'petang' | 'malam';

/**
 * Configuration object for the Malay locale
 */
interface MalayLocaleConfig {
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
   * Long date format tokens and their patterns
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
    /** Full date with weekday and time format */
    LLLL: string;
  };

  /**
   * Regular expression to parse meridiem periods
   */
  meridiemParse: RegExp;

  /**
   * Converts 12-hour format to 24-hour format based on meridiem period
   * 
   * @param hour - Hour in 12-hour format (0-12)
   * @param meridiem - Meridiem period (pagi/tengahari/petang/malam)
   * @returns Hour in 24-hour format (0-23) or undefined if invalid
   */
  meridiemHour(hour: number, meridiem: MeridiemPeriod): number | undefined;

  /**
   * Determines the meridiem period based on hour and minute
   * 
   * @param hour - Hour in 24-hour format (0-23)
   * @param minute - Minute (0-59)
   * @param isLowercase - Whether to return lowercase meridiem
   * @returns Meridiem period string
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): MeridiemPeriod;

  /**
   * Calendar format strings for different relative time periods
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
   * Relative time format strings
   */
  relativeTime: {
    /** Future time prefix format */
    future: string;
    /** Past time suffix format */
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
   * Week configuration
   */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Moment.js instance with locale definition capability
 */
interface MomentWithLocale {
  /**
   * Defines a new locale configuration
   * 
   * @param localeName - The locale identifier (e.g., "ms" for Malay)
   * @param config - The locale configuration object
   * @returns The defined locale or null if definition failed
   */
  defineLocale(localeName: string, config: MalayLocaleConfig): Locale | null;
}

/**
 * Registers the Malay locale with moment.js
 * 
 * @param moment - Moment.js instance
 */
export default function registerMalayLocale(moment: MomentWithLocale): void;