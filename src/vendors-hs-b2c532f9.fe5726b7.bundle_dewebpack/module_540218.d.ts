/**
 * Moment.js locale configuration for Gom (Latin script)
 * Gom is a language spoken in Goa, India
 * 
 * @module gom-latn-locale
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Relative time unit key
 */
type RelativeTimeUnit = 's' | 'ss' | 'm' | 'mm' | 'h' | 'hh' | 'd' | 'dd' | 'M' | 'MM' | 'y' | 'yy';

/**
 * Meridiem period identifier
 */
type MeridiemPeriod = 'rati' | 'sokallim' | 'donparam' | 'sanje';

/**
 * Generates relative time strings in Gom language
 * 
 * @param count - The numeric value for the time unit
 * @param withoutSuffix - Whether to return the form without suffix
 * @param unit - The time unit key
 * @param isFuture - Whether the time reference is in the future
 * @returns The formatted relative time string
 */
declare function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  unit: RelativeTimeUnit,
  isFuture: boolean
): string;

/**
 * Determines the hour value based on meridiem period
 * 
 * @param hour - The hour value (1-12)
 * @param meridiem - The meridiem period identifier
 * @returns The adjusted hour value in 24-hour format
 */
declare function meridiemHour(hour: number, meridiem: MeridiemPeriod): number;

/**
 * Determines the meridiem period based on hour and minute
 * 
 * @param hour - The hour value (0-23)
 * @param minute - The minute value
 * @param isLowercase - Whether to return lowercase format
 * @returns The meridiem period identifier
 */
declare function meridiem(hour: number, minute: number, isLowercase: boolean): MeridiemPeriod;

/**
 * Generates ordinal suffix for day of month
 * 
 * @param dayOfMonth - The day of the month
 * @param format - The format token
 * @returns The day with ordinal suffix
 */
declare function ordinal(dayOfMonth: number, format: string): string;

/**
 * Moment.js locale configuration object for Gom (Latin script)
 */
export declare const gomLatnLocale: LocaleSpecification & {
  /** Standalone month names */
  months: {
    standalone: string[];
    format: string[];
    isFormat: RegExp;
  };
  /** Abbreviated month names */
  monthsShort: string[];
  /** Whether to parse month names exactly */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to parse weekday names exactly */
  weekdaysParseExact: boolean;
  /** Long date format templates */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
    llll: string;
  };
  /** Calendar display formats */
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  /** Relative time format configuration */
  relativeTime: {
    future: string;
    past: string;
    s: typeof formatRelativeTime;
    ss: typeof formatRelativeTime;
    m: typeof formatRelativeTime;
    mm: typeof formatRelativeTime;
    h: typeof formatRelativeTime;
    hh: typeof formatRelativeTime;
    d: typeof formatRelativeTime;
    dd: typeof formatRelativeTime;
    M: typeof formatRelativeTime;
    MM: typeof formatRelativeTime;
    y: typeof formatRelativeTime;
    yy: typeof formatRelativeTime;
  };
  /** Pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Ordinal number formatter */
  ordinal: typeof ordinal;
  /** Week configuration */
  week: {
    /** Day of week (0 = Sunday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
  /** Pattern for parsing meridiem */
  meridiemParse: RegExp;
  /** Meridiem hour converter */
  meridiemHour: typeof meridiemHour;
  /** Meridiem formatter */
  meridiem: typeof meridiem;
};

/**
 * Defines and returns the Gom (Latin script) locale for moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The configured locale object
 */
export default function defineGomLatnLocale(moment: typeof import('moment')): Locale;