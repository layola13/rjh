/**
 * Moment.js locale configuration for Telugu (te)
 * 
 * This module provides Telugu language support for Moment.js, including:
 * - Month and weekday names in Telugu script
 * - Date/time formatting patterns
 * - Relative time expressions
 * - Calendar expressions for past/future dates
 * - Meridiem (AM/PM) handling in Telugu context
 * 
 * @module moment-locale-te
 */

/**
 * Configuration object for locale-specific settings
 */
export interface LocaleSpecification {
  /** Full month names in Telugu */
  months: string[];
  
  /** Abbreviated month names in Telugu */
  monthsShort: string[];
  
  /** Whether to use exact parsing for month names */
  monthsParseExact: boolean;
  
  /** Full weekday names in Telugu */
  weekdays: string[];
  
  /** Abbreviated weekday names in Telugu */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Telugu (single/double character) */
  weekdaysMin: string[];
  
  /** Long date format tokens and their corresponding patterns */
  longDateFormat: LongDateFormatSpec;
  
  /** Calendar-specific format strings for relative dates */
  calendar: CalendarSpec;
  
  /** Relative time format strings */
  relativeTime: RelativeTimeSpec;
  
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers */
  ordinal: (num: number) => string;
  
  /** Regex pattern for parsing meridiem indicators */
  meridiemParse: RegExp;
  
  /** Function to convert 12-hour format to 24-hour based on meridiem */
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  
  /** Function to determine meridiem string based on hour and minute */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  
  /** Week configuration (first day of week and day of year) */
  week: WeekSpec;
}

/**
 * Long date format specification mapping format tokens to patterns
 */
export interface LongDateFormatSpec {
  /** Time format (e.g., "A h:mm") */
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
 * Calendar-specific format strings for different relative time periods
 */
export interface CalendarSpec {
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
  
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time format strings with placeholders for duration values
 */
export interface RelativeTimeSpec {
  /** Future time prefix/suffix pattern */
  future: string;
  
  /** Past time prefix/suffix pattern */
  past: string;
  
  /** Few seconds */
  s: string;
  
  /** Seconds (with placeholder %d) */
  ss: string;
  
  /** One minute */
  m: string;
  
  /** Minutes (with placeholder %d) */
  mm: string;
  
  /** One hour */
  h: string;
  
  /** Hours (with placeholder %d) */
  hh: string;
  
  /** One day */
  d: string;
  
  /** Days (with placeholder %d) */
  dd: string;
  
  /** One month */
  M: string;
  
  /** Months (with placeholder %d) */
  MM: string;
  
  /** One year */
  y: string;
  
  /** Years (with placeholder %d) */
  yy: string;
}

/**
 * Week configuration specifying start of week and day of year
 */
export interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  
  /** Day of year to use for week numbering */
  doy: number;
}

/**
 * Moment.js instance interface (minimal definition for locale registration)
 */
export interface MomentStatic {
  /**
   * Define a new locale or update an existing one
   * @param localeName - The locale identifier (e.g., "te" for Telugu)
   * @param localeSpec - The locale configuration object
   */
  defineLocale(localeName: string, localeSpec: LocaleSpecification): void;
}

/**
 * Configures and registers the Telugu locale with Moment.js
 * @param moment - The Moment.js instance to configure
 */
export default function configureTeluguLocale(moment: MomentStatic): void;