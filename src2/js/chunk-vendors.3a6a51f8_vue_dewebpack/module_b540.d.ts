/**
 * Moment.js locale configuration for Javanese (jv)
 * 
 * This module defines the Javanese locale settings for moment.js,
 * including month names, weekday names, date formats, and relative time strings.
 */

import { Locale, MomentInput } from 'moment';

/**
 * Meridiem period type in Javanese
 * - enjing: morning
 * - siyang: midday/afternoon
 * - sonten: evening
 * - ndalu: night
 */
type JavaneseMeridiem = 'enjing' | 'siyang' | 'sonten' | 'ndalu';

/**
 * Javanese locale configuration interface
 */
interface JavaneseLocaleConfig {
  /** Full month names in Javanese */
  months: string[];
  
  /** Abbreviated month names in Javanese */
  monthsShort: string[];
  
  /** Full weekday names in Javanese */
  weekdays: string[];
  
  /** Abbreviated weekday names in Javanese */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Javanese */
  weekdaysMin: string[];
  
  /** Long date format templates */
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
  
  /** Regular expression to parse Javanese meridiem periods */
  meridiemParse: RegExp;
  
  /**
   * Convert meridiem period to 24-hour format
   * @param hour - Hour in 12-hour format
   * @param meridiem - Javanese meridiem period
   * @returns Hour in 24-hour format
   */
  meridiemHour(hour: number, meridiem: JavaneseMeridiem): number | undefined;
  
  /**
   * Get meridiem period for given time
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase string
   * @returns Javanese meridiem period
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): JavaneseMeridiem;
  
  /** Calendar format strings for relative dates */
  calendar: {
    /** Format for same day */
    sameDay: string;
    /** Format for next day */
    nextDay: string;
    /** Format for next week */
    nextWeek: string;
    /** Format for previous day */
    lastDay: string;
    /** Format for previous week */
    lastWeek: string;
    /** Format for other dates */
    sameElse: string;
  };
  
  /** Relative time format strings */
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
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Define and register the Javanese locale for moment.js
 * @param moment - Moment.js instance
 * @returns The defined Javanese locale
 */
export function defineJavaneseLocale(moment: {
  defineLocale(locale: string, config: JavaneseLocaleConfig): Locale;
}): Locale;

export default JavaneseLocaleConfig;