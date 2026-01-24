/**
 * Moment.js locale configuration for Javanese (jv)
 * 
 * This module provides localization support for Javanese language in moment.js,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module moment-locale-jv
 */

import { Locale, MomentInput } from 'moment';

/**
 * Meridiem (time of day) periods in Javanese
 */
type JavaneseMeridiem = 'enjing' | 'siyang' | 'sonten' | 'ndalu';

/**
 * Locale configuration object for Javanese language
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
  
  /** Regular expression to parse Javanese meridiem strings */
  meridiemParse: RegExp;
  
  /**
   * Convert meridiem string and hour to 24-hour format
   * @param hour - Hour in 12-hour format
   * @param meridiem - Javanese time of day identifier
   * @returns Hour in 24-hour format
   */
  meridiemHour: (hour: number, meridiem: JavaneseMeridiem) => number | undefined;
  
  /**
   * Get meridiem string for given hour
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour
   * @param isLowercase - Whether to return lowercase string
   * @returns Javanese time of day identifier
   */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => JavaneseMeridiem;
  
  /** Calendar format strings for relative dates */
  calendar: {
    /** Format for same day */
    sameDay: string;
    /** Format for next day */
    nextDay: string;
    /** Format for next week */
    nextWeek: string;
    /** Format for last day */
    lastDay: string;
    /** Format for last week */
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
    /** Day of year for week calculation */
    doy: number;
  };
}

/**
 * Define and configure the Javanese locale for moment.js
 * 
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured locale object
 */
export function defineJavaneseLocale(momentInstance: {
  defineLocale(localeName: string, config: JavaneseLocaleConfig): Locale;
}): Locale;

export default defineJavaneseLocale;