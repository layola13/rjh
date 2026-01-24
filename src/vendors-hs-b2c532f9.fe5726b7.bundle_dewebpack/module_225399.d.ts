/**
 * Moment.js locale configuration for Bengali (bn)
 * Provides localization support for dates and times in Bengali language
 */

/**
 * Mapping of Western digits (0-9) to Bengali numerals
 */
export const WESTERN_TO_BENGALI_DIGITS: Record<string, string> = {
  1: "১",
  2: "২",
  3: "৩",
  4: "৪",
  5: "৫",
  6: "৬",
  7: "৭",
  8: "৮",
  9: "৯",
  0: "০"
};

/**
 * Mapping of Bengali numerals to Western digits (0-9)
 */
export const BENGALI_TO_WESTERN_DIGITS: Record<string, string> = {
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
  "০": "0"
};

/**
 * Bengali locale configuration interface for Moment.js
 */
export interface BengaliLocaleConfig {
  /** Full month names in Bengali */
  months: string[];
  /** Abbreviated month names in Bengali */
  monthsShort: string[];
  /** Full weekday names in Bengali */
  weekdays: string[];
  /** Abbreviated weekday names in Bengali */
  weekdaysShort: string[];
  /** Minimal weekday names in Bengali */
  weekdaysMin: string[];
  /** Long date format tokens */
  longDateFormat: LongDateFormat;
  /** Calendar format configuration */
  calendar: CalendarFormat;
  /** Relative time format configuration */
  relativeTime: RelativeTimeFormat;
  /** Pre-parse function to convert Bengali numerals to Western digits */
  preparse: (input: string) => string;
  /** Post-format function to convert Western digits to Bengali numerals */
  postformat: (input: string) => string;
  /** Regex pattern for meridiem (AM/PM) parsing */
  meridiemParse: RegExp;
  /** Function to determine hour based on meridiem */
  meridiemHour: (hour: number, meridiem: string) => number;
  /** Function to determine meridiem based on hour and minute */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Long date format tokens configuration
 */
export interface LongDateFormat {
  /** Time format */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with weekday and time format */
  LLLL: string;
}

/**
 * Calendar format configuration for relative dates
 */
export interface CalendarFormat {
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
}

/**
 * Relative time format strings
 */
export interface RelativeTimeFormat {
  /** Future time format */
  future: string;
  /** Past time format */
  past: string;
  /** Few seconds */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** One minute */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** One hour */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** One day */
  d: string;
  /** Days (plural) */
  dd: string;
  /** One month */
  M: string;
  /** Months (plural) */
  MM: string;
  /** One year */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Week configuration (first day of week and first week of year)
 */
export interface WeekConfig {
  /** Day of week (0 = Sunday) */
  dow: number;
  /** Day of year for first week */
  doy: number;
}

/**
 * Moment.js instance interface (minimal required methods)
 */
export interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., "bn")
   * @param config - The locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeName: string, config: BengaliLocaleConfig): unknown;
}

/**
 * Converts Bengali numerals in a string to Western digits
 * @param input - String containing Bengali numerals
 * @returns String with Western digits
 */
export declare function preparse(input: string): string;

/**
 * Converts Western digits in a string to Bengali numerals
 * @param input - String containing Western digits
 * @returns String with Bengali numerals
 */
export declare function postformat(input: string): string;

/**
 * Determines the hour value based on 12-hour format and meridiem
 * @param hour - Hour in 12-hour format
 * @param meridiem - Bengali meridiem string (রাত/সকাল/দুপুর/বিকাল)
 * @returns Hour in 24-hour format
 */
export declare function meridiemHour(hour: number, meridiem: string): number;

/**
 * Determines the Bengali meridiem (time of day) based on hour
 * @param hour - Hour in 24-hour format
 * @param minute - Minute value
 * @param isLowercase - Whether to return lowercase (unused in Bengali)
 * @returns Bengali meridiem string (রাত/সকাল/দুপুর/বিকাল)
 */
export declare function meridiem(hour: number, minute: number, isLowercase: boolean): string;

/**
 * Initialize and register the Bengali locale with Moment.js
 * @param moment - Moment.js instance
 * @returns The configured locale
 */
export declare function initBengaliLocale(moment: MomentStatic): unknown;