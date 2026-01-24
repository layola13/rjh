/**
 * Moment.js Marathi (mr) locale configuration
 * Provides localization support for Marathi language including:
 * - Number conversion between Arabic and Devanagari numerals
 * - Month and weekday names
 * - Relative time formatting
 * - Meridiem (time of day) formatting
 */

/**
 * Mapping from Arabic numerals to Devanagari numerals
 */
export const ARABIC_TO_DEVANAGARI: Record<string, string>;

/**
 * Mapping from Devanagari numerals to Arabic numerals
 */
export const DEVANAGARI_TO_ARABIC: Record<string, string>;

/**
 * Formats relative time strings in Marathi based on the time unit and context
 * 
 * @param value - The numeric value representing the time amount
 * @param withoutSuffix - Whether to format without suffix (affects grammar case)
 * @param unit - Time unit identifier (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy)
 * @param isFuture - Whether the time is in the future (currently unused)
 * @returns Formatted Marathi string with %d placeholder replaced by the value
 * 
 * @example
 * formatRelativeTime(5, true, "mm", false) // "5 मिनिटे"
 * formatRelativeTime(5, false, "mm", false) // "5 मिनिटां"
 */
export function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  unit: string,
  isFuture: boolean
): string;

/**
 * Moment.js locale configuration object for Marathi (mr)
 */
export interface MarathiLocaleConfig {
  /** Full month names in Marathi */
  months: string[];
  
  /** Abbreviated month names in Marathi */
  monthsShort: string[];
  
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  
  /** Full weekday names in Marathi */
  weekdays: string[];
  
  /** Short weekday names in Marathi */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Marathi */
  weekdaysMin: string[];
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format: "A h:mm वाजता" */
    LT: string;
    /** Time with seconds format: "A h:mm:ss वाजता" */
    LTS: string;
    /** Short date format: "DD/MM/YYYY" */
    L: string;
    /** Long date format: "D MMMM YYYY" */
    LL: string;
    /** Long date with time format: "D MMMM YYYY, A h:mm वाजता" */
    LLL: string;
    /** Full date with time format: "dddd, D MMMM YYYY, A h:mm वाजता" */
    LLLL: string;
  };
  
  /** Calendar date format strings */
  calendar: {
    /** Format for today: "[आज] LT" */
    sameDay: string;
    /** Format for tomorrow: "[उद्या] LT" */
    nextDay: string;
    /** Format for next week: "dddd, LT" */
    nextWeek: string;
    /** Format for yesterday: "[काल] LT" */
    lastDay: string;
    /** Format for last week: "[मागील] dddd, LT" */
    lastWeek: string;
    /** Format for other dates: "L" */
    sameElse: string;
  };
  
  /** Relative time format configuration */
  relativeTime: {
    /** Future time template: "%sमध्ये" */
    future: string;
    /** Past time template: "%sपूर्वी" */
    past: string;
    /** Seconds formatter function */
    s: typeof formatRelativeTime;
    /** Multiple seconds formatter function */
    ss: typeof formatRelativeTime;
    /** Minute formatter function */
    m: typeof formatRelativeTime;
    /** Multiple minutes formatter function */
    mm: typeof formatRelativeTime;
    /** Hour formatter function */
    h: typeof formatRelativeTime;
    /** Multiple hours formatter function */
    hh: typeof formatRelativeTime;
    /** Day formatter function */
    d: typeof formatRelativeTime;
    /** Multiple days formatter function */
    dd: typeof formatRelativeTime;
    /** Month formatter function */
    M: typeof formatRelativeTime;
    /** Multiple months formatter function */
    MM: typeof formatRelativeTime;
    /** Year formatter function */
    y: typeof formatRelativeTime;
    /** Multiple years formatter function */
    yy: typeof formatRelativeTime;
  };
  
  /**
   * Converts Devanagari numerals to Arabic numerals
   * @param text - Text containing Devanagari numerals
   * @returns Text with Arabic numerals
   */
  preparse(text: string): string;
  
  /**
   * Converts Arabic numerals to Devanagari numerals
   * @param text - Text containing Arabic numerals
   * @returns Text with Devanagari numerals
   */
  postformat(text: string): string;
  
  /** Regular expression to parse meridiem strings */
  meridiemParse: RegExp;
  
  /**
   * Adjusts hour based on meridiem period
   * @param hour - The hour value (0-23)
   * @param meridiem - Marathi meridiem string (पहाटे/सकाळी/दुपारी/सायंकाळी/रात्री)
   * @returns Adjusted hour in 24-hour format
   */
  meridiemHour(hour: number, meridiem: string): number | undefined;
  
  /**
   * Returns appropriate Marathi meridiem string based on hour
   * @param hour - Hour value (0-23)
   * @param minute - Minute value (0-59)
   * @param isLowercase - Whether to return lowercase (currently unused)
   * @returns Marathi meridiem string
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
  
  /** Week configuration */
  week: {
    /** Day of week (0 = Sunday) */
    dow: number;
    /** Day of year for week calculation */
    doy: number;
  };
}

/**
 * Initializes and registers the Marathi locale with Moment.js
 * @param moment - Moment.js instance
 */
export default function initMarathiLocale(moment: unknown): void;