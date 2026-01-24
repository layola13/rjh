/**
 * Moment.js locale configuration for Vietnamese (vi)
 * 
 * This module provides Vietnamese language support for Moment.js,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module moment-locale-vi
 */

import { Moment, LocaleSpecification } from 'moment';

/**
 * Meridiem parse function type
 * Determines if a time string represents PM (afternoon/evening)
 */
type IsPMFunction = (input: string) => boolean;

/**
 * Meridiem formatter function type
 * Returns the appropriate meridiem indicator based on hour, minute, and case preference
 */
type MeridiemFunction = (hour: number, minute: number, isLowercase: boolean) => string;

/**
 * Ordinal formatter function type
 * Formats a number with its ordinal indicator
 */
type OrdinalFunction = (num: number) => string;

/**
 * Vietnamese locale configuration interface for Moment.js
 */
interface VietnameseLocaleConfig extends LocaleSpecification {
  /** Array of full month names in Vietnamese */
  months: string[];
  
  /** Array of abbreviated month names in Vietnamese */
  monthsShort: string[];
  
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  
  /** Array of full weekday names in Vietnamese */
  weekdays: string[];
  
  /** Array of short weekday names in Vietnamese */
  weekdaysShort: string[];
  
  /** Array of minimal weekday names in Vietnamese */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Regular expression for parsing meridiem indicators (sa/ch) */
  meridiemParse: RegExp;
  
  /** Function to determine if a time string represents PM */
  isPM: IsPMFunction;
  
  /** Function to format meridiem indicators */
  meridiem: MeridiemFunction;
  
  /** Object containing long date format patterns */
  longDateFormat: {
    /** Time format (24-hour) */
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
    /** Short date format (alternative) */
    l: string;
    /** Medium date format */
    ll: string;
    /** Medium date and time format */
    lll: string;
    /** Medium date and time format with weekday */
    llll: string;
  };
  
  /** Calendar display configuration for relative dates */
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
    /** Future time prefix format */
    future: string;
    /** Past time prefix format */
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
  
  /** Regular expression for parsing day-of-month ordinals */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers */
  ordinal: OrdinalFunction;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year for week numbering */
    doy: number;
  };
}

/**
 * Defines the Vietnamese locale configuration for Moment.js
 * 
 * @param moment - The Moment.js instance to configure
 * @returns The configured Moment.js instance
 */
export function defineVietnameseLocale(moment: typeof Moment): typeof Moment;

/**
 * Vietnamese locale configuration object
 * Contains all localization data for Vietnamese language support in Moment.js
 */
export const vietnameseLocale: VietnameseLocaleConfig;

export default vietnameseLocale;