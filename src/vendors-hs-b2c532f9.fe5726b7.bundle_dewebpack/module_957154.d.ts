/**
 * Moment.js locale configuration for Malayalam (ml)
 * @module moment-locale-ml
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Meridiem period type for Malayalam locale
 */
type MalayalamMeridiem = 'രാത്രി' | 'രാവിലെ' | 'ഉച്ച കഴിഞ്ഞ്' | 'വൈകുന്നേരം';

/**
 * Malayalam locale configuration interface
 */
interface MalayalamLocaleConfig extends LocaleSpecification {
  /** Full month names in Malayalam */
  months: string[];
  
  /** Abbreviated month names in Malayalam */
  monthsShort: string[];
  
  /** Enable exact month parsing */
  monthsParseExact: boolean;
  
  /** Full weekday names in Malayalam */
  weekdays: string[];
  
  /** Abbreviated weekday names in Malayalam */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Malayalam */
  weekdaysMin: string[];
  
  /** Long date format patterns */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  
  /** Calendar format patterns for relative dates */
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  
  /** Relative time format strings */
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: string;
    m: string;
    mm: string;
    h: string;
    hh: string;
    d: string;
    dd: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
  };
  
  /** Regular expression to parse meridiem periods */
  meridiemParse: RegExp;
  
  /**
   * Convert meridiem hour to 24-hour format
   * @param hour - Hour value (0-12)
   * @param meridiem - Malayalam meridiem string
   * @returns Hour in 24-hour format
   */
  meridiemHour(hour: number, meridiem: string): number;
  
  /**
   * Get meridiem string for given time
   * @param hour - Hour of day (0-23)
   * @param minute - Minute of hour (0-59)
   * @param isLowercase - Whether to return lowercase format
   * @returns Malayalam meridiem string
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): MalayalamMeridiem;
}

/**
 * Define and register Malayalam locale for moment.js
 * @param momentInstance - Moment.js instance
 * @returns Configured locale instance
 */
export default function defineMalayalamLocale(momentInstance: typeof import('moment')): Locale;