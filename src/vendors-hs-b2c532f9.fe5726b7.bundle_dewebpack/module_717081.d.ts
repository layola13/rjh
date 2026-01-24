/**
 * Moment.js locale configuration for Uyghur (China)
 * Language: Uyghur (ug-cn)
 */

import { Locale, MomentInput } from 'moment';

/**
 * Meridiem (AM/PM) type in Uyghur
 */
type UyghurMeridiem = 
  | 'يېرىم كېچە'  // midnight
  | 'سەھەر'      // morning
  | 'چۈشتىن بۇرۇن' // before noon
  | 'چۈش'       // noon
  | 'چۈشتىن كېيىن' // afternoon
  | 'كەچ';      // evening

/**
 * Calendar format type
 */
type CalendarFormatType = 
  | 'd' 
  | 'D' 
  | 'DDD' 
  | 'w' 
  | 'W';

/**
 * Long date format keys
 */
interface LongDateFormat {
  /** Time format (HH:mm) */
  LT: string;
  /** Time with seconds format (HH:mm:ss) */
  LTS: string;
  /** Short date format (YYYY-MM-DD) */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with weekday and time format */
  LLLL: string;
}

/**
 * Calendar configuration for relative time display
 */
interface CalendarSpec {
  /** Same day format */
  sameDay: string;
  /** Next day format */
  nextDay: string;
  /** Next week format */
  nextWeek: string;
  /** Last day format */
  lastDay: string;
  /** Last week format */
  lastWeek: string;
  /** Default format */
  sameElse: string;
}

/**
 * Relative time configuration
 */
interface RelativeTimeSpec {
  /** Future time template */
  future: string;
  /** Past time template */
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
  /** Month (singular) */
  M: string;
  /** Months (plural) */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (1 = Monday) */
  dow: number;
  /** Day of year */
  doy: number;
}

/**
 * Uyghur locale configuration
 */
interface UyghurLocaleConfig {
  /** Full month names in Uyghur */
  months: string[];
  /** Abbreviated month names in Uyghur */
  monthsShort: string[];
  /** Full weekday names in Uyghur */
  weekdays: string[];
  /** Abbreviated weekday names in Uyghur */
  weekdaysShort: string[];
  /** Minimal weekday names in Uyghur */
  weekdaysMin: string[];
  /** Long date format specifications */
  longDateFormat: LongDateFormat;
  /** Regular expression to parse meridiem */
  meridiemParse: RegExp;
  /** Calendar relative time specifications */
  calendar: CalendarSpec;
  /** Relative time specifications */
  relativeTime: RelativeTimeSpec;
  /** Regular expression to parse ordinal day/week/month */
  dayOfMonthOrdinalParse: RegExp;
  /** Week configuration */
  week: WeekSpec;
  
  /**
   * Convert meridiem string to 24-hour format
   * @param hour - Hour in 12-hour format (0-12)
   * @param meridiem - Uyghur meridiem string
   * @returns Hour in 24-hour format (0-23)
   */
  meridiemHour(hour: number, meridiem: string): number;
  
  /**
   * Get meridiem string based on hour and minute
   * @param hour - Hour (0-23)
   * @param minute - Minute (0-59)
   * @param isLowercase - Whether to return lowercase (not used in Uyghur)
   * @returns Uyghur meridiem string
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): UyghurMeridiem;
  
  /**
   * Get ordinal suffix for date/week/month
   * @param number - The number to get ordinal for
   * @param formatType - The format type (day, week, etc.)
   * @returns Number with appropriate Uyghur ordinal suffix
   */
  ordinal(number: number, formatType: string): string;
  
  /**
   * Preparse input string (replace Uyghur comma with standard comma)
   * @param input - Input string to preparse
   * @returns Preparsed string
   */
  preparse(input: string): string;
  
  /**
   * Postformat output string (replace standard comma with Uyghur comma)
   * @param output - Output string to postformat
   * @returns Postformatted string
   */
  postformat(output: string): string;
}

/**
 * Define and register the Uyghur (China) locale for moment.js
 * @param moment - Moment.js instance
 * @returns Configured Uyghur locale
 */
export function defineUyghurLocale(moment: { defineLocale(name: string, config: UyghurLocaleConfig): Locale }): Locale;

declare module 'moment' {
  interface Locale {
    _config: UyghurLocaleConfig;
  }
}