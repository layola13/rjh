/**
 * Moment.js Vietnamese (vi) locale configuration
 * Defines localization settings for Vietnamese language support in Moment.js
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Meridiem parse configuration for Vietnamese time format
 * Matches "sa" (sáng - morning) or "ch" (chiều - afternoon/evening)
 */
interface MeridiemConfig {
  /** Regular expression to parse meridiem indicators */
  meridiemParse: RegExp;
  
  /**
   * Determines if the time is PM (afternoon/evening)
   * @param meridiemToken - The meridiem string to test ("sa" or "ch")
   * @returns true if PM (chiều), false if AM (sáng)
   */
  isPM(meridiemToken: string): boolean;
  
  /**
   * Returns the appropriate meridiem string based on hour
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase format
   * @returns "sa"/"SA" for morning, "ch"/"CH" for afternoon/evening
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
}

/**
 * Long date format tokens for Vietnamese locale
 */
interface LongDateFormat {
  /** Time format: HH:mm */
  LT: string;
  /** Time with seconds format: HH:mm:ss */
  LTS: string;
  /** Short date format: DD/MM/YYYY */
  L: string;
  /** Long date format: D MMMM [năm] YYYY */
  LL: string;
  /** Long date with time: D MMMM [năm] YYYY HH:mm */
  LLL: string;
  /** Full date with time: dddd, D MMMM [năm] YYYY HH:mm */
  LLLL: string;
  /** Short date format (alternative): DD/M/YYYY */
  l: string;
  /** Medium date format: D MMM YYYY */
  ll: string;
  /** Medium date with time: D MMM YYYY HH:mm */
  lll: string;
  /** Full short date with time: ddd, D MMM YYYY HH:mm */
  llll: string;
}

/**
 * Calendar format strings for relative date display
 */
interface CalendarFormat {
  /** Today's date format: [Hôm nay lúc] LT */
  sameDay: string;
  /** Tomorrow's date format: [Ngày mai lúc] LT */
  nextDay: string;
  /** Next week format: dddd [tuần tới lúc] LT */
  nextWeek: string;
  /** Yesterday's date format: [Hôm qua lúc] LT */
  lastDay: string;
  /** Last week format: dddd [tuần trước lúc] LT */
  lastWeek: string;
  /** Default format for other dates: L */
  sameElse: string;
}

/**
 * Relative time format strings
 */
interface RelativeTimeFormat {
  /** Future time prefix: %s tới */
  future: string;
  /** Past time suffix: %s trước */
  past: string;
  /** Seconds (singular): vài giây */
  s: string;
  /** Seconds (plural): %d giây */
  ss: string;
  /** Minute (singular): một phút */
  m: string;
  /** Minutes (plural): %d phút */
  mm: string;
  /** Hour (singular): một giờ */
  h: string;
  /** Hours (plural): %d giờ */
  hh: string;
  /** Day (singular): một ngày */
  d: string;
  /** Days (plural): %d ngày */
  dd: string;
  /** Week (singular): một tuần */
  w: string;
  /** Weeks (plural): %d tuần */
  ww: string;
  /** Month (singular): một tháng */
  M: string;
  /** Months (plural): %d tháng */
  MM: string;
  /** Year (singular): một năm */
  y: string;
  /** Years (plural): %d năm */
  yy: string;
}

/**
 * Week configuration for Vietnamese locale
 */
interface WeekConfig {
  /** Day of week (1 = Monday) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Vietnamese locale configuration specification
 */
interface VietnameseLocaleSpecification extends LocaleSpecification, MeridiemConfig {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Use exact month parsing */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Use exact weekday parsing */
  weekdaysParseExact: boolean;
  /** Long date format configuration */
  longDateFormat: LongDateFormat;
  /** Calendar format configuration */
  calendar: CalendarFormat;
  /** Relative time format configuration */
  relativeTime: RelativeTimeFormat;
  /** Regex pattern for ordinal parsing */
  dayOfMonthOrdinalParse: RegExp;
  /**
   * Returns ordinal suffix for a number (Vietnamese doesn't use ordinals)
   * @param dayOfMonth - Day of the month
   * @returns The number as-is (no suffix)
   */
  ordinal(dayOfMonth: number): number;
  /** Week configuration */
  week: WeekConfig;
}

/**
 * Defines the Vietnamese locale for Moment.js
 * @param momentInstance - The Moment.js instance to configure
 * @returns The configured Vietnamese locale
 */
declare function defineVietnamesLocale(momentInstance: typeof import('moment')): Locale;

export default defineVietnamesLocale;
export { VietnameseLocaleSpecification };