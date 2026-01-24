/**
 * Moment.js locale configuration for Konkani (Latin script) - gom-latn
 * Provides date/time formatting and localization for the Konkani language
 * using Latin script (as opposed to Devanagari).
 */

import { Moment, LocaleSpecification } from 'moment';

/**
 * Configuration options for relative time formatting
 */
interface RelativeTimeFormatOptions {
  /** Number value for the time unit */
  value: number;
  /** Whether to include articles (e.g., "eka" meaning "one") */
  withoutSuffix: boolean;
  /** Time unit key (s, m, h, d, M, y, etc.) */
  key: string;
  /** Whether this represents future time */
  isFuture: boolean;
}

/**
 * Mapping of time units to their Konkani translations
 * Each entry contains two forms: [with article, without article]
 */
interface RelativeTimeTranslations {
  /** Seconds with article / without article */
  s: [string, string];
  /** Multiple seconds with article / without article */
  ss: [string, string];
  /** Minute with article / without article */
  m: [string, string];
  /** Multiple minutes with article / without article */
  mm: [string, string];
  /** Hour with article / without article */
  h: [string, string];
  /** Multiple hours with article / without article */
  hh: [string, string];
  /** Day with article / without article */
  d: [string, string];
  /** Multiple days with article / without article */
  dd: [string, string];
  /** Month with article / without article */
  M: [string, string];
  /** Multiple months with article / without article */
  MM: [string, string];
  /** Year with article / without article */
  y: [string, string];
  /** Multiple years with article / without article */
  yy: [string, string];
}

/**
 * Format relative time values in Konkani
 * 
 * @param value - Numeric value of the time unit
 * @param withoutSuffix - If true, returns form without article (e.g., "ek minut" vs "eka mintan")
 * @param key - Time unit identifier (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy)
 * @param isFuture - Whether the time reference is in the future
 * @returns Formatted relative time string in Konkani
 * 
 * @example
 * processRelativeTime(5, false, 'mm', false) // "5 mintamni"
 * processRelativeTime(1, true, 'm', false)   // "ek minut"
 */
declare function processRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string;

/**
 * Meridiem (time of day) identifiers in Konkani
 */
type MeridiemIdentifier = 'rati' | 'sokallim' | 'donparam' | 'sanje';

/**
 * Parse and convert 12-hour format to 24-hour format based on Konkani meridiem
 * 
 * @param hour - Hour in 12-hour format
 * @param meridiem - Time of day identifier in Konkani
 * @returns Hour in 24-hour format
 * 
 * Time periods:
 * - rati: night (0-3 hours)
 * - sokallim: morning (4-11 hours)
 * - donparam: afternoon (12-15 hours)
 * - sanje: evening (16-19 hours)
 */
declare function meridiemHour(hour: number, meridiem: MeridiemIdentifier): number;

/**
 * Get Konkani meridiem identifier for a given time
 * 
 * @param hour - Hour in 24-hour format (0-23)
 * @param minute - Minute (0-59)
 * @param isLowercase - Whether to return lowercase version
 * @returns Konkani time of day identifier
 * 
 * @example
 * getMeridiem(3, 0, false)  // "rati" (night)
 * getMeridiem(10, 30, false) // "sokallim" (morning)
 * getMeridiem(14, 0, false)  // "donparam" (afternoon)
 * getMeridiem(18, 0, false)  // "sanje" (evening)
 */
declare function getMeridiem(hour: number, minute: number, isLowercase: boolean): MeridiemIdentifier;

/**
 * Get ordinal suffix for day of month
 * 
 * @param dayOfMonth - Day number (1-31)
 * @param token - Format token (D for day, M for month, etc.)
 * @returns Number with ordinal suffix if applicable
 * 
 * @example
 * ordinal(5, 'D')  // "5er"
 * ordinal(15, 'M') // "15"
 */
declare function ordinal(dayOfMonth: number, token: string): string;

/**
 * Complete locale specification for Konkani (Latin script)
 * Implements Moment.js LocaleSpecification interface
 */
export declare const gomLatnLocale: LocaleSpecification & {
  /** Standalone and contextual month names */
  months: {
    /** Month names when used standalone */
    standalone: string[];
    /** Month names when used in date format (genitive case) */
    format: string[];
    /** Regex pattern to determine which month format to use */
    isFormat: RegExp;
  };
  
  /** Abbreviated month names */
  monthsShort: string[];
  
  /** Whether to use exact matching for month parsing */
  monthsParseExact: true;
  
  /** Full weekday names */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names (2 characters) */
  weekdaysMin: string[];
  
  /** Whether to use exact matching for weekday parsing */
  weekdaysParseExact: true;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format: "A h:mm [vazta]" */
    LT: string;
    /** Time with seconds format */
    LTS: string;
    /** Short date: "DD-MM-YYYY" */
    L: string;
    /** Long date: "D MMMM YYYY" */
    LL: string;
    /** Long date with time */
    LLL: string;
    /** Full date with weekday and time */
    LLLL: string;
    /** Abbreviated full format */
    llll: string;
  };
  
  /** Calendar relative date formats */
  calendar: {
    /** Today */
    sameDay: string;
    /** Tomorrow */
    nextDay: string;
    /** Next week */
    nextWeek: string;
    /** Yesterday */
    lastDay: string;
    /** Last week */
    lastWeek: string;
    /** All other dates */
    sameElse: string;
  };
  
  /** Relative time formatting functions */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time suffix: "%s adim" */
    past: string;
    /** Formatting functions for each time unit */
    s: typeof processRelativeTime;
    ss: typeof processRelativeTime;
    m: typeof processRelativeTime;
    mm: typeof processRelativeTime;
    h: typeof processRelativeTime;
    hh: typeof processRelativeTime;
    d: typeof processRelativeTime;
    dd: typeof processRelativeTime;
    M: typeof processRelativeTime;
    MM: typeof processRelativeTime;
    y: typeof processRelativeTime;
    yy: typeof processRelativeTime;
  };
  
  /** Regex to parse ordinal day of month (e.g., "5er") */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to generate ordinal suffix */
  ordinal: typeof ordinal;
  
  /** Week configuration */
  week: {
    /** First day of week (0 = Sunday) */
    dow: 0;
    /** First week of year calculation */
    doy: 3;
  };
  
  /** Regex to parse meridiem identifiers */
  meridiemParse: RegExp;
  
  /** Convert 12-hour to 24-hour format */
  meridiemHour: typeof meridiemHour;
  
  /** Get meridiem for given time */
  meridiem: typeof getMeridiem;
};

/**
 * Registers the Konkani (Latin script) locale with Moment.js
 * Must be called after importing moment to enable this locale
 */
export declare function defineGomLatnLocale(): void;