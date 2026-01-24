/**
 * Moment.js locale configuration for Bulgarian (bg)
 * @module moment-locale-bg
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Day of week enumeration for Bulgarian locale
 */
enum BulgarianDayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

/**
 * Ordinal suffix type for Bulgarian numbers
 */
type BulgarianOrdinalSuffix = 'ев' | 'ен' | 'ти' | 'ви' | 'ри' | 'ми';

/**
 * Bulgarian locale configuration for moment.js
 */
export interface BulgarianLocaleConfig extends LocaleSpecification {
  /** Full month names in Bulgarian */
  months: string[];
  
  /** Abbreviated month names in Bulgarian */
  monthsShort: string[];
  
  /** Full weekday names in Bulgarian */
  weekdays: string[];
  
  /** Abbreviated weekday names in Bulgarian */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Bulgarian */
  weekdaysMin: string[];
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (hours:minutes) */
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
  
  /** Calendar display configuration */
  calendar: {
    /** Format for today */
    sameDay: string;
    /** Format for tomorrow */
    nextDay: string;
    /** Format for next week */
    nextWeek: string;
    /** Format for yesterday */
    lastDay: string;
    /** Function to determine format for last week based on day */
    lastWeek: (this: moment.Moment) => string;
    /** Default format for other dates */
    sameElse: string;
  };
  
  /** Relative time configuration */
  relativeTime: {
    /** Future time prefix template */
    future: string;
    /** Past time prefix template */
    past: string;
    /** Seconds (few) */
    s: string;
    /** Seconds (with count) */
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
    /** Week (singular) */
    w: string;
    /** Weeks (plural) */
    ww: string;
    /** Month (singular) */
    M: string;
    /** Months (plural) */
    MM: string;
    /** Year (singular) */
    y: string;
    /** Years (plural) */
    yy: string;
  };
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to generate ordinal suffix for a number */
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
 * Defines the Bulgarian locale configuration for moment.js
 * @param momentInstance - The moment.js instance
 * @returns The defined locale
 */
declare function defineBulgarianLocale(momentInstance: typeof moment): Locale;

export default defineBulgarianLocale;