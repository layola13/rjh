/**
 * Moment.js locale configuration for Dhivehi (dv)
 * 
 * This module provides localization support for the Dhivehi language,
 * spoken primarily in the Maldives. It configures date/time formatting,
 * calendar strings, and relative time expressions.
 * 
 * @module moment-locale-dv
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Month names in Dhivehi (Thaana script)
 */
declare const DHIVEHI_MONTHS: readonly [
  'ޖެނުއަރީ',      // January
  'ފެބްރުއަރީ',     // February
  'މާރިޗު',        // March
  'އޭޕްރީލު',      // April
  'މޭ',            // May
  'ޖޫން',          // June
  'ޖުލައި',        // July
  'އޯގަސްޓު',      // August
  'ސެޕްޓެމްބަރު',   // September
  'އޮކްޓޯބަރު',     // October
  'ނޮވެމްބަރު',     // November
  'ޑިސެމްބަރު'      // December
];

/**
 * Weekday names in Dhivehi (Thaana script)
 */
declare const DHIVEHI_WEEKDAYS: readonly [
  'އާދިއްތަ',      // Sunday
  'ހޯމަ',          // Monday
  'އަންގާރަ',       // Tuesday
  'ބުދަ',          // Wednesday
  'ބުރާސްފަތި',    // Thursday
  'ހުކުރު',        // Friday
  'ހޮނިހިރު'       // Saturday
];

/**
 * Locale configuration specification for Dhivehi
 */
export interface DhivehiLocaleSpecification extends LocaleSpecification {
  /** Full month names */
  months: typeof DHIVEHI_MONTHS;
  
  /** Abbreviated month names (same as full names in Dhivehi) */
  monthsShort: typeof DHIVEHI_MONTHS;
  
  /** Full weekday names */
  weekdays: typeof DHIVEHI_WEEKDAYS;
  
  /** Abbreviated weekday names (same as full names in Dhivehi) */
  weekdaysShort: typeof DHIVEHI_WEEKDAYS;
  
  /** Minimized weekday names */
  weekdaysMin: readonly [
    'އާދި',  // Sun
    'ހޯމަ',  // Mon
    'އަން',  // Tue
    'ބުދަ',  // Wed
    'ބުރާ',  // Thu
    'ހުކު',  // Fri
    'ހޮނި'   // Sat
  ];
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (e.g., 14:30) */
    LT: 'HH:mm';
    
    /** Time format with seconds (e.g., 14:30:45) */
    LTS: 'HH:mm:ss';
    
    /** Short date format (e.g., 5/3/2023) */
    L: 'D/M/YYYY';
    
    /** Long date format (e.g., 5 March 2023) */
    LL: 'D MMMM YYYY';
    
    /** Long date with time (e.g., 5 March 2023 14:30) */
    LLL: 'D MMMM YYYY HH:mm';
    
    /** Full date with weekday and time */
    LLLL: 'dddd D MMMM YYYY HH:mm';
  };
  
  /** Regex pattern to parse AM/PM indicators */
  meridiemParse: RegExp;
  
  /**
   * Determines if the given meridiem string represents PM
   * @param meridiemString - The meridiem indicator ('މކ' for AM or 'މފ' for PM)
   * @returns True if PM, false if AM
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Returns the appropriate meridiem string for the given time
   * @param hours - Hour of the day (0-23)
   * @param minutes - Minute of the hour
   * @param isLowercase - Whether to return lowercase version
   * @returns 'މކ' (AM) if before noon, 'މފ' (PM) otherwise
   */
  meridiem(hours: number, minutes: number, isLowercase: boolean): string;
  
  /** Calendar display strings for relative dates */
  calendar: {
    /** Format for today (e.g., "[Today] 14:30") */
    sameDay: '[މިއަދު] LT';
    
    /** Format for tomorrow */
    nextDay: '[މާދަމާ] LT';
    
    /** Format for next week */
    nextWeek: 'dddd LT';
    
    /** Format for yesterday */
    lastDay: '[އިއްޔެ] LT';
    
    /** Format for last week */
    lastWeek: '[ފާއިތުވި] dddd LT';
    
    /** Format for other dates */
    sameElse: 'L';
  };
  
  /** Relative time expressions */
  relativeTime: {
    /** Future time format template */
    future: 'ތެރޭގައި %s';
    
    /** Past time format template */
    past: 'ކުރިން %s';
    
    /** A few seconds */
    s: 'ސިކުންތުކޮޅެއް';
    
    /** Multiple seconds (d% is placeholder for number) */
    ss: 'd% ސިކުންތު';
    
    /** A minute */
    m: 'މިނިޓެއް';
    
    /** Multiple minutes */
    mm: 'މިނިޓު %d';
    
    /** An hour */
    h: 'ގަޑިއިރެއް';
    
    /** Multiple hours */
    hh: 'ގަޑިއިރު %d';
    
    /** A day */
    d: 'ދުވަހެއް';
    
    /** Multiple days */
    dd: 'ދުވަސް %d';
    
    /** A month */
    M: 'މަހެއް';
    
    /** Multiple months */
    MM: 'މަސް %d';
    
    /** A year */
    y: 'އަހަރެއް';
    
    /** Multiple years */
    yy: 'އަހަރު %d';
  };
  
  /**
   * Preprocesses input strings by normalizing Dhivehi punctuation
   * Converts Arabic comma (،) to Latin comma with space (, )
   * @param input - The string to preprocess
   * @returns Normalized string
   */
  preparse(input: string): string;
  
  /**
   * Postprocesses output strings by converting to Dhivehi punctuation
   * Converts Latin comma with space (, ) to Arabic comma (،)
   * @param output - The string to postprocess
   * @returns Formatted string with Dhivehi punctuation
   */
  postformat(output: string): string;
  
  /** Week configuration */
  week: {
    /** Day of week (7 = Sunday as first day) */
    dow: 7;
    
    /** Day of year for week calculation */
    doy: 12;
  };
}

/**
 * Defines and registers the Dhivehi locale with moment.js
 * 
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured locale object
 */
export function defineDhivehiLocale(momentInstance: typeof import('moment')): Locale;

/**
 * The registered Dhivehi locale instance
 */
export const dhivehiLocale: Locale;

export default dhivehiLocale;