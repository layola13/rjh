/**
 * Moment.js Kurdish (ku) locale configuration
 * 
 * This module provides localization support for the Kurdish language in Moment.js,
 * including:
 * - Arabic-Indic numeral conversion (٠-٩ ↔ 0-9)
 * - Kurdish month names
 * - Kurdish weekday names
 * - Date/time formatting patterns
 * - Relative time expressions
 * - Calendar expressions
 */

/**
 * Map of Western digits to Arabic-Indic digits
 */
declare const WESTERN_TO_ARABIC_INDIC: {
  readonly '1': '١';
  readonly '2': '٢';
  readonly '3': '٣';
  readonly '4': '٤';
  readonly '5': '٥';
  readonly '6': '٦';
  readonly '7': '٧';
  readonly '8': '٨';
  readonly '9': '٩';
  readonly '0': '٠';
};

/**
 * Map of Arabic-Indic digits to Western digits
 */
declare const ARABIC_INDIC_TO_WESTERN: {
  readonly '١': '1';
  readonly '٢': '2';
  readonly '٣': '3';
  readonly '٤': '4';
  readonly '٥': '5';
  readonly '٦': '6';
  readonly '٧': '7';
  readonly '٨': '8';
  readonly '٩': '9';
  readonly '٠': '0';
};

/**
 * Kurdish month names (Gregorian calendar)
 */
declare const KURDISH_MONTHS: readonly [
  'کانونی دووەم',
  'شوبات',
  'ئازار',
  'نیسان',
  'ئایار',
  'حوزەیران',
  'تەمموز',
  'ئاب',
  'ئەیلوول',
  'تشرینی یەكەم',
  'تشرینی دووەم',
  'كانونی یەکەم'
];

/**
 * Kurdish locale configuration for Moment.js
 */
export interface KurdishLocaleConfig {
  /** Full month names */
  readonly months: readonly string[];
  
  /** Abbreviated month names (same as full names in Kurdish) */
  readonly monthsShort: readonly string[];
  
  /** Full weekday names */
  readonly weekdays: readonly string[];
  
  /** Abbreviated weekday names */
  readonly weekdaysShort: readonly string[];
  
  /** Minimal weekday names (single characters) */
  readonly weekdaysMin: readonly string[];
  
  /** Whether to use exact parsing for weekdays */
  readonly weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  readonly longDateFormat: {
    /** Time format (e.g., "HH:mm") */
    readonly LT: string;
    /** Time with seconds format (e.g., "HH:mm:ss") */
    readonly LTS: string;
    /** Short date format (e.g., "DD/MM/YYYY") */
    readonly L: string;
    /** Long date format (e.g., "D MMMM YYYY") */
    readonly LL: string;
    /** Long date with time format */
    readonly LLL: string;
    /** Full date with weekday and time */
    readonly LLLL: string;
  };
  
  /** Regular expression for parsing meridiem (AM/PM) */
  readonly meridiemParse: RegExp;
  
  /**
   * Determines if the given meridiem string represents PM
   * @param meridiemString - The meridiem string to check
   * @returns True if PM (ئێواره‌), false if AM (به‌یانی)
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Returns the appropriate meridiem string for the given time
   * @param hours - Hour of day (0-23)
   * @param minutes - Minute of hour (0-59)
   * @param isLowercase - Whether to return lowercase (unused in Kurdish)
   * @returns "به‌یانی" (morning) if before 12, "ئێواره‌" (evening) otherwise
   */
  meridiem(hours: number, minutes: number, isLowercase: boolean): string;
  
  /** Calendar expressions for relative dates */
  readonly calendar: {
    /** Format for today (e.g., "[ئه‌مرۆ كاتژمێر] LT") */
    readonly sameDay: string;
    /** Format for tomorrow */
    readonly nextDay: string;
    /** Format for next week */
    readonly nextWeek: string;
    /** Format for yesterday */
    readonly lastDay: string;
    /** Format for last week */
    readonly lastWeek: string;
    /** Format for other dates */
    readonly sameElse: string;
  };
  
  /** Relative time expressions */
  readonly relativeTime: {
    /** Future time prefix/suffix (e.g., "له‌ %s") */
    readonly future: string;
    /** Past time prefix/suffix */
    readonly past: string;
    /** Seconds (singular) */
    readonly s: string;
    /** Seconds (plural, %d is replaced with number) */
    readonly ss: string;
    /** Minute (singular) */
    readonly m: string;
    /** Minutes (plural) */
    readonly mm: string;
    /** Hour (singular) */
    readonly h: string;
    /** Hours (plural) */
    readonly hh: string;
    /** Day (singular) */
    readonly d: string;
    /** Days (plural) */
    readonly dd: string;
    /** Month (singular) */
    readonly M: string;
    /** Months (plural) */
    readonly MM: string;
    /** Year (singular) */
    readonly y: string;
    /** Years (plural) */
    readonly yy: string;
  };
  
  /**
   * Preprocesses input string by converting Arabic-Indic digits to Western digits
   * and normalizing punctuation
   * @param input - String containing Arabic-Indic numerals
   * @returns String with Western numerals
   */
  preparse(input: string): string;
  
  /**
   * Postprocesses output string by converting Western digits to Arabic-Indic digits
   * and adjusting punctuation for Kurdish
   * @param output - String containing Western numerals
   * @returns String with Arabic-Indic numerals
   */
  postformat(output: string): string;
  
  /** Week configuration */
  readonly week: {
    /** Day of week (0=Sunday, 6=Saturday) */
    readonly dow: number;
    /** Day of year that starts week 1 */
    readonly doy: number;
  };
}

/**
 * Registers the Kurdish locale with Moment.js
 * @param moment - The Moment.js instance
 */
declare function defineKurdishLocale(moment: unknown): void;

export default defineKurdishLocale;