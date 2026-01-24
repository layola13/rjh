import { Locale, LocaleSpecification } from 'moment';

/**
 * Moment.js locale configuration for Swedish (sv)
 * 
 * This module defines the Swedish locale settings for Moment.js, including
 * month names, weekday names, date formats, and relative time strings.
 * 
 * @module moment/locale/sv
 */

/**
 * Swedish locale configuration object
 */
export interface SwedishLocaleConfig extends LocaleSpecification {
  /** Full month names in Swedish */
  months: string[];
  
  /** Abbreviated month names in Swedish */
  monthsShort: string[];
  
  /** Full weekday names in Swedish */
  weekdays: string[];
  
  /** Abbreviated weekday names in Swedish */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Swedish */
  weekdaysMin: string[];
  
  /** Long date format patterns */
  longDateFormat: {
    /** Time format (HH:mm) */
    LT: string;
    /** Time with seconds format (HH:mm:ss) */
    LTS: string;
    /** Short date format (YYYY-MM-DD) */
    L: string;
    /** Long date format (D MMMM YYYY) */
    LL: string;
    /** Long date with time format (D MMMM YYYY [kl.] HH:mm) */
    LLL: string;
    /** Full date with weekday and time (dddd D MMMM YYYY [kl.] HH:mm) */
    LLLL: string;
    /** Short long date with time (D MMM YYYY HH:mm) */
    lll: string;
    /** Short full date with time (ddd D MMM YYYY HH:mm) */
    llll: string;
  };
  
  /** Calendar format strings for relative dates */
  calendar: {
    /** Format for today */
    sameDay: string;
    /** Format for tomorrow */
    nextDay: string;
    /** Format for yesterday */
    lastDay: string;
    /** Format for next week */
    nextWeek: string;
    /** Format for last week */
    lastWeek: string;
    /** Format for other dates */
    sameElse: string;
  };
  
  /** Relative time format strings */
  relativeTime: {
    /** Future time format (om %s) */
    future: string;
    /** Past time format (för %s sedan) */
    past: string;
    /** Seconds format (några sekunder) */
    s: string;
    /** Multiple seconds format (%d sekunder) */
    ss: string;
    /** Single minute format (en minut) */
    m: string;
    /** Multiple minutes format (%d minuter) */
    mm: string;
    /** Single hour format (en timme) */
    h: string;
    /** Multiple hours format (%d timmar) */
    hh: string;
    /** Single day format (en dag) */
    d: string;
    /** Multiple days format (%d dagar) */
    dd: string;
    /** Single month format (en månad) */
    M: string;
    /** Multiple months format (%d månader) */
    MM: string;
    /** Single year format (ett år) */
    y: string;
    /** Multiple years format (%d år) */
    yy: string;
  };
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Function to generate ordinal number suffix
   * @param dayOfMonth - The day of month number
   * @returns The day number with Swedish ordinal suffix (:e or :a)
   */
  ordinal: (dayOfMonth: number) => string;
  
  /** Week configuration */
  week: {
    /** Day of week (Monday = 1) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines and registers the Swedish locale with Moment.js
 * 
 * @param moment - The Moment.js instance
 * @returns The registered Swedish locale
 */
declare function defineSwedishLocale(moment: typeof import('moment')): Locale;

export default defineSwedishLocale;