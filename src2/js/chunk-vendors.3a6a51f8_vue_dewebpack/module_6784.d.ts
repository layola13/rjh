/**
 * Moment.js locale configuration for Sindhi (sd)
 * 
 * This module configures the Sindhi locale for moment.js, including:
 * - Month names and abbreviations
 * - Weekday names and abbreviations
 * - Date and time formatting patterns
 * - Relative time expressions
 * - Calendar expressions
 * - Meridiem (AM/PM) handling
 */

declare module 'moment' {
  interface Locale {}
}

/**
 * Locale configuration object for Sindhi
 */
export interface SindhiLocaleConfig {
  /** Full month names in Sindhi */
  months: readonly string[];
  
  /** Abbreviated month names (same as full names in Sindhi) */
  monthsShort: readonly string[];
  
  /** Full weekday names in Sindhi */
  weekdays: readonly string[];
  
  /** Abbreviated weekday names (same as full names in Sindhi) */
  weekdaysShort: readonly string[];
  
  /** Minimal weekday names (same as full names in Sindhi) */
  weekdaysMin: readonly string[];
  
  /** Date and time format patterns */
  longDateFormat: LongDateFormat;
  
  /** Regular expression to parse meridiem indicators (صبح/شام) */
  meridiemParse: RegExp;
  
  /** Determines if a given meridiem string represents PM */
  isPM(meridiemString: string): boolean;
  
  /** Returns the appropriate meridiem string based on hour, minute, and case */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
  
  /** Calendar-related date format strings */
  calendar: CalendarSpec;
  
  /** Relative time format strings */
  relativeTime: RelativeTimeSpec;
  
  /** Preprocesses input strings by replacing Sindhi commas with standard commas */
  preparse(input: string): string;
  
  /** Post-processes output strings by replacing standard commas with Sindhi commas */
  postformat(output: string): string;
  
  /** Week configuration (first day of week and first week of year) */
  week: WeekSpec;
}

/**
 * Long date format patterns
 */
export interface LongDateFormat {
  /** Time format: HH:mm */
  LT: string;
  
  /** Time format with seconds: HH:mm:ss */
  LTS: string;
  
  /** Short date format: DD/MM/YYYY */
  L: string;
  
  /** Long date format: D MMMM YYYY */
  LL: string;
  
  /** Long date and time format: D MMMM YYYY HH:mm */
  LLL: string;
  
  /** Full date and time format with weekday: dddd، D MMMM YYYY HH:mm */
  LLLL: string;
}

/**
 * Calendar-specific format strings
 */
export interface CalendarSpec {
  /** Format for today: [اڄ] LT (Today) */
  sameDay: string;
  
  /** Format for tomorrow: [سڀاڻي] LT (Tomorrow) */
  nextDay: string;
  
  /** Format for next week: dddd [اڳين هفتي تي] LT (Next week on [weekday]) */
  nextWeek: string;
  
  /** Format for yesterday: [ڪالهه] LT (Yesterday) */
  lastDay: string;
  
  /** Format for last week: [گزريل هفتي] dddd [تي] LT (Last week on [weekday]) */
  lastWeek: string;
  
  /** Default format for other dates: L */
  sameElse: string;
}

/**
 * Relative time format strings
 */
export interface RelativeTimeSpec {
  /** Future time format: %s پوء (in %s) */
  future: string;
  
  /** Past time format: %s اڳ (%s ago) */
  past: string;
  
  /** Few seconds: چند سيڪنڊ */
  s: string;
  
  /** Seconds: %d سيڪنڊ */
  ss: string;
  
  /** A minute: هڪ منٽ */
  m: string;
  
  /** Minutes: %d منٽ */
  mm: string;
  
  /** An hour: هڪ ڪلاڪ */
  h: string;
  
  /** Hours: %d ڪلاڪ */
  hh: string;
  
  /** A day: هڪ ڏينهن */
  d: string;
  
  /** Days: %d ڏينهن */
  dd: string;
  
  /** A month: هڪ مهينو */
  M: string;
  
  /** Months: %d مهينا */
  MM: string;
  
  /** A year: هڪ سال */
  y: string;
  
  /** Years: %d سال */
  yy: string;
}

/**
 * Week configuration
 */
export interface WeekSpec {
  /** First day of week (1 = Monday) */
  dow: number;
  
  /** First week of year (day of year that week 1 starts) */
  doy: number;
}

/**
 * Defines the Sindhi locale configuration for moment.js
 * @param moment - The moment.js instance
 */
export function defineLocale(moment: unknown): void;