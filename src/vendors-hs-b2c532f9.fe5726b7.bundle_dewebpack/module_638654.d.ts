/**
 * Moment.js Indonesian (Bahasa Indonesia) locale configuration
 * @module moment/locale/id
 */

import { Locale, MomentInput } from 'moment';

/**
 * Meridiem period type for Indonesian locale
 */
type MeridiemPeriod = 'pagi' | 'siang' | 'sore' | 'malam';

/**
 * Indonesian locale configuration interface
 */
interface IndonesianLocaleConfig {
  /** Full month names in Indonesian */
  months: string[];
  
  /** Abbreviated month names in Indonesian */
  monthsShort: string[];
  
  /** Full weekday names in Indonesian */
  weekdays: string[];
  
  /** Abbreviated weekday names in Indonesian */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Indonesian */
  weekdaysMin: string[];
  
  /** Long date format patterns */
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
    /** Full date with day and time format */
    LLLL: string;
  };
  
  /** Regular expression to parse meridiem periods */
  meridiemParse: RegExp;
  
  /**
   * Convert meridiem period to 24-hour format
   * @param hour - Hour in 12-hour format
   * @param meridiem - Indonesian meridiem period (pagi/siang/sore/malam)
   * @returns Hour in 24-hour format
   */
  meridiemHour: (hour: number, meridiem: MeridiemPeriod) => number | undefined;
  
  /**
   * Get Indonesian meridiem period for given time
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase string
   * @returns Indonesian meridiem period
   */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => MeridiemPeriod;
  
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
    /** Format for other dates */
    sameElse: string;
  };
  
  /** Relative time format strings */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time suffix */
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
  
  /** Week configuration */
  week: {
    /** Day of week (0 = Sunday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Define and register Indonesian locale for Moment.js
 * @param moment - Moment.js instance
 * @returns Configured Indonesian locale
 */
export function defineIndonesianLocale(moment: MomentInput): Locale;

/**
 * Indonesian locale configuration object
 */
export const indonesianLocale: IndonesianLocaleConfig;

export default indonesianLocale;